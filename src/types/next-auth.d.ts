/**
 * src/types/next-auth.d.ts
 *
 * TypeScript module augmentation for Auth.js v5 (next-auth@beta).
 *
 * Purpose:
 *   Auth.js ships with a minimal Session["user"] type that only includes
 *   `name`, `email`, and `image`. This file extends it with our custom
 *   schema fields so that `session.user.id`, `.role`, `.isPro`, and
 *   `.trialEndsAt` are fully typed throughout the codebase — no `as any`,
 *   no non-null assertions required.
 *
 * How it works:
 *   TypeScript's declaration merging allows us to re-open the `next-auth`
 *   module and extend the built-in interfaces. The types here must exactly
 *   mirror what the `session` callback in src/auth.ts stamps onto the object.
 *
 * Usage:
 *   import type { Session } from "next-auth";
 *   const session: Session = await auth();
 *   session.user.role        // "admin" | "user"
 *   session.user.isPro       // boolean
 *   session.user.trialEndsAt // Date | null
 *   session.user.id          // string
 */

import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";

// ─── User role enum — mirrors schema.ts userRoleEnum ─────────────────────────
type UserRole = "admin" | "user";

declare module "next-auth" {
  /**
   * Extends the `Session` interface.
   * Available in RSCs via `const session = await auth()` and in Client
   * Components via `const { data: session } = useSession()`.
   */
  interface Session {
    user: {
      /** Our schema's `users.id` — a UUID string (text PK). */
      id: string;

      /** Platform role. "admin" unlocks the admin panel; "user" is default. */
      role: UserRole;

      /**
       * Whether the user has an active paid subscription.
       * Set to `true` by payment webhooks; reset to `false` on cancellation.
       */
      isPro: boolean;

      /**
       * The timestamp when the 14-day free trial expires.
       * - `null`  → user registered before trial system was added (treat as expired)
       * - `Date`  → compare with `new Date()` to determine trial status
       *
       * A user has Premium access if: `isPro === true` OR `trialEndsAt > new Date()`
       */
      trialEndsAt: Date | null;
    } & DefaultSession["user"]; // Preserves `name`, `email`, `image`
  }

  /**
   * Extends the `User` interface returned by the DrizzleAdapter.
   * This is the `user` object available in the `jwt` callback on sign-in.
   * Must include our custom DB columns so the JWT callback can stamp them
   * without TypeScript errors.
   */
  interface User extends DefaultUser {
    role: UserRole;
    isPro: boolean;
    trialEndsAt: Date | null;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the JWT payload.
   * These fields are set in the `jwt` callback in src/auth.ts and read back
   * in the `session` callback. All custom fields on the token live here.
   */
  interface JWT extends DefaultJWT {
    /** Maps to `users.id` — the UUID primary key. */
    id: string;

    /** Platform role — cached from DB on sign-in, refreshed hourly. */
    role: UserRole;

    /**
     * Paid subscription flag — re-fetched from DB every hour to pick up
     * changes from Stripe/bKash webhooks without requiring re-authentication.
     */
    isPro: boolean;

    /** Trial expiry timestamp — null if not set. */
    trialEndsAt: Date | null;

    /**
     * Internal: timestamp of the last DB re-hydration.
     * Used by the jwt callback to decide when to refresh role/isPro/trialEndsAt.
     * Not exposed on the Session object.
     */
    lastDbFetch?: number;
  }
}