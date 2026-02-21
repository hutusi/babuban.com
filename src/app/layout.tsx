import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { FavoritesProvider } from "@/lib/favorites-context";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "8½ Classics — A Curated Cinema Archive",
    template: "%s | 8½ Classics",
  },
  description:
    "Celebrating the masterpieces and visionaries that shaped the art of cinema. Explore films from Fellini, Kurosawa, Bergman, Tarkovsky, and more.",
  keywords: [
    "cinema",
    "classic films",
    "directors",
    "Fellini",
    "Kurosawa",
    "film archive",
  ],
  openGraph: {
    type: "website",
    siteName: "8½ Classics",
    locale: "en_US",
    title: "8½ Classics — A Curated Cinema Archive",
    description:
      "Celebrating the masterpieces and visionaries that shaped the art of cinema.",
  },
  metadataBase: new URL("https://babuban.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <FavoritesProvider>
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="pt-[73px]">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
