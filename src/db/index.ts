/**
 * src/db/index.ts
 *
 * Drizzle ORM database connection.
 *
 * Driver choice — `postgres` (postgres.js) over `@neondatabase/serverless`:
 *   • `postgres` is already in package.json; no new dependency needed.
 *   • Vercel runs Route Handlers and Server Actions in the Node.js runtime by
 *     default, where postgres.js performs best with full TCP connections.
 *   • Edge middleware NEVER imports this file — it only reads the JWT cookie,
 *     so there is zero edge-incompatibility risk.
 *   • `prepare: false` disables prepared-statement caching, which is REQUIRED
 *     for Neon's transaction-mode pooler. Without it you will get
 *     "prepared statement ... already exists" errors under concurrent load.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "[db/index.ts] DATABASE_URL is not set.\n" +
      "Add it to .env.local — e.g. postgresql://user:pass@host/db?sslmode=require"
  );
}

/**
 * postgres.js connection client.
 *
 * `prepare: false` — mandatory for Neon's transaction-mode connection pooler.
 * `max: 1`         — Vercel Serverless Functions are ephemeral; one connection
 *                    per invocation prevents pool exhaustion across cold starts.
 */
const client = postgres(process.env.DATABASE_URL, {
  prepare: false,
  max: 1,
});

/**
 * The single, project-wide Drizzle database instance.
 *
 * Usage:
 *   import { db } from "@/db";
 */
export const db = drizzle(client, { schema });