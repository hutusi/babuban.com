import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/movies";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <Link 
      href={`/movie/${movie.id}`}
      className={cn("group relative block aspect-[2/3] overflow-hidden bg-stone-900", className)}
    >
      <Image
        src={movie.posterUrl}
        alt={movie.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="mb-1 text-amber-500 text-xs font-medium tracking-widest uppercase">
          {movie.year}
        </div>
        <h3 className="font-serif text-lg font-medium leading-tight text-white mb-1">
          {movie.title}
        </h3>
        <p className="text-stone-400 text-sm line-clamp-1">
          {movie.director}
        </p>
      </div>
    </Link>
  );
}
