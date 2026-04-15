/**
 * src/auth.ts
 *
 * Auth.js v5 (next-auth@beta) configuration.
 *
 * Architecture decisions:
 *   • JWT session strategy — keeps middleware 100% Edge-compatible (no DB
 *     call per request). The JWT is signed with AUTH_SECRET and stored in an
 *     HttpOnly cookie.
 *   • DrizzleAdapter — writes OAuth accounts, sessions rows, and verification
 *     tokens to our own Postgres tables. All user data stays in our DB.
 *   • Google is the only OAuth provider for Phase 1. Add more providers here
 *     without touching any other file.
 *   • Custom JWT callback — stamps id, role, isPro, trialEndsAt into the token
 *     on sign-in, and re-hydrates them from the DB every hour so that Stripe
 *     webhook changes to `isPro` propagate within ≤ 60 minutes.
 *   • createUser event — auto-activates the 14-day free trial the moment a
 *     new user row is inserted by the adapter (covers both Google OAuth and
 *     future Credentials provider registrations).
 */

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users, accounts, sessions, verificationTokens } from "@/db/schema";

/** How often (ms) the JWT callback re-fetches isPro/role from the DB. */
const JWT_REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

export const { handlers, auth, signIn, signOut } = NextAuth({
  // ─── Adapter ───────────────────────────────────────────────────────────────
  // Explicitly pass our table references so the adapter uses the same Drizzle
  // instance and column names defined in schema.ts — no accidental table drift.
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),

  // ─── Session ───────────────────────────────────────────────────────────────
  session: {
    strategy: "jwt",
    // Tokens expire after 30 days; the refresh logic below keeps data fresh.
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  },

  // ─── Providers ─────────────────────────────────────────────────────────────
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      /**
       * Request the offline scope so we receive a refresh_token.
       * `account_selection_required` forces Google to always show the account
       * picker — useful for multi-account users.
       */
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // ─── Custom pages ──────────────────────────────────────────────────────────
  pages: {
    signIn: "/login",
    error: "/login", // Auth errors redirect here with ?error= query param
  },

  // ─── Callbacks ─────────────────────────────────────────────────────────────
  callbacks: {
    /**
     * jwt — runs on every token creation AND every session read.
     *
     * Sign-in (account is present):
     *   Stamp our custom fields into the token from the `user` object
     *   that the DrizzleAdapter returns (it includes our schema columns).
     *
     * Subsequent requests:
     *   Re-fetch role/isPro/trialEndsAt from the DB every JWT_REFRESH_INTERVAL_MS
     *   so that Stripe/bKash webhook-driven `isPro` changes propagate
     *   without requiring users to sign out and back in.
     *
     * Explicit update() call (trigger === "update"):
     *   Allows Server Actions to push isPro changes into the token immediately
     *   (e.g., after a successful Stripe checkout).
     */
    async jwt({ token, user, account, trigger, session }) {
      // ── Initial sign-in ────────────────────────────────────────────────────
      if (account && user) {
        token.id          = user.id as string;
        token.role        = (user as typeof users.$inferSelect).role        ?? "user";
        token.isPro       = (user as typeof users.$inferSelect).isPro       ?? false;
        token.trialEndsAt = (user as typeof users.$inferSelect).trialEndsAt ?? null;
        token.lastDbFetch = Date.now();
        return token;
      }

      // ── Explicit session.update() call ─────────────────────────────────────
      // Triggered by `useSession().update()` or `auth().update()` in Server Actions.
      if (trigger === "update" && session?.user) {
        if (session.user.isPro       !== undefined) token.isPro       = session.user.isPro;
        if (session.user.trialEndsAt !== undefined) token.trialEndsAt = session.user.trialEndsAt;
        token.lastDbFetch = Date.now();
        return token;
      }

      // ── Periodic DB re-hydration ────────────────────────────────────────────
      // Ensures isPro changes from payment webhooks surface within 1 hour
      // without forcing a sign-out / sign-in cycle.
      const lastFetch = (token.lastDbFetch as number | undefined) ?? 0;
      const isDue     = Date.now() - lastFetch > JWT_REFRESH_INTERVAL_MS;

      if (isDue && token.id) {
        const freshUser = await db.query.users.findFirst({
          where: eq(users.id, token.id as string),
          columns: {
            role:        true,
            isPro:       true,
            trialEndsAt: true,
          },
        });

        if (freshUser) {
          token.role        = freshUser.role;
          token.isPro       = freshUser.isPro;
          token.trialEndsAt = freshUser.trialEndsAt;
          token.lastDbFetch = Date.now();
        }
      }

      return token;
    },

    /**
     * session — shapes the client-visible session object.
     *
     * Maps our custom JWT fields onto `session.user` so every RSC and Client
     * Component can call `session.user.isPro` with full TypeScript support.
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id          = token.id          as string;
        session.user.role        = token.role        as "admin" | "user";
        session.user.isPro       = token.isPro       as boolean;
        session.user.trialEndsAt = token.trialEndsAt as Date | null;
      }
      return session;
    },
  },

  // ─── Events ────────────────────────────────────────────────────────────────
  events: {
    /**
     * createUser — fires once when the DrizzleAdapter inserts a new user row.
     * We use it to auto-activate the 14-day free trial with zero extra
     * client-side logic. Works for Google OAuth and the future Credentials
     * provider alike — any path that creates a new user row triggers this.
     */
    async createUser({ user }) {
      if (!user.id) return;

      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 14);

      await db
        .update(users)
        .set({ trialEndsAt })
        .where(eq(users.id, user.id));
    },
  },
});