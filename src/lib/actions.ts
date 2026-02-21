"use server";

import { db } from "@/db/index";
import { directors, movies } from "@/db/schema";
import { eq, like, or } from "drizzle-orm";

export interface SearchResult {
	type: "movie" | "director";
	id: string;
	title: string;
	subtitle: string;
	imageUrl: string;
}

export async function searchAll(query: string): Promise<SearchResult[]> {
	if (!query || query.trim().length < 2) return [];

	const pattern = `%${query.trim()}%`;

	const [movieResults, directorResults] = await Promise.all([
		db
			.select({
				id: movies.id,
				title: movies.title,
				year: movies.year,
				posterUrl: movies.posterUrl,
				directorName: directors.name,
			})
			.from(movies)
			.innerJoin(directors, eq(movies.directorId, directors.id))
			.where(
				or(
					like(movies.title, pattern),
					like(directors.name, pattern),
					like(movies.genre, pattern)
				)
			)
			.limit(6),
		db
			.select()
			.from(directors)
			.where(
				or(
					like(directors.name, pattern),
					like(directors.nationality, pattern)
				)
			)
			.limit(4),
	]);

	const results: SearchResult[] = [
		...movieResults.map((m) => ({
			type: "movie" as const,
			id: m.id,
			title: m.title,
			subtitle: `${m.year} · ${m.directorName}`,
			imageUrl: m.posterUrl,
		})),
		...directorResults.map((d) => ({
			type: "director" as const,
			id: d.id,
			title: d.name,
			subtitle: d.nationality,
			imageUrl: d.photoUrl,
		})),
	];

	return results;
}
