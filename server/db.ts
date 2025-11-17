import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../shared/schema';

const databaseUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL or MYSQL_URL must be set');
}

const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
