"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MovieWithDirector } from "@/lib/types";

interface MovieCardProps {
	movie: MovieWithDirector;
	index: number;
}

export default function MovieCard({ movie, index }: MovieCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-50px" }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
		>
			<Link
				href={`/movies/${movie.id}`}
				className="card-glow group relative block overflow-hidden rounded-xl bg-card transition-colors hover:bg-card-hover"
			>
				{/* Poster */}
				<div className="relative aspect-[2/3] overflow-hidden">
					<Image
						src={movie.posterUrl}
						alt={movie.title}
						fill
						sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
						className="object-cover transition-transform duration-500 group-hover:scale-105"
					/>
					{/* Gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

					{/* Year badge */}
					<div className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-gold backdrop-blur-sm">
						{movie.year}
					</div>

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
					</div>
				</div>

				{/* Card body */}
				<div className="p-4">
					<h3 className="mb-1 font-serif text-base font-semibold text-foreground transition-colors group-hover:text-gold">
						{movie.title}
					</h3>
					<p className="text-xs text-muted-foreground">
						{movie.directorName}
					</p>
				</div>
			</Link>
		</motion.div>
	);
}
