"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useSyncExternalStore,
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

function getStoredFavorites(): string[] {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return stored ? JSON.parse(stored) : [];
	} catch {
		return [];
	}
}

function subscribe(callback: () => void) {
	window.addEventListener("storage", callback);
	return () => window.removeEventListener("storage", callback);
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
	const serverSnapshot = useCallback(() => [] as string[], []);
	const stored = useSyncExternalStore(subscribe, getStoredFavorites, serverSnapshot);
	const [favorites, setFavorites] = useState<string[]>(stored);

	// Sync to localStorage whenever favorites change
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
