import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Connection string-ta .env.local theke load korbe
const connectionString = process.env.DATABASE_URL!;

// Database client toiri kora
const client = postgres(connectionString);
export const db = drizzle(client, { schema });