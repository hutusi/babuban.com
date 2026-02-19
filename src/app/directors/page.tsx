import { getDirectors } from "@/lib/queries";
import DirectorsGrid from "./directors-grid";

export const metadata = {
	title: "Directors — 8½ Classics",
	description: "Explore the visionary directors who shaped the art of cinema.",
};

export default async function DirectorsPage() {
	const directors = await getDirectors();

	return (
		<section className="mx-auto max-w-7xl px-6 py-16">
			{/* Header */}
			<div className="mb-12 text-center">
				<h1 className="mb-3 font-serif text-4xl font-bold text-foreground sm:text-5xl">
					Visionary <span className="gold-gradient">Directors</span>
				</h1>
				<p className="mx-auto max-w-lg text-muted-foreground">
					The architects of cinema&apos;s greatest achievements — masters of
					light, story, and emotion.
				</p>
			</div>

			<DirectorsGrid directors={directors} />
		</section>
	);
}
