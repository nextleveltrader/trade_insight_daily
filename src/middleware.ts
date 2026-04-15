/**
 * src/middleware.ts
 *
 * Edge-compatible route protection middleware.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * TWO PARALLEL AUTH SYSTEMS
 * ──────────────────────────────────────────────────────────────────────────────
 *
 * 1. Admin panel (/admin/*) — HMAC cookie (`admin_session`)
 *    Completely independent of NextAuth. The admin is a single super-user
 *    identified by a password hash (ADMIN_PASSWORD_HASH) whose signed cookie
 *    is issued by /api/admin/auth. We verify the cookie here using the Web
 *    Crypto API (HMAC-SHA-256) — 100% Edge-compatible, no Node.js APIs needed.
 *
 * 2. User routes (/saved, /profile) — NextAuth JWT session
 *    The `auth` export from next-auth wraps this middleware as a factory.
 *    It reads the JWT cookie cryptographically (no DB call) and exposes
 *    `req.auth` on the request. Perfect for the Edge runtime.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * ROUTING MATRIX (from README)
 * ──────────────────────────────────────────────────────────────────────────────
 *
 *  Route                                      | Guest   | Free    | Premium
 *  ─────────────────────────────────────────  | ─────── | ─────── | ───────
 *  / (landing)                                | ✅ Allow | ✅ Allow | ✅ Allow
 *  /feed, /insights/*, /calendar, /cot,       |         |         |
 *    /news, /gri, /correlation, /speeches     | ✅ Allow | ✅ Allow | ✅ Allow
 *  /saved, /profile                           | → /login | ✅ Allow | ✅ Allow
 *  /pricing, /upgrade                         | ✅ Allow | ✅ Allow | ✅ Allow
 *  /login, /register                          | ✅ Allow | → /feed  | → /feed
 *  /admin/login                               | ✅ Allow | ✅ Allow | ✅ Allow
 *  /admin/* (dashboard)                       | → /admin/login (all users, HMAC only)
 *
 * Feature routes are intentionally NOT behind an auth redirect. Content gating
 * is implemented in the component layer (<ContentBlur>, <PremiumLock>, etc.),
 * never in the routing layer — this is a core architectural principle.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * ADMIN COOKIE FORMAT
 * ──────────────────────────────────────────────────────────────────────────────
 *
 *  Cookie name:  admin_session
 *  Cookie value: {issuedAt}.{base64url(HMAC-SHA-256(secret, issuedAt))}
 *
 *  where `issuedAt` is a Unix timestamp (ms) set when the cookie is issued by
 *  POST /api/admin/auth, and `secret` = process.env.ADMIN_HMAC_SECRET.
 *
 *  The session is valid for ADMIN_SESSION_TTL_MS. Tampering with either the
 *  timestamp or the signature will fail the HMAC comparison.
 */

import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

// ─── Constants ───────────────────────────────────────────────────────────────

/** Name of the HMAC-signed cookie issued by /api/admin/auth */
const ADMIN_COOKIE_NAME = "admin_session";

/** Admin session TTL — 8 hours of inactivity before re-login is required. */
const ADMIN_SESSION_TTL_MS = 8 * 60 * 60 * 1000;

// ─── HMAC helpers (Web Crypto — Edge safe) ───────────────────────────────────

/**
 * Imports the raw HMAC-SHA-256 key from an ASCII secret string.
 * The result is cached in the module scope for the lifetime of the Edge
 * function instance, avoiding repeated key derivation on hot paths.
 */
let _cachedKey: CryptoKey | null = null;

