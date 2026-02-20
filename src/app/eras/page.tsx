import { getMoviesByYearRange } from "@/lib/queries";
import ErasTimeline from "@/components/eras-timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cinema Eras — 8½ Classics",
	description:
		"Journey through the defining eras of cinema history, from the Silent Era to Modern Masters.",
};

const erasData = [
	{
		name: "Silent Era",
		period: "1890–1929",
		startYear: 1890,
		endYear: 1929,
		description:
			"The birth of cinema. Pioneers like Georges Méliès and D.W. Griffith established the visual grammar of film, turning a technological novelty into a powerful art form before the advent of synchronized sound.",
		color: "#A0A0A0",
	},
	{
		name: "Golden Age",
		period: "1930–1959",
		startYear: 1930,
		endYear: 1959,
		description:
			"The studio system era brought Hollywood's finest — sweeping epics, film noir, and the world's first auteurs. Hitchcock, Ozu, and Kurosawa redefined storytelling while the world discovered the universal power of cinema.",
		color: "#D4AF37",
	},
	{
		name: "New Wave",
		period: "1960–1979",
		startYear: 1960,
		endYear: 1979,
		description:
			"Cinema's great revolution. The French Nouvelle Vague, Italian Neorealism, and Japan's radical experimentation shattered conventions. Godard, Fellini, Bergman, and Tarkovsky pushed film into the realm of pure art.",
		color: "#E8553A",
	},
	{
		name: "New Hollywood",
		period: "1980–1999",
		startYear: 1980,
		endYear: 1999,
		description:
			"A generation of filmmakers raised on the New Wave brought artistic ambition to mainstream cinema. Personal vision met blockbuster scale, producing some of the most beloved films ever made.",
		color: "#5B8DEF",
	},
	{
		name: "Modern Masters",
		period: "2000–Present",
		startYear: 2000,
		endYear: 2030,
		description:
			"Digital technology democratized filmmaking while international cinema flourished. Today's masters blend the lessons of every era into bold, visionary works that continue to expand the boundaries of the medium.",
		color: "#A855F7",
	},
];

export default async function ErasPage() {
	const eras = await Promise.all(
		erasData.map(async (era) => ({
			name: era.name,
			period: era.period,
			description: era.description,
			color: era.color,
			movies: await getMoviesByYearRange(era.startYear, era.endYear),
		}))
	);

	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			<div className="mb-16 text-center">
				<h1 className="mb-4 font-serif text-4xl font-bold sm:text-5xl">
					Cinema{" "}
					<span className="gold-gradient">Through the Ages</span>
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					A journey through the defining eras that shaped the art of
					filmmaking — from flickering projections to digital masterworks.
				</p>
			</div>

			<ErasTimeline eras={eras} />
		</section>
	);
}
