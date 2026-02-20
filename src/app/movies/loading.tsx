export default function MoviesLoading() {
	return (
		<section className="mx-auto max-w-7xl px-6 py-16">
			{/* Header skeleton */}
			<div className="mb-12 text-center">
				<div className="mx-auto mb-4 h-12 w-64 animate-pulse rounded-lg bg-white/5" />
				<div className="mx-auto h-5 w-48 animate-pulse rounded bg-white/5" />
			</div>

			{/* Filters skeleton */}
			<div className="mb-10 flex flex-wrap gap-4">
				<div className="h-10 w-28 animate-pulse rounded-lg bg-white/5" />
				<div className="h-10 w-32 animate-pulse rounded-lg bg-white/5" />
				<div className="h-10 w-36 animate-pulse rounded-lg bg-white/5" />
			</div>

			{/* Grid skeleton */}
			<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<div
						key={i}
						className="aspect-[2/3] animate-pulse rounded-xl bg-white/5"
						style={{ animationDelay: `${i * 75}ms` }}
					/>
				))}
			</div>
		</section>
	);
}
