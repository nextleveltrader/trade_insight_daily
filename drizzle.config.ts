// drizzle.config.ts  (project root)
import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load .env.local so DATABASE_URL is available when running CLI commands
// outside of the Next.js runtime (e.g., npx drizzle-kit push)
dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to your .env.local file.\n" +
    "Format: postgresql://user:password@host/database?sslmode=require"
  );
}

export default defineConfig({
  // Single source of truth for the entire schema
  schema: "./src/db/schema.ts",

  // All generated SQL migration files land here
  out: "./src/db/migrations",

  dialect: "postgresql",

  dbCredentials: {
    url: process.env.DATABASE_URL,
  },

  // Logs every SQL statement Drizzle generates — essential for debugging
  verbose: true,

  // Forces you to explicitly confirm destructive operations (DROP TABLE, etc.)
  // Never set this to false in a project with real data.
  strict: true,
});