/* eslint-disable @typescript-eslint/no-require-imports */
import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";

// Type: always expose the SQLite-typed db for consistent type inference.
// At runtime in production, the actual instance is swapped to Neon Postgres.
let db: BetterSQLite3Database<typeof schema>;

if (process.env.DATABASE_URL) {
	// Production: Neon Postgres (types are compatible at runtime)
	const { neon } = require("@neondatabase/serverless");
	const { drizzle: drizzlePg } = require("drizzle-orm/neon-http");
	const schemaPg = require("./schema-pg");
	const sql = neon(process.env.DATABASE_URL);
	db = drizzlePg(sql, { schema: schemaPg }) as unknown as BetterSQLite3Database<typeof schema>;
} else {
	// Development: SQLite
	const dbPath = path.join(process.cwd(), "sqlite.db");
	const sqlite = new Database(dbPath);
	sqlite.pragma("journal_mode = WAL");
	db = drizzle(sqlite, { schema });
}

export { db };
