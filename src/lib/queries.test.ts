import { describe, it, expect, beforeAll } from "vitest";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { eq, like, or, and, gte, lte } from "drizzle-orm";
import * as schema from "@/db/schema";

const { directors, movies } = schema;

// Create in-memory database for testing
function createTestDb() {
	const sqlite = new Database(":memory:");
	const db = drizzle(sqlite, { schema });

	// Create tables
	sqlite.exec(`
		CREATE TABLE directors (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			birth_year INTEGER NOT NULL,
			death_year INTEGER,
			nationality TEXT NOT NULL,
			biography TEXT NOT NULL,
			photo_url TEXT NOT NULL
		);
		CREATE TABLE movies (
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

	// Seed test data
	db.insert(directors)
		.values([
			{
				id: "fellini",
				name: "Federico Fellini",
				birthYear: 1920,
				deathYear: 1993,
				nationality: "Italian",
				biography: "Italian film director.",
				photoUrl: "https://example.com/fellini.jpg",
			},
			{
				id: "kurosawa",
				name: "Akira Kurosawa",
				birthYear: 1910,
				deathYear: 1998,
				nationality: "Japanese",
				biography: "Japanese filmmaker.",
				photoUrl: "https://example.com/kurosawa.jpg",
			},
		])
		.run();

	db.insert(movies)
		.values([
			{
				id: "la-dolce-vita",
				title: "La Dolce Vita",
				year: 1960,
				directorId: "fellini",
				genre: ["Drama", "Comedy"],
				synopsis: "A journalist explores Rome.",
				posterUrl: "https://example.com/dolce.jpg",
				runtime: 174,
				rating: 8.0,
				language: "Italian",
				country: "Italy",
			},
			{
				id: "eight-and-half",
				title: "8½",
				year: 1963,
				directorId: "fellini",
				genre: ["Drama", "Fantasy"],
				synopsis: "A director struggles with creativity.",
				posterUrl: "https://example.com/8half.jpg",
				runtime: 138,
				rating: 8.0,
				language: "Italian",
				country: "Italy",
			},
			{
				id: "seven-samurai",
				title: "Seven Samurai",
				year: 1954,
				directorId: "kurosawa",
				genre: ["Action", "Drama"],
				synopsis: "Seven samurai protect a village.",
				posterUrl: "https://example.com/7samurai.jpg",
				runtime: 207,
				rating: 8.6,
				language: "Japanese",
				country: "Japan",
			},
		])
		.run();

	return db;
}

describe("Query functions", () => {
	let db: ReturnType<typeof createTestDb>;

	beforeAll(() => {
		db = createTestDb();
	});

	describe("getMovies equivalent", () => {
		it("returns all movies with director names", () => {
			const rows = db
				.select({ movie: movies, directorName: directors.name })
				.from(movies)
				.innerJoin(directors, eq(movies.directorId, directors.id))
				.all();

			expect(rows).toHaveLength(3);
			expect(rows[0].directorName).toBeDefined();
		});

		it("filters by search term", () => {
			const pattern = "%samurai%";
			const rows = db
				.select({ movie: movies, directorName: directors.name })
				.from(movies)
				.innerJoin(directors, eq(movies.directorId, directors.id))
				.where(
					or(like(movies.title, pattern), like(directors.name, pattern))
				)
				.all();

			expect(rows).toHaveLength(1);
			expect(rows[0].movie.title).toBe("Seven Samurai");
		});

		it("filters by genre", () => {
			const rows = db
				.select({ movie: movies, directorName: directors.name })
				.from(movies)
				.innerJoin(directors, eq(movies.directorId, directors.id))
				.all();

			const result = rows
				.map((r) => ({ ...r.movie, directorName: r.directorName }))
				.filter((m) =>
					(m.genre as string[]).some(
						(g) => g.toLowerCase() === "action"
					)
				);

			expect(result).toHaveLength(1);
			expect(result[0].title).toBe("Seven Samurai");
		});
	});

	describe("getMovie equivalent", () => {
		it("returns a single movie with director name", () => {
			const rows = db
				.select({ movie: movies, directorName: directors.name })
				.from(movies)
				.innerJoin(directors, eq(movies.directorId, directors.id))
				.where(eq(movies.id, "la-dolce-vita"))
				.limit(1)
				.all();

			expect(rows).toHaveLength(1);
			expect(rows[0].movie.title).toBe("La Dolce Vita");
			expect(rows[0].directorName).toBe("Federico Fellini");
		});

		it("returns empty for non-existent id", () => {
			const rows = db
				.select({ movie: movies, directorName: directors.name })
				.from(movies)
				.innerJoin(directors, eq(movies.directorId, directors.id))
				.where(eq(movies.id, "nonexistent"))
				.limit(1)
				.all();

			expect(rows).toHaveLength(0);
		});
	});

	describe("getDirectors equivalent", () => {
		it("returns all directors", () => {
			const rows = db.select().from(directors).all();
			expect(rows).toHaveLength(2);
		});

		it("filters by search term", () => {
			const pattern = "%kurosawa%";
			const rows = db
				.select()
				.from(directors)
				.where(
					or(
						like(directors.name, pattern),
						like(directors.nationality, pattern)
					)
				)
				.all();

			expect(rows).toHaveLength(1);
			expect(rows[0].name).toBe("Akira Kurosawa");
		});
	});

	describe("getMoviesByYearRange equivalent", () => {
		it("returns movies within range", () => {
			const rows = db
				.select({ movie: movies, directorName: directors.name })
				.from(movies)
				.innerJoin(directors, eq(movies.directorId, directors.id))
				.where(and(gte(movies.year, 1960), lte(movies.year, 1970)))
				.all();

			expect(rows).toHaveLength(2); // La Dolce Vita (1960) and 8½ (1963)
		});

		it("returns empty for out-of-range years", () => {
			const rows = db
				.select({ movie: movies, directorName: directors.name })
				.from(movies)
				.innerJoin(directors, eq(movies.directorId, directors.id))
				.where(and(gte(movies.year, 2000), lte(movies.year, 2030)))
				.all();

			expect(rows).toHaveLength(0);
		});
	});

	describe("getAllGenres equivalent", () => {
		it("returns sorted unique genres", () => {
			const allMovies = db
				.select({ genre: movies.genre })
				.from(movies)
				.all();
			const genres = new Set<string>();
			allMovies.forEach((m) =>
				(m.genre as string[]).forEach((g) => genres.add(g))
			);
			const result = Array.from(genres).sort();

			expect(result).toEqual(["Action", "Comedy", "Drama", "Fantasy"]);
		});
	});

	describe("getStats equivalent", () => {
		it("returns correct aggregate counts", () => {
			const allDirectors = db.select().from(directors).all();
			const allMovies = db.select().from(movies).all();
			const countries = new Set(allMovies.map((m) => m.country));
			const decades = new Set(
				allMovies.map((m) => Math.floor(m.year / 10) * 10)
			);

			expect(allDirectors).toHaveLength(2);
			expect(allMovies).toHaveLength(3);
			expect(countries.size).toBe(2); // Italy, Japan
			expect(decades.size).toBe(2); // 1950s, 1960s
		});
	});
});
