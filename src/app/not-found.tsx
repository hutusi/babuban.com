import Link from "next/link";
import { Film } from "lucide-react";

export default function NotFound() {
	return (
		<section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
			<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gold/10">
				<Film className="h-10 w-10 text-gold" />
			</div>
			<h1 className="mb-3 font-serif text-5xl font-bold text-foreground">
				Scene Not Found
			</h1>
			<p className="mb-2 text-lg text-muted-foreground">
				This reel seems to have gone missing from the archive.
			</p>
			<p className="mb-8 text-sm text-muted-foreground/60">
				Error 404 — The page you&apos;re looking for doesn&apos;t exist.
			</p>
			<Link
				href="/"
				className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
			>
				Back to Home
			</Link>
		</section>
	);
}
