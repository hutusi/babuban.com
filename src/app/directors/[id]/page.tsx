import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { getDirector, getMoviesByDirector } from "@/lib/queries";

interface DirectorDetailPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DirectorDetailPageProps) {
	const { id } = await params;
	const director = await getDirector(id);
	if (!director) return { title: "Director Not Found" };
	return {
		title: `${director.name} — 8½ Classics`,
		description: director.biography.slice(0, 160),
	};
}

export default async function DirectorDetailPage({ params }: DirectorDetailPageProps) {
	const { id } = await params;
	const director = await getDirector(id);
	if (!director) notFound();

	const movies = await getMoviesByDirector(id);

	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			{/* Back button */}
			<Link
				href="/directors"
				className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
			>
				<ArrowLeft className="h-4 w-4" />
				Back to Directors
			</Link>

			{/* Director header */}
			<div className="mb-12 flex flex-col gap-8 md:flex-row md:items-start">
				{/* Photo */}
				<div className="relative aspect-[3/4] w-full max-w-xs shrink-0 overflow-hidden rounded-xl">
					<Image
						src={director.photoUrl}
						alt={director.name}
						fill
						sizes="320px"
						className="object-cover"
						priority
					/>
				</div>

				{/* Info */}
				<div className="flex-1">
					<h1 className="mb-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
						{director.name}
					</h1>

					<div className="mb-6 flex flex-wrap gap-4">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<MapPin className="h-4 w-4 text-gold" />
							{director.nationality}
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Calendar className="h-4 w-4 text-gold" />
							{director.birthYear}–{director.deathYear || "present"}
						</div>
					</div>

					<p className="leading-relaxed text-muted-foreground">
						{director.biography}
					</p>
				</div>
			</div>

			{/* Filmography */}
			<div>
				<h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
					Filmography
				</h2>

				{movies.length > 0 ? (
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{movies.map((movie) => (
							<Link
								key={movie.id}
								href={`/movies/${movie.id}`}
								className="card-glow group flex gap-4 rounded-xl bg-card p-4 transition-colors hover:bg-card-hover"
							>
								<div className="relative aspect-[2/3] w-20 shrink-0 overflow-hidden rounded-lg">
									<Image
										src={movie.posterUrl}
										alt={movie.title}
										fill
										sizes="80px"
										className="object-cover"
									/>
								</div>
								<div className="flex flex-col justify-center">
									<h3 className="font-serif font-semibold text-foreground transition-colors group-hover:text-gold">
										{movie.title}
									</h3>
									<p className="mt-1 text-sm text-muted-foreground">
										{movie.year} · {movie.runtime} min
									</p>
									<div className="mt-2 flex flex-wrap gap-1">
										{movie.genre.slice(0, 2).map((g) => (
											<span
												key={g}
												className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold/80"
											>
												{g}
											</span>
										))}
									</div>
								</div>
							</Link>
						))}
					</div>
				) : (
					<p className="text-muted-foreground">No films found for this director.</p>
				)}
			</div>
		</section>
	);
}
