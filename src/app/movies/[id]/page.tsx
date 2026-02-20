import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Globe, Star, Film } from "lucide-react";
import { getMovie, getMoviesByDirector } from "@/lib/queries";

interface MovieDetailPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MovieDetailPageProps) {
	const { id } = await params;
	const movie = await getMovie(id);
	if (!movie) return { title: "Movie Not Found" };
	return {
		title: `${movie.title} (${movie.year})`,
		description: movie.synopsis.slice(0, 160),
		openGraph: {
			title: `${movie.title} (${movie.year}) — 8½ Classics`,
			description: movie.synopsis.slice(0, 160),
			type: "video.movie",
			images: [movie.posterUrl],
		},
	};
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
	const { id } = await params;
	const movie = await getMovie(id);
	if (!movie) notFound();

	const directorMovies = (await getMoviesByDirector(movie.directorId)).filter(
		(m) => m.id !== movie.id
	);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Movie",
		name: movie.title,
		dateCreated: movie.year.toString(),
		description: movie.synopsis,
		genre: movie.genre as string[],
		duration: `PT${movie.runtime}M`,
		inLanguage: movie.language,
		countryOfOrigin: { "@type": "Country", name: movie.country },
		director: { "@type": "Person", name: movie.directorName },
		...(movie.rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: movie.rating, bestRating: 10 } } : {}),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<section className="mx-auto max-w-5xl px-6 py-16">
				{/* Back */}
				<Link
					href="/"
					className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
				>
					<ArrowLeft className="h-4 w-4" />
					Back to Collection
				</Link>

				{/* Movie main */}
				<div className="mb-16 flex flex-col gap-10 md:flex-row md:items-start">
					{/* Poster */}
					<div className="card-glow relative aspect-[2/3] w-full max-w-sm shrink-0 overflow-hidden rounded-xl">
						<Image
							src={movie.posterUrl}
							alt={movie.title}
							fill
							sizes="(max-width: 768px) 100vw, 400px"
							className="object-cover"
							priority
						/>
					</div>

					{/* Details */}
					<div className="flex-1">
						{/* Genre tags */}
						<div className="mb-4 flex flex-wrap gap-2">
							{movie.genre.map((g) => (
								<span
									key={g}
									className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold"
								>
									{g}
								</span>
							))}
						</div>

						<h1 className="mb-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
							{movie.title}
						</h1>

						<p className="mb-6 text-lg text-muted-foreground">
							Directed by{" "}
							<Link
								href={`/directors/${movie.directorId}`}
								className="font-medium text-gold transition-colors hover:text-gold-light"
							>
								{movie.directorName}
							</Link>
						</p>

						{/* Meta */}
						<div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
							<div className="rounded-lg border border-white/5 bg-card p-3 text-center">
								<Film className="mx-auto mb-1 h-4 w-4 text-gold" />
								<p className="text-sm font-semibold text-foreground">{movie.year}</p>
								<p className="text-xs text-muted-foreground">Year</p>
							</div>
							<div className="rounded-lg border border-white/5 bg-card p-3 text-center">
								<Clock className="mx-auto mb-1 h-4 w-4 text-gold" />
								<p className="text-sm font-semibold text-foreground">{movie.runtime} min</p>
								<p className="text-xs text-muted-foreground">Runtime</p>
							</div>
							<div className="rounded-lg border border-white/5 bg-card p-3 text-center">
								<Globe className="mx-auto mb-1 h-4 w-4 text-gold" />
								<p className="text-sm font-semibold text-foreground">{movie.language}</p>
								<p className="text-xs text-muted-foreground">Language</p>
							</div>
							{movie.rating && (
								<div className="rounded-lg border border-white/5 bg-card p-3 text-center">
									<Star className="mx-auto mb-1 h-4 w-4 text-gold" />
									<p className="text-sm font-semibold text-foreground">{movie.rating}/10</p>
									<p className="text-xs text-muted-foreground">Rating</p>
								</div>
							)}
						</div>

						{/* Synopsis */}
						<div>
							<h2 className="mb-3 font-serif text-xl font-bold text-foreground">
								Synopsis
							</h2>
							<p className="leading-relaxed text-muted-foreground">{movie.synopsis}</p>
						</div>
					</div>
				</div>

				{/* More from director */}
				{directorMovies.length > 0 && (
					<div>
						<h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
							More from {movie.directorName}
						</h2>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{directorMovies.map((m) => (
								<Link
									key={m.id}
									href={`/movies/${m.id}`}
									className="card-glow group flex gap-4 rounded-xl bg-card p-4 transition-colors hover:bg-card-hover"
								>
									<div className="relative aspect-[2/3] w-16 shrink-0 overflow-hidden rounded-lg">
										<Image
											src={m.posterUrl}
											alt={m.title}
											fill
											sizes="64px"
											className="object-cover"
										/>
									</div>
									<div className="flex flex-col justify-center">
										<h3 className="text-sm font-semibold text-foreground transition-colors group-hover:text-gold">
											{m.title}
										</h3>
										<p className="mt-0.5 text-xs text-muted-foreground">
											{m.year} · {m.runtime} min
										</p>
									</div>
								</Link>
							))}
						</div>
					</div>
				)}
			</section>
		</>
	);
}
