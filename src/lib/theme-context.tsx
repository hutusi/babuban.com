"use client";

import {
	createContext,
	useContext,
	useCallback,
	useSyncExternalStore,
	type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
	theme: "dark",
	toggleTheme: () => { },
});

const STORAGE_KEY = "babuban-theme";

function getStoredTheme(): Theme {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "light" || stored === "dark") return stored;
	} catch { }
	return "dark";
}

function subscribe(callback: () => void) {
	window.addEventListener("storage", callback);
	return () => window.removeEventListener("storage", callback);
}

function getServerSnapshot(): Theme {
	return "dark";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const theme = useSyncExternalStore(subscribe, getStoredTheme, getServerSnapshot);

	// Keep the HTML class in sync
	if (typeof document !== "undefined") {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}

	const toggleTheme = useCallback(() => {
		const next = getStoredTheme() === "dark" ? "light" : "dark";
		localStorage.setItem(STORAGE_KEY, next);
		document.documentElement.classList.toggle("dark", next === "dark");
		// Trigger useSyncExternalStore re-read
		window.dispatchEvent(new StorageEvent("storage"));
	}, []);

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
