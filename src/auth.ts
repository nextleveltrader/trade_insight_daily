import NextAuth, { type DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { createHash, timingSafeEqual } from "node:crypto";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { users, type UserRole } from "@/db/schema";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: UserRole;
      isPro: boolean;
      trialEndsAt: Date | null;
    };
  }

  interface User {
    role: UserRole;
    isPro: boolean;
    trialEndsAt: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: UserRole;
    isPro?: boolean;
    trialEndsAt?: Date | null;
  }
}

const TRIAL_DURATION_DAYS = 14;

const createPlaceholderPasswordHash = (rawPassword: string): string => {
  // Placeholder only; replace with bcrypt/argon2 in production rollout.
  return createHash("sha256").update(rawPassword, "utf8").digest("hex");
};

const comparePlaceholderPasswordHash = (
  rawPassword: string,
  storedHash: string,
): boolean => {
  // timingSafeEqual prevents obvious timing variance in this placeholder flow.
  const incoming = Buffer.from(createPlaceholderPasswordHash(rawPassword), "utf8");
  const persisted = Buffer.from(storedHash, "utf8");

  if (incoming.length !== persisted.length) {
    return false;
  }

  return timingSafeEqual(incoming, persisted);
};

const getUserById = async (id: string) => {
  const [dbUser] = await db
    .select({
      id: users.id,
      role: users.role,
      isPro: users.isPro,
      trialEndsAt: users.trialEndsAt,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return dbUser ?? null;
};

const getUserByEmail = async (email: string) => {
  const [dbUser] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      passwordHash: users.passwordHash,
      role: users.role,
      isPro: users.isPro,
      trialEndsAt: users.trialEndsAt,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return dbUser ?? null;
};

const ensureTrialIfMissing = async (userId: string): Promise<void> => {
  const [existing] = await db
    .select({
      id: users.id,
      trialEndsAt: users.trialEndsAt,
    })
    .from(users)
    .where(and(eq(users.id, userId), eq(users.trialEndsAt, null)))
    .limit(1);

  if (!existing) {
    return;
  }

  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DURATION_DAYS);

  await db
    .update(users)
    .set({
      trialEndsAt,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const normalizedEmail = email.toLowerCase().trim();
        const dbUser = await getUserByEmail(normalizedEmail);

        if (!dbUser?.passwordHash) {
          return null;
        }

        const isPasswordValid = comparePlaceholderPasswordHash(
          password,
          dbUser.passwordHash,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          image: dbUser.image,
          role: dbUser.role,
          isPro: dbUser.isPro,
          trialEndsAt: dbUser.trialEndsAt,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // New sign-in: hydrate token from the database as source of truth.
      if (user?.id) {
        await ensureTrialIfMissing(user.id);
        const dbUser = await getUserById(user.id);

        if (dbUser) {
          token.role = dbUser.role;
          token.isPro = dbUser.isPro;
          token.trialEndsAt = dbUser.trialEndsAt;
        }

        return token;
      }

      // Existing JWT: refresh custom claims if needed.
      if (token.sub) {
        const dbUser = await getUserById(token.sub);
        if (dbUser) {
          token.role = dbUser.role;
          token.isPro = dbUser.isPro;
          token.trialEndsAt = dbUser.trialEndsAt;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (!session.user || !token.sub) {
        return session;
      }

      session.user.id = token.sub;
      session.user.role = token.role ?? "user";
      session.user.isPro = token.isPro ?? false;
      session.user.trialEndsAt = token.trialEndsAt ?? null;

      return session;
    },
  },
});

export { createPlaceholderPasswordHash };
