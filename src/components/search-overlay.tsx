"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Film, User } from "lucide-react";
import Image from "next/image";
import { searchAll, type SearchResult } from "@/lib/actions";

export default function SearchOverlay() {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

	// Cmd+K shortcut
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === "k") {
				e.preventDefault();
				setIsOpen(true);
			}
			if (e.key === "Escape") setIsOpen(false);
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, []);

	// Focus input when opened
	useEffect(() => {
		if (isOpen) {
			setTimeout(() => inputRef.current?.focus(), 100);
		}
	}, [isOpen]);

	// Reset on close
	const handleClose = useCallback(() => {
		setIsOpen(false);
		setQuery("");
		setResults([]);
	}, []);

	// Debounced search
	const handleSearch = useCallback((value: string) => {
		setQuery(value);
		if (debounceRef.current) clearTimeout(debounceRef.current);
		if (value.trim().length < 2) {
			setResults([]);
			return;
		}
		setLoading(true);
		debounceRef.current = setTimeout(async () => {
			const data = await searchAll(value);
			setResults(data);
			setLoading(false);
		}, 250);
	}, []);

	const handleSelect = (result: SearchResult) => {
		handleClose();
		const path =
			result.type === "movie"
				? `/movies/${result.id}`
				: `/directors/${result.id}`;
		router.push(path);
	};

	return (
		<>
			{/* Trigger button */}
			<button
				onClick={() => setIsOpen(true)}
				className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-foreground transition-all hover:border-gold/30 hover:text-foreground"
				aria-label="Search"
			>
				<Search className="h-3.5 w-3.5" />
				<span className="hidden sm:inline">Search</span>
				<kbd className="hidden rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-medium sm:inline">
					⌘K
				</kbd>
			</button>

			{/* Overlay */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
							onClick={handleClose}
						/>

						{/* Search panel */}
						<motion.div
							initial={{ opacity: 0, y: -20, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.98 }}
							transition={{ duration: 0.2 }}
							className="fixed top-[15%] left-1/2 z-[101] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
						>
							{/* Input */}
							<div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
								<Search className="h-5 w-5 shrink-0 text-muted-foreground" />
								<input
									ref={inputRef}
									type="text"
									placeholder="Search movies, directors..."
									value={query}
									onChange={(e) => handleSearch(e.target.value)}
									className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground/50"
								/>
								<button
									onClick={handleClose}
									className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground"
								>
									<X className="h-4 w-4" />
								</button>
							</div>

							{/* Results */}
							<div className="max-h-80 overflow-y-auto">
								{loading && (
									<div className="px-5 py-8 text-center text-sm text-muted-foreground">
										Searching...
									</div>
								)}

								{!loading && query.length >= 2 && results.length === 0 && (
									<div className="px-5 py-8 text-center text-sm text-muted-foreground">
										No results found for &ldquo;{query}&rdquo;
									</div>
								)}

								{!loading && results.length > 0 && (
									<div className="py-2">
										{results.map((result) => (
											<button
												key={`${result.type}-${result.id}`}
												onClick={() => handleSelect(result)}
												className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-white/5"
											>
												<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-white/5">
													{result.imageUrl ? (
														<Image
															src={result.imageUrl}
															alt={result.title}
															fill
															sizes="40px"
															className="object-cover"
														/>
													) : (
														<div className="flex h-full w-full items-center justify-center">
															{result.type === "movie" ? (
																<Film className="h-4 w-4 text-gold/40" />
															) : (
																<User className="h-4 w-4 text-gold/40" />
															)}
														</div>
													)}
												</div>
												<div className="min-w-0 flex-1">
													<p className="truncate text-sm font-medium text-foreground">
														{result.title}
													</p>
													<p className="truncate text-xs text-muted-foreground">
														{result.subtitle}
													</p>
												</div>
												<span className="shrink-0 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-medium text-gold/70 capitalize">
													{result.type}
												</span>
											</button>
										))}
									</div>
								)}

								{!loading && query.length < 2 && (
									<div className="px-5 py-8 text-center text-sm text-muted-foreground">
										Type at least 2 characters to search
									</div>
								)}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
