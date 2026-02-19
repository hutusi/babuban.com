"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import MovieCard from "./movie-card";
import { Movie } from "@/lib/types";

interface MovieCollectionProps {
	movies: Movie[];
	genres: string[];
}

export default function MovieCollection({ movies, genres }: MovieCollectionProps) {
	const [search, setSearch] = useState("");
	const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

	const filtered = useMemo(() => {
		let result = movies;
		if (search) {
			const q = search.toLowerCase();
			result = result.filter(
				(m) =>
					m.title.toLowerCase().includes(q) ||
					m.directorName.toLowerCase().includes(q)
			);
		}
		if (selectedGenre) {
			result = result.filter((m) =>
				m.genre.some((g) => g === selectedGenre)
			);
		}
		return result;
	}, [movies, search, selectedGenre]);

	return (
		<section id="collection" className="mx-auto max-w-7xl px-6 py-20">
			{/* Section header */}
			<div className="mb-12 text-center">
				<h2 className="mb-3 font-serif text-3xl font-bold text-foreground sm:text-4xl">
					The Collection
				</h2>
				<p className="text-muted-foreground">
					Masterpieces from the greatest filmmakers in cinema history
				</p>
			</div>

			{/* Filters */}
			<div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
				{/* Search */}
				<div className="relative w-full max-w-sm">
					<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search movies or directors..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full rounded-lg border border-white/10 bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold/20"
					/>
				</div>

				{/* Genre filter pills */}
				<div className="flex flex-wrap justify-center gap-2">
					<button
						onClick={() => setSelectedGenre(null)}
						className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${!selectedGenre
								? "bg-gold text-black"
								: "border border-white/10 text-muted-foreground hover:text-foreground"
							}`}
					>
						All
					</button>
					{genres.map((genre) => (
						<button
							key={genre}
							onClick={() =>
								setSelectedGenre(selectedGenre === genre ? null : genre)
							}
							className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${selectedGenre === genre
									? "bg-gold text-black"
									: "border border-white/10 text-muted-foreground hover:text-foreground"
								}`}
						>
							{genre}
						</button>
					))}
				</div>
			</div>

			{/* Grid */}
			{filtered.length > 0 ? (
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
					{filtered.map((movie, i) => (
						<MovieCard key={movie.id} movie={movie} index={i} />
					))}
				</div>
			) : (
				<div className="py-20 text-center">
					<p className="text-lg text-muted-foreground">
						No movies found matching your search.
					</p>
				</div>
			)}
		</section>
	);
}
