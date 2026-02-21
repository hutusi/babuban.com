import type { Metadata } from "next";
import FavoritesClientPage from "./client-page";

export const metadata: Metadata = {
	title: "Favorites",
	description: "Your curated list of favorite classic films.",
};

export default function FavoritesPage() {
	return <FavoritesClientPage />;
}
