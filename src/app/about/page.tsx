import { Film, Heart, Eye, Award } from "lucide-react";

export const metadata = {
	title: "About — 8½ Classics",
	description: "Learn about the mission behind 8½ Classics — a curated archive celebrating cinema's greatest achievements.",
};

const values = [
	{
		icon: Film,
		title: "Curation",
		description:
			"Every film in our collection has been carefully selected for its artistic merit, cultural significance, and enduring impact on cinema.",
	},
	{
		icon: Heart,
		title: "Passion",
		description:
			"Born from a deep love of film, 8½ Classics exists to share the magic of cinema's golden age with a new generation of viewers.",
	},
	{
		icon: Eye,
		title: "Discovery",
		description:
			"We believe in the joy of discovery — finding that one film that changes how you see the world and the art of storytelling.",
	},
	{
		icon: Award,
		title: "Legacy",
		description:
			"These films aren't just entertainment — they are cultural touchstones that continue to influence filmmakers and audiences worldwide.",
	},
];

const stats = [
	{ label: "Directors", value: "8" },
	{ label: "Films", value: "16" },
	{ label: "Countries", value: "7" },
	{ label: "Decades", value: "4" },
];

export default function AboutPage() {
	return (
		<section className="mx-auto max-w-5xl px-6 py-16">
			{/* Header */}
			<div className="mb-16 text-center">
				<h1 className="mb-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
					About <span className="gold-gradient">8½ Classics</span>
				</h1>
				<p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
					Named after Federico Fellini&apos;s masterpiece, 8½ Classics is a
					curated digital archive celebrating the films and directors that
					defined the art of cinema.
				</p>
			</div>

			{/* The Story */}
			<div className="mb-20 rounded-2xl border border-white/5 bg-card p-8 md:p-12">
				<h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
					The Story
				</h2>
				<div className="space-y-4 text-muted-foreground leading-relaxed">
					<p>
						Cinema is more than moving pictures — it is humanity&apos;s collective
						dream, captured frame by frame. From the sun-drenched piazzas of
						Fellini&apos;s Rome to the rain-soaked forests of Kurosawa&apos;s
						medieval Japan, the films in our collection represent the pinnacle of visual
						storytelling.
					</p>
					<p>
						8½ Classics began as a personal project — a way to organize and
						celebrate the films that have shaped our understanding of what cinema
						can be. It grew into something more: a curated space where film
						lovers can explore the works of the greatest directors in history.
					</p>
					<p>
						Each entry in our archive is accompanied by context — the historical
						moment that birthed it, the director&apos;s vision, and the lasting
						impact it has had on the art form. We believe that understanding a
						film&apos;s origins deepens the experience of watching it.
					</p>
				</div>
			</div>

			{/* Values */}
			<div className="mb-20">
				<h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
					Our Values
				</h2>
				<div className="grid gap-6 sm:grid-cols-2">
					{values.map((value) => (
						<div
							key={value.title}
							className="rounded-xl border border-white/5 bg-card p-6 transition-colors hover:bg-card-hover"
						>
							<div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
								<value.icon className="h-5 w-5 text-gold" />
							</div>
							<h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
								{value.title}
							</h3>
							<p className="text-sm leading-relaxed text-muted-foreground">
								{value.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Stats */}
			<div className="rounded-2xl border border-white/5 bg-card p-8 md:p-12">
				<h2 className="mb-8 text-center font-serif text-2xl font-bold text-foreground">
					By the Numbers
				</h2>
				<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
					{stats.map((stat) => (
						<div key={stat.label} className="text-center">
							<p className="gold-gradient text-4xl font-bold">{stat.value}</p>
							<p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
