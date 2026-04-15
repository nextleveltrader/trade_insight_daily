/**
 * src/app/api/auth/[...nextauth]/route.ts
 *
 * Next.js App Router catch-all handler for Auth.js v5.
 *
 * Auth.js requires both GET and POST to be exported:
 *   GET  — serves sign-in/sign-out HTML pages and OAuth redirects
 *   POST — handles credential submissions and OAuth callbacks
 *
 * The `handlers` export from auth.ts already contains the correctly typed
 * { GET, POST } object — we simply re-export them here.
 *
 * Do NOT add any logic to this file. All auth configuration lives in
 * src/auth.ts — this file is intentionally a thin passthrough.
 */

import { handlers } from "@/auth";

export const { GET, POST } = handlers;

// Explicitly opt this route into the Node.js runtime.
// Auth.js v5 supports Edge, but the DrizzleAdapter uses postgres.js under
// the hood which requires Node APIs. The middleware (which is Edge) uses the
// JWT-only `auth()` helper and never touches this route handler.
export const runtime = "nodejs";