"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { MovieWithDirector } from "@/lib/types";

interface Era {
	name: string;
	period: string;
	description: string;
	color: string;
	movies: MovieWithDirector[];
}

interface ErasTimelineProps {
	eras: Era[];
}

export default function ErasTimeline({ eras }: ErasTimelineProps) {
	return (
		<div className="relative">
			{/* Vertical timeline line */}
			<div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent md:left-1/2" />

			{eras.map((era, index) => (
				<motion.div
					key={era.name}
					initial={{ opacity: 0, y: 60 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className={`relative mb-20 flex flex-col gap-8 md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
						}`}
				>
					{/* Timeline dot */}
					<div className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2">
						<motion.div
							whileInView={{ scale: [0, 1.4, 1] }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
							className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/50 bg-black shadow-lg shadow-gold/10"
						>
							<span className="text-xs font-bold text-gold">
								{era.period.split("–")[0].slice(-2)}s
							</span>
						</motion.div>
					</div>

					{/* Content card */}
					<div
						className={`ml-16 flex-1 md:ml-0 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"
							} ${index % 2 === 0 ? "md:text-right" : ""}`}
					>
						<div className="rounded-2xl border border-white/5 bg-card p-6">
							<span
								className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-semibold"
								style={{
									backgroundColor: `${era.color}15`,
									color: era.color,
								}}
							>
								{era.period}
							</span>
							<h3 className="mb-2 font-serif text-2xl font-bold text-foreground">
								{era.name}
							</h3>
							<p className="mb-6 text-sm leading-relaxed text-muted-foreground">
								{era.description}
							</p>

							{/* Films grid */}
							{era.movies.length > 0 && (
								<div
									className={`grid gap-3 sm:grid-cols-2 ${index % 2 === 0 ? "md:justify-items-end" : ""
										}`}
								>
									{era.movies.map((movie) => (
										<Link
											key={movie.id}
											href={`/movies/${movie.id}`}
											className="group flex gap-3 rounded-xl bg-black/30 p-3 text-left transition-colors hover:bg-black/50"
										>
											<div className="relative aspect-[2/3] w-12 shrink-0 overflow-hidden rounded-lg">
												<Image
													src={movie.posterUrl}
													alt={movie.title}
													fill
													sizes="48px"
													className="object-cover"
												/>
											</div>
											<div className="flex flex-col justify-center">
												<h4 className="text-sm font-semibold text-foreground transition-colors group-hover:text-gold">
													{movie.title}
												</h4>
												<p className="text-xs text-muted-foreground">
													{movie.directorName} · {movie.year}
												</p>
											</div>
										</Link>
									))}
								</div>
							)}

							{era.movies.length === 0 && (
								<p className="text-sm italic text-muted-foreground/50">
									No films from this era in the collection yet.
								</p>
							)}
						</div>
					</div>

					{/* Spacer for alternating layout */}
					<div className="hidden flex-1 md:block" />
				</motion.div>
			))}
		</div>
	);
}
