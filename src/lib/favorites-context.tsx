"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	type ReactNode,
} from "react";

interface FavoritesContextType {
	favorites: string[];
	toggleFavorite: (id: string) => void;
	isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
	favorites: [],
	toggleFavorite: () => { },
	isFavorite: () => false,
});

const STORAGE_KEY = "babuban-favorites";

function readFavorites(): string[] {
	if (typeof window === "undefined") return [];
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
	// Lazy initializer — runs once on mount, no setState-in-effect needed
	const [favorites, setFavorites] = useState<string[]>(readFavorites);

	// Write-only effect: persist changes to localStorage
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
	}, [favorites]);

	const toggleFavorite = useCallback((id: string) => {
		setFavorites((prev) =>
			prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
		);
	}, []);

	const isFavorite = useCallback(
		(id: string) => favorites.includes(id),
		[favorites]
	);

	return (
		<FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
			{children}
		</FavoritesContext.Provider>
	);
}

export function useFavorites() {
	return useContext(FavoritesContext);
}
