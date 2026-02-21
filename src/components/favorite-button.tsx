"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/lib/favorites-context";
import { motion, AnimatePresence } from "framer-motion";

interface FavoriteButtonProps {
	movieId: string;
	size?: "sm" | "md";
	className?: string;
}

export default function FavoriteButton({
	movieId,
	size = "sm",
	className = "",
}: FavoriteButtonProps) {
	const { toggleFavorite, isFavorite } = useFavorites();
	const favorited = isFavorite(movieId);

	const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
	const padding = size === "sm" ? "p-2" : "p-2.5";

	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				toggleFavorite(movieId);
			}}
			className={`${padding} rounded-full bg-black/60 backdrop-blur-sm transition-all hover:bg-black/80 ${className}`}
			aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
		>
			<AnimatePresence mode="wait">
				<motion.div
					key={favorited ? "filled" : "outline"}
					initial={{ scale: 0.5, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.5, opacity: 0 }}
					transition={{ duration: 0.15 }}
				>
					<Heart
						className={`${iconSize} ${favorited
								? "fill-red-500 text-red-500"
								: "text-white/70 hover:text-white"
							}`}
					/>
				</motion.div>
			</AnimatePresence>
		</button>
	);
}
