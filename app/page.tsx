import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { MovieCard } from "@/components/MovieCard";
import { getMovies } from "@/lib/movies";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export default async function Home() {
  const movies = await getMovies();
  
  // Sort manually if needed or rely on DB order. 
  // Let's ensure 8 1/2 is featured if it exists, otherwise first one.
  const featuredId = "8-1-2";
  const featuredMovie = movies.find(m => m.id === featuredId) || movies[0];
  const collection = movies.filter(m => m.id !== featuredMovie.id);

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <NavBar />
      
      <Hero featuredMovie={featuredMovie} />

      <section className="container mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">The Collection</h2>
            <p className="text-stone-400 font-light">Curated masterpieces from the golden age of cinema.</p>
          </div>
          <div className="mt-4 md:mt-0 text-right">
             <span className="text-amber-500 font-mono text-sm">Showing {collection.length} Films</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {collection.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl text-white mb-2">8 ½</h4>
            <p className="text-stone-500 text-sm">The Classical Cinema Archive</p>
          </div>
          <div className="flex gap-8 text-sm text-stone-500">
            <a href="#" className="hover:text-amber-500 transition-colors">Index</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Directors</a>
            <a href="#" className="hover:text-amber-500 transition-colors">About</a>
          </div>
          <div className="text-stone-600 text-xs">
            © 2026 8 ½ Archive. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
