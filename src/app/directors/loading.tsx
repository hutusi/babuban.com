export default function DirectorsLoading() {
	return (
		<section className="mx-auto max-w-6xl px-6 py-16">
			{/* Header skeleton */}
			<div className="mb-12 text-center">
				<div className="mx-auto mb-4 h-12 w-72 animate-pulse rounded-lg bg-white/5" />
				<div className="mx-auto h-5 w-96 animate-pulse rounded bg-white/5" />
			</div>

			{/* Search skeleton */}
			<div className="mx-auto mb-10 h-12 max-w-md animate-pulse rounded-xl bg-white/5" />

			{/* Grid skeleton */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 6 }).map((_, i) => (
					<div
						key={i}
						className="aspect-[4/5] animate-pulse rounded-xl bg-white/5"
						style={{ animationDelay: `${i * 75}ms` }}
					/>
				))}
			</div>
		</section>
	);
}
