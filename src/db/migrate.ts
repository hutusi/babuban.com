import { Database } from "bun:sqlite";
import path from "path";

const dbPath = path.join(process.cwd(), "sqlite.db");
const sqlite = new Database(dbPath);

console.log("📦 Creating database schema...");

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS directors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    birth_year INTEGER NOT NULL,
    death_year INTEGER,
    nationality TEXT NOT NULL,
    biography TEXT NOT NULL,
    photo_url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS movies (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    director_id TEXT NOT NULL REFERENCES directors(id),
    genre TEXT NOT NULL,
    synopsis TEXT NOT NULL,
    poster_url TEXT NOT NULL,
    runtime INTEGER NOT NULL,
    rating REAL,
    language TEXT NOT NULL,
    country TEXT NOT NULL
  );
`);

console.log("✅ Schema created!");
sqlite.close();
