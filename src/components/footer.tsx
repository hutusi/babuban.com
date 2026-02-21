import Link from "next/link";
import { Film } from "lucide-react";

export default function Footer() {
	return (
		<footer className="border-t border-white/5 bg-black">
			<div className="mx-auto max-w-7xl px-6 py-12">
				<div className="grid gap-8 md:grid-cols-3">
					{/* Brand */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10">
								<Film className="h-4 w-4 text-gold" />
							</div>
							<div>
								<span className="gold-gradient text-lg font-serif font-bold">8½</span>
								<span className="ml-1 text-xs font-light tracking-widest text-muted-foreground uppercase">
									Classics
								</span>
							</div>
						</div>
						<p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
							Celebrating the masterpieces and visionaries that shaped the art of cinema.
						</p>
					</div>

					{/* Navigation */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
							Explore
						</h3>
						<nav className="flex flex-col gap-2">
							<Link
								href="/"
								className="text-sm text-muted-foreground transition-colors hover:text-gold"
							>
								Collection
							</Link>
							<Link
								href="/movies"
								className="text-sm text-muted-foreground transition-colors hover:text-gold"
							>
								Movies
							</Link>
							<Link
								href="/directors"
								className="text-sm text-muted-foreground transition-colors hover:text-gold"
							>
								Directors
							</Link>
							<Link
								href="/eras"
								className="text-sm text-muted-foreground transition-colors hover:text-gold"
							>
								Eras
							</Link>
							<Link
								href="/favorites"
								className="text-sm text-muted-foreground transition-colors hover:text-gold"
							>
								Favorites
							</Link>
							<Link
								href="/about"
								className="text-sm text-muted-foreground transition-colors hover:text-gold"
							>
								About
							</Link>
						</nav>
					</div>

					{/* Info */}
					<div className="space-y-4">
						<h3 className="text-sm font-semibold tracking-wider text-foreground uppercase">
							About
						</h3>
						<p className="text-sm leading-relaxed text-muted-foreground">
							A curated archive of cinema&apos;s greatest achievements, from the
							golden age to the modern era.
						</p>
					</div>
				</div>

				{/* Bottom */}
				<div className="mt-12 border-t border-white/5 pt-8 text-center">
					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} 8½ Classics. Made with love for cinema.
					</p>
				</div>
			</div>
		</footer>
	);
}
