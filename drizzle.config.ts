import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

// .env.local থেকে ডাটাবেস URL লোড করা
dotenv.config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql', // এই লাইনটিই Drizzle খুঁজছিল!
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});