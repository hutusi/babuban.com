import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getMovies, getAllGenres, getAllDecades, getAllCountries } from "@/lib/queries";
import MovieFilters from "@/components/movie-filters";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Film Collection — 8½ Classics",
	description: "Browse and filter the complete film collection by genre, decade, and country.",
};

interface MoviesPageProps {
	searchParams: Promise<{
		genre?: string;
		decade?: string;
		country?: string;
		q?: string;
	}>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
	const params = await searchParams;
	const { genre, decade, country, q } = params;

	const [allMovies, genres, decades, countries] = await Promise.all([
		getMovies(q, genre),
		getAllGenres(),
		getAllDecades(),
		getAllCountries(),
	]);

	// Apply decade and country filters
	let movies = allMovies;
	if (decade) {
		const d = parseInt(decade);
		movies = movies.filter((m) => m.year >= d && m.year < d + 10);
	}
	if (country) {
		movies = movies.filter((m) => m.country === country);
	}

	const activeFilterCount = [genre, decade, country, q].filter(Boolean).length;

	return (
		<section className="mx-auto max-w-7xl px-6 py-16">
			<div className="mb-12 text-center">
				<h1 className="mb-4 font-serif text-4xl font-bold sm:text-5xl">
					Film <span className="gold-gradient">Collection</span>
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					{movies.length} film{movies.length !== 1 ? "s" : ""} in the archive
					{activeFilterCount > 0 && (
						<span className="text-gold">
							{" "}
							· {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} active
						</span>
					)}
				</p>
			</div>

			<Suspense fallback={null}>
				<MovieFilters genres={genres} decades={decades} countries={countries} />
			</Suspense>

			{/* Movie grid */}
			<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{movies.map((movie) => (
					<Link
						key={movie.id}
						href={`/movies/${movie.id}`}
						className="card-glow group relative aspect-[2/3] overflow-hidden rounded-xl"
					>
						<Image
							src={movie.posterUrl}
							alt={movie.title}
							fill
							sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
							className="object-cover transition-transform duration-500 group-hover:scale-105"
						/>
						{/* Gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

						{/* Year badge */}
						<span className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-0.5 text-xs font-medium text-gold backdrop-blur-sm">
							{movie.year}
						</span>

						{/* Bottom info */}
						<div className="absolute right-0 bottom-0 left-0 p-4">
							<div className="mb-1 flex flex-wrap gap-1.5">
								{(movie.genre as string[]).slice(0, 2).map((g: string) => (
									<span
										key={g}
										className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold"
									>
										{g}
									</span>
								))}
							</div>
							<h3 className="mb-0.5 font-serif text-lg font-bold text-foreground transition-colors group-hover:text-gold">
								{movie.title}
							</h3>
							<p className="text-xs text-muted-foreground">
								{movie.directorName}
							</p>
						</div>
					</Link>
				))}
			</div>

			{movies.length === 0 && (
				<div className="py-20 text-center">
					<p className="text-lg text-muted-foreground">
						No films match your current filters.
					</p>
					<Link
						href="/movies"
						className="mt-4 inline-block text-sm text-gold transition-colors hover:text-gold-light"
					>
						Clear all filters →
					</Link>
				</div>
			)}
		</section>
	);
}
