"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Filter, X } from "lucide-react";

interface MovieFiltersProps {
	genres: string[];
	decades: number[];
	countries: string[];
}

export default function MovieFilters({
	genres,
	decades,
	countries,
}: MovieFiltersProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const currentGenre = searchParams.get("genre") || "";
	const currentDecade = searchParams.get("decade") || "";
	const currentCountry = searchParams.get("country") || "";

	const hasFilters = currentGenre || currentDecade || currentCountry;

	const updateFilter = useCallback(
		(key: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}
			router.push(`${pathname}?${params.toString()}`);
		},
		[router, pathname, searchParams]
	);

	const clearFilters = useCallback(() => {
		router.push(pathname);
	}, [router, pathname]);

	return (
		<div className="mb-10">
			<div className="flex flex-wrap items-center gap-4">
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Filter className="h-4 w-4 text-gold" />
					<span>Filter by</span>
				</div>

				{/* Genre */}
				<select
					value={currentGenre}
					onChange={(e) => updateFilter("genre", e.target.value)}
					className="rounded-lg border border-white/10 bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold/30"
				>
					<option value="">All Genres</option>
					{genres.map((g) => (
						<option key={g} value={g}>
							{g}
						</option>
					))}
				</select>

				{/* Decade */}
				<select
					value={currentDecade}
					onChange={(e) => updateFilter("decade", e.target.value)}
					className="rounded-lg border border-white/10 bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold/30"
				>
					<option value="">All Decades</option>
					{decades.map((d) => (
						<option key={d} value={d.toString()}>
							{d}s
						</option>
					))}
				</select>

				{/* Country */}
				<select
					value={currentCountry}
					onChange={(e) => updateFilter("country", e.target.value)}
					className="rounded-lg border border-white/10 bg-card px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-gold/30"
				>
					<option value="">All Countries</option>
					{countries.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>

				{/* Clear */}
				{hasFilters && (
					<button
						onClick={clearFilters}
						className="flex items-center gap-1 rounded-lg bg-gold/10 px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold/20"
					>
						<X className="h-3 w-3" />
						Clear
					</button>
				)}
			</div>
		</div>
	);
}
