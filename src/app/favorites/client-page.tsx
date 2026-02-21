"use client";

import { useFavorites } from "@/lib/favorites-context";
import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Film } from "lucide-react";
import FavoriteButton from "@/components/favorite-button";

interface FavoriteMovie {
	id: string;
	title: string;
	year: number;
	posterUrl: string;
	directorName: string;
	genre: string[];
}

export default function FavoritesClientPage() {
	const { favorites } = useFavorites();
	const [movies, setMovies] = useState<FavoriteMovie[]>([]);
	const [loading, setLoading] = useState(true);
	const prevFavoritesRef = useRef<string>("");

	const fetchFavorites = useCallback(async (ids: string[]) => {
		if (ids.length === 0) {
			return [];
		}
		try {
			const res = await fetch(`/api/favorites?ids=${ids.join(",")}`);
			return await res.json();
		} catch {
			return [];
		}
	}, []);

	useEffect(() => {
		const key = favorites.join(",");
		if (key === prevFavoritesRef.current) return;
		prevFavoritesRef.current = key;

		let cancelled = false;
		fetchFavorites(favorites).then((data) => {
			if (!cancelled) {
				setMovies(data);
				setLoading(false);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [favorites, fetchFavorites]);

	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			<div className="mb-12 text-center">
				<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
					<Heart className="h-8 w-8 text-red-500" />
				</div>
				<h1 className="mb-3 font-serif text-4xl font-bold text-foreground sm:text-5xl">
					Your <span className="gold-gradient">Favorites</span>
				</h1>
				<p className="text-muted-foreground">
					{favorites.length === 0
						? "You haven't added any favorites yet."
						: `${favorites.length} film${favorites.length === 1 ? "" : "s"} in your collection`}
				</p>
			</div>

			{loading && favorites.length > 0 ? (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="aspect-[2/3] animate-pulse rounded-xl bg-card"
						/>
					))}
				</div>
			) : movies.length > 0 ? (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{movies.map((movie) => (
						<div key={movie.id} className="group relative">
							<Link
								href={`/movies/${movie.id}`}
								className="card-glow block overflow-hidden rounded-xl bg-card transition-colors hover:bg-card-hover"
							>
								<div className="relative aspect-[2/3] overflow-hidden">
									<Image
										src={movie.posterUrl}
										alt={movie.title}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
									<div className="absolute right-0 bottom-0 left-0 p-4">
										<div className="mb-1 flex flex-wrap gap-1.5">
											{movie.genre.slice(0, 2).map((g) => (
												<span
													key={g}
													className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold"
												>
													{g}
												</span>
											))}
										</div>
									</div>
								</div>
								<div className="p-4">
									<h3 className="mb-1 font-serif text-base font-semibold text-foreground transition-colors group-hover:text-gold">
										{movie.title}
									</h3>
									<p className="text-xs text-muted-foreground">
										{movie.directorName} · {movie.year}
									</p>
								</div>
							</Link>
							<div className="absolute top-3 right-3 z-10">
								<FavoriteButton movieId={movie.id} />
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center py-16 text-center">
					<Film className="mb-4 h-12 w-12 text-muted-foreground/30" />
					<p className="mb-6 text-muted-foreground">
						Start exploring and tap the{" "}
						<Heart className="inline h-4 w-4 text-red-500" /> to save films you
						love.
					</p>
					<Link
						href="/"
						className="rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-black transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
					>
						Explore Collection
					</Link>
				</div>
			)}
		</section>
	);
}
