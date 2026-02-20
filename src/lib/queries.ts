import { db } from "@/db/index";
import { directors, movies } from "@/db/schema";
import { eq, like, or, and, gte, lte } from "drizzle-orm";
import type { DirectorWithMovies, MovieWithDirector } from "./types";

export async function getMovies(
	search?: string,
	genre?: string
): Promise<MovieWithDirector[]> {
	let rows;

	if (search) {
		const pattern = `%${search}%`;
		rows = await db
			.select({
				movie: movies,
				directorName: directors.name,
			})
			.from(movies)
			.innerJoin(directors, eq(movies.directorId, directors.id))
			.where(
				or(like(movies.title, pattern), like(directors.name, pattern))
			);
	} else {
		rows = await db
			.select({
				movie: movies,
				directorName: directors.name,
			})
			.from(movies)
			.innerJoin(directors, eq(movies.directorId, directors.id));
	}

	let result = rows.map((r) => ({
		...r.movie,
		directorName: r.directorName,
	}));

	if (genre) {
		result = result.filter((m) =>
			(m.genre as string[]).some(
				(g) => g.toLowerCase() === genre.toLowerCase()
			)
		);
	}

	return result;
}

export async function getMovie(
	id: string
): Promise<MovieWithDirector | undefined> {
	const rows = await db
		.select({
			movie: movies,
			directorName: directors.name,
		})
		.from(movies)
		.innerJoin(directors, eq(movies.directorId, directors.id))
		.where(eq(movies.id, id))
		.limit(1);

	if (rows.length === 0) return undefined;
	return { ...rows[0].movie, directorName: rows[0].directorName };
}

export async function getDirectors(
	search?: string
): Promise<DirectorWithMovies[]> {
	let directorRows;

	if (search) {
		const pattern = `%${search}%`;
		directorRows = await db
			.select()
			.from(directors)
			.where(
				or(like(directors.name, pattern), like(directors.nationality, pattern))
			);
	} else {
		directorRows = await db.select().from(directors);
	}

	// Fetch notable movies for each director
	const allMovies = await db.select().from(movies);
	return directorRows.map((d) => ({
		...d,
		notableMovies: allMovies
			.filter((m) => m.directorId === d.id)
			.slice(0, 3)
			.map((m) => m.title),
	}));
}

export async function getDirector(
	id: string
): Promise<DirectorWithMovies | undefined> {
	const rows = await db
		.select()
		.from(directors)
		.where(eq(directors.id, id))
		.limit(1);

	if (rows.length === 0) return undefined;

	const directorMovies = await db
		.select()
		.from(movies)
		.where(eq(movies.directorId, id));

	return {
		...rows[0],
		notableMovies: directorMovies.slice(0, 3).map((m) => m.title),
	};
}

export async function getMoviesByDirector(
	directorId: string
): Promise<MovieWithDirector[]> {
	const rows = await db
		.select({
			movie: movies,
			directorName: directors.name,
		})
		.from(movies)
		.innerJoin(directors, eq(movies.directorId, directors.id))
		.where(eq(movies.directorId, directorId));

	return rows.map((r) => ({
		...r.movie,
		directorName: r.directorName,
	}));
}

export async function getAllGenres(): Promise<string[]> {
	const allMovies = await db.select({ genre: movies.genre }).from(movies);
	const genres = new Set<string>();
	allMovies.forEach((m) =>
		(m.genre as string[]).forEach((g) => genres.add(g))
	);
	return Array.from(genres).sort();
}

export async function getMoviesByYearRange(
	startYear: number,
	endYear: number
): Promise<MovieWithDirector[]> {
	const rows = await db
		.select({
			movie: movies,
			directorName: directors.name,
		})
		.from(movies)
		.innerJoin(directors, eq(movies.directorId, directors.id))
		.where(
			and(gte(movies.year, startYear), lte(movies.year, endYear))
		)
		.orderBy(movies.year);

	return rows.map((r) => ({
		...r.movie,
		directorName: r.directorName,
	}));
}

export async function getAllCountries(): Promise<string[]> {
	const rows = await db
		.selectDistinct({ country: movies.country })
		.from(movies)
		.orderBy(movies.country);
	return rows.map((r) => r.country);
}

export async function getAllDecades(): Promise<number[]> {
	const allMovies = await db.select({ year: movies.year }).from(movies);
	const decades = new Set<number>();
	allMovies.forEach((m) => decades.add(Math.floor(m.year / 10) * 10));
	return Array.from(decades).sort();
}

export async function getStats(): Promise<{
	directorCount: number;
	movieCount: number;
	countryCount: number;
	decadeCount: number;
}> {
	const [allDirectors, allMovies] = await Promise.all([
		db.select().from(directors),
		db.select().from(movies),
	]);

	const countries = new Set(allMovies.map((m) => m.country));
	const decades = new Set(allMovies.map((m) => Math.floor(m.year / 10) * 10));

	return {
		directorCount: allDirectors.length,
		movieCount: allMovies.length,
		countryCount: countries.size,
		decadeCount: decades.size,
	};
}
