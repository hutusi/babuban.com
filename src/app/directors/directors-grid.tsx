"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DirectorWithMovies } from "@/lib/types";

interface DirectorsGridProps {
	directors: DirectorWithMovies[];
}

export default function DirectorsGrid({ directors }: DirectorsGridProps) {
	const [search, setSearch] = useState("");

	const filtered = useMemo(() => {
		if (!search) return directors;
		const q = search.toLowerCase();
		return directors.filter(
			(d) =>
				d.name.toLowerCase().includes(q) ||
				d.nationality.toLowerCase().includes(q)
		);
	}, [directors, search]);

	return (
		<>
			{/* Search */}
			<div className="mx-auto mb-10 max-w-sm">
				<div className="relative">
					<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search directors..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full rounded-lg border border-white/10 bg-card py-2.5 pr-4 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/30 focus:outline-none focus:ring-1 focus:ring-gold/20"
					/>
				</div>
			</div>

			{/* Grid */}
			{filtered.length > 0 ? (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{filtered.map((director, i) => (
						<motion.div
							key={director.id}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, delay: i * 0.05 }}
						>
							<Link
								href={`/directors/${director.id}`}
								className="card-glow group block overflow-hidden rounded-xl bg-card transition-colors hover:bg-card-hover"
							>
								{/* Photo */}
								<div className="relative aspect-[4/5] overflow-hidden">
									<Image
										src={director.photoUrl}
										alt={director.name}
										fill
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
										className="object-cover transition-transform duration-500 group-hover:scale-105"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

									{/* Nationality badge */}
									<div className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-gold backdrop-blur-sm">
										{director.nationality}
									</div>

									{/* Years */}
									<div className="absolute bottom-3 left-3 text-xs text-muted-foreground">
										{director.birthYear}–{director.deathYear || "present"}
									</div>
								</div>

								{/* Info */}
								<div className="p-4">
									<h3 className="mb-2 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-gold">
										{director.name}
									</h3>
									<div className="flex flex-wrap gap-1.5">
										{director.notableMovies.slice(0, 3).map((movie: string) => (
											<span
												key={movie}
												className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold/80"
											>
												{movie}
											</span>
										))}
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			) : (
				<div className="py-20 text-center">
					<p className="text-lg text-muted-foreground">
						No directors found matching your search.
					</p>
				</div>
			)}
		</>
	);
}
