"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Film, Sun, Moon } from "lucide-react";
import SearchOverlay from "./search-overlay";
import { useTheme } from "@/lib/theme-context";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/movies", label: "Movies" },
	{ href: "/directors", label: "Directors" },
	{ href: "/eras", label: "Eras" },
	{ href: "/favorites", label: "Favorites" },
	{ href: "/about", label: "About" },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();

	return (
		<header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5">
			<div
				className="absolute inset-0 bg-black/80 backdrop-blur-xl"
				style={{ backdropFilter: "blur(20px)" }}
			/>
			<nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
				{/* Logo */}
				<Link href="/" className="group flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 transition-colors group-hover:bg-gold/20">
						<Film className="h-5 w-5 text-gold" />
					</div>
					<div>
						<span className="gold-gradient text-xl font-serif font-bold tracking-wide">
							8½
						</span>
						<span className="ml-1.5 text-sm font-light tracking-widest text-muted-foreground uppercase">
							Classics
						</span>
					</div>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* Actions */}
				<div className="hidden items-center gap-2 md:flex">
					<SearchOverlay />
					<button
						onClick={toggleTheme}
						className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
						aria-label="Toggle theme"
					>
						{theme === "dark" ? (
							<Sun className="h-4 w-4" />
						) : (
							<Moon className="h-4 w-4" />
						)}
					</button>
				</div>

				{/* Mobile Menu Button */}
				<div className="flex items-center gap-2 md:hidden">
					<SearchOverlay />
					<button
						className="relative z-50 text-muted-foreground transition-colors hover:text-foreground"
						onClick={() => setIsOpen(!isOpen)}
						aria-label="Toggle menu"
					>
						{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>

				{/* Mobile Menu */}
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2 }}
							className="absolute top-full left-0 right-0 border-b border-white/5 bg-black/95 backdrop-blur-xl md:hidden"
						>
							<div className="flex flex-col px-6 py-4">
								{navLinks.map((link) => (
									<Link
										key={link.href}
										href={link.href}
										onClick={() => setIsOpen(false)}
										className="border-b border-white/5 py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
									>
										{link.label}
									</Link>
								))}
								<button
									onClick={toggleTheme}
									className="flex items-center gap-2 py-3 text-base text-muted-foreground transition-colors hover:text-foreground"
								>
									{theme === "dark" ? (
										<Sun className="h-4 w-4" />
									) : (
										<Moon className="h-4 w-4" />
									)}
									{theme === "dark" ? "Light Mode" : "Dark Mode"}
								</button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</header>
	);
}
