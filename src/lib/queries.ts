import { directors, movies } from "./data";
import { Director, Movie } from "./types";

export async function getMovies(search?: string, genre?: string): Promise<Movie[]> {
	let result = [...movies];
	if (search) {
		const q = search.toLowerCase();
		result = result.filter(
			(m) =>
				m.title.toLowerCase().includes(q) ||
				m.directorName.toLowerCase().includes(q)
		);
	}
	if (genre) {
		result = result.filter((m) =>
			m.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
		);
	}
	return result;
}

export async function getMovie(id: string): Promise<Movie | undefined> {
	return movies.find((m) => m.id === id);
}

export async function getDirectors(search?: string): Promise<Director[]> {
	let result = [...directors];
	if (search) {
		const q = search.toLowerCase();
		result = result.filter(
			(d) =>
				d.name.toLowerCase().includes(q) ||
				d.nationality.toLowerCase().includes(q)
		);
	}
	return result;
}

export async function getDirector(id: string): Promise<Director | undefined> {
	return directors.find((d) => d.id === id);
}

export async function getMoviesByDirector(directorId: string): Promise<Movie[]> {
	return movies.filter((m) => m.directorId === directorId);
}

export function getAllGenres(): string[] {
	const genres = new Set<string>();
	movies.forEach((m) => m.genre.forEach((g) => genres.add(g)));
	return Array.from(genres).sort();
}