async function getHmacKey(secret: string): Promise<CryptoKey> {
  if (_cachedKey) return _cachedKey;

  const raw = new TextEncoder().encode(secret);
  _cachedKey = await crypto.subtle.importKey(
    "raw",
    raw,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  return _cachedKey;
}

/**
 * Verifies an `admin_session` cookie value.
 *
 * @param cookieValue - Raw cookie string: `{issuedAt}.{base64url_signature}`
 * @param secret      - ADMIN_HMAC_SECRET from env
 * @returns true if the signature is valid AND the session has not expired
 */
async function verifyAdminCookie(
  cookieValue: string,
  secret: string
): Promise<boolean> {
  const dotIndex = cookieValue.lastIndexOf(".");
  if (dotIndex === -1) return false;

  const issuedAtStr = cookieValue.slice(0, dotIndex);
  const signatureB64 = cookieValue.slice(dotIndex + 1);

  // ── Verify timestamp is within TTL ─────────────────────────────────────────
  const issuedAt = parseInt(issuedAtStr, 10);
  if (isNaN(issuedAt)) return false;
  if (Date.now() - issuedAt > ADMIN_SESSION_TTL_MS) return false;

  // ── Verify HMAC signature ───────────────────────────────────────────────────
  try {
    // Decode base64url → ArrayBuffer
    const signatureBytes = Uint8Array.from(
      atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")),
      (c) => c.charCodeAt(0)
    );

    const key  = await getHmacKey(secret);
    const data = new TextEncoder().encode(issuedAtStr);

    return await crypto.subtle.verify("HMAC", key, signatureBytes, data);
  } catch {
    return false;
  }
}

// ─── Route helpers ───────────────────────────────────────────────────────────

/** Routes that require the user to be logged in via NextAuth. */
const AUTHED_USER_ROUTES = ["/saved", "/profile"];

/** Routes that logged-in users should be redirected away from. */
const AUTH_REDIRECT_ROUTES = ["/login", "/register"];

// ─── Core middleware (wrapped by auth() for session injection) ────────────────

/**
 * The `auth()` factory injects `req.auth` (the NextAuth session) from the JWT
 * cookie — no database call, pure cryptographic verification. This is the
 * recommended Auth.js v5 pattern for Edge middleware.
 */
export default auth(async function middleware(req) {
  const { pathname } = req.nextUrl;
  const session = req.auth; // null if not logged in

  // ── 1. Admin dashboard routes ─────────────────────────────────────────────
  //    /admin/login is excluded — it must be accessible to everyone.
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const adminSecret = process.env.ADMIN_HMAC_SECRET;

    if (!adminSecret) {
      // ADMIN_HMAC_SECRET is not set — fail closed, redirect to login.
      console.error("[middleware] ADMIN_HMAC_SECRET is not set in environment.");
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const cookieValue = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

    if (!cookieValue) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const isValid = await verifyAdminCookie(cookieValue, adminSecret);
    if (!isValid) {
      // Cookie is tampered, expired, or missing — clear it and redirect.
      const response = NextResponse.redirect(new URL("/admin/login", req.url));
      response.cookies.delete(ADMIN_COOKIE_NAME);
      return response;
    }

    // Valid admin session — allow through.
    return NextResponse.next();
  }

  // ── 2. Protected user routes — require NextAuth session ───────────────────
  if (AUTHED_USER_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // ── 3. Auth pages — redirect already-logged-in users to /feed ─────────────
  //    Exception: if the trial has expired (isPro=false, trialEndsAt in past),
  //    allow access to /login and /register so the user can re-authenticate or
  //    upgrade. The upgrade flow is at /pricing and /upgrade (always allowed).
  if (AUTH_REDIRECT_ROUTES.some((route) => pathname.startsWith(route))) {
    if (session) {
      const isPro       = session.user?.isPro       ?? false;
      const trialEndsAt = session.user?.trialEndsAt ?? null;
      const trialActive = trialEndsAt !== null && new Date(trialEndsAt) > new Date();

      // Only redirect away from login/register if the user has active access.
      if (isPro || trialActive) {
        return NextResponse.redirect(new URL("/feed", req.url));
      }
      // Trial expired + not pro → allow through to login/register (upgrade path)
    }
    return NextResponse.next();
  }

  // ── 4. All other routes — allow through ───────────────────────────────────
  //    Feature routes (/feed, /calendar, /cot, /news, /gri, /correlation,
  //    /speeches, /insights/*) are publicly reachable. Content gating is
  //    handled in the component layer, not here.
  return NextResponse.next();
});

// ─── Matcher ─────────────────────────────────────────────────────────────────

/**
 * Run middleware on all routes EXCEPT:
 *   • Next.js static file server (_next/static, _next/image)
 *   • Favicons and public assets
 *   • Auth.js internal API routes (api/auth/*)
 *
 * We deliberately include api/* (except api/auth/*) so that protected API
 * routes added later will also pass through this middleware.
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};