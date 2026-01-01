import Link from "next/link";
import { Play } from "lucide-react";
import { Movie } from "@/lib/movies";

interface HeroProps {
  featuredMovie: Movie;
}

export function Hero({ featuredMovie }: HeroProps) {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image Placeholder since we don't have real large assets, using a colored block or pattern would be safer but let's try a backdrop approach */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${featuredMovie.backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/60 to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-2xl animate-fade-in-up">
          <div className="flex items-center gap-4 text-amber-500 mb-6 tracking-widest text-sm font-medium uppercase">
            <span>Featured Presentation</span>
            <span className="w-12 h-[1px] bg-amber-500/50" />
            <span>{featuredMovie.year}</span>
          </div>
          
          <h1 className="font-serif text-6xl md:text-8xl font-medium mb-6 leading-tight">
            {featuredMovie.title}
          </h1>
          
          <p className="text-lg md:text-xl text-stone-300 mb-8 leading-relaxed max-w-xl font-light">
            {featuredMovie.synopsis}
          </p>
          
          <div className="flex items-center gap-4">
            <Link 
              href={`/movie/${featuredMovie.id}`}
              className="px-8 py-3 bg-white text-stone-950 font-medium hover:bg-amber-500 hover:text-white transition-colors duration-300 flex items-center gap-2"
            >
              View Collection
            </Link>
            <button className="px-8 py-3 border border-white/20 text-white hover:border-white transition-colors duration-300">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
