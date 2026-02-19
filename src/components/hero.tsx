"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
	return (
		<section className="film-grain spotlight relative flex min-h-[85vh] items-center justify-center overflow-hidden">
			{/* Background circles */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gold/[0.03] blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-gold/[0.02] blur-3xl" />
			</div>

			<div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
				{/* Tagline */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="mb-8"
				>
					<span className="inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-xs font-medium tracking-widest text-gold uppercase">
						A Curated Cinema Archive
					</span>
				</motion.div>

				{/* Title */}
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
				>
					<span className="gold-gradient">8½</span>
					<span className="text-foreground"> Classics</span>
				</motion.h1>

				{/* Subtitle */}
				<motion.p
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
				>
					Celebrating the masterpieces and visionaries that shaped the art of
					cinema. From Fellini to Kurosawa, explore the films that defined an era.
				</motion.p>

				{/* CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="flex flex-col items-center justify-center gap-4 sm:flex-row"
				>
					<Link
						href="#collection"
						className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
					>
						Explore Collection
						<svg
							className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</Link>
					<Link
						href="/directors"
						className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-gold/30 hover:text-foreground"
					>
						Meet the Directors
					</Link>
				</motion.div>

				{/* Decorative line */}
				<motion.div
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 1.2, delay: 1.2 }}
					className="mx-auto mt-16 h-px w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent"
				/>
			</div>
		</section>
	);
}
