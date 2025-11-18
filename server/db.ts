import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "../shared/schema";

const databaseUrl = process.env.MYSQL_URL;

if (!databaseUrl) {
  throw new Error("MYSQL_URL must be set");
}

// create MySQL pool
const pool = mysql.createPool(databaseUrl);

// connect Drizzle
export const db = drizzle(pool);  // <- remove { schema } for now
