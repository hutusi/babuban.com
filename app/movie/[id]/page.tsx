import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Film, Calendar } from "lucide-react";
import { getMovieById } from "@/lib/movies";
import { NavBar } from "@/components/NavBar";

// In Next.js 15+ (and 16), params are promises in async components
type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieById(id);
  
  if (!movie) {
    return { title: "Movie Not Found" };
  }

  return {
    title: `${movie.title} (${movie.year}) | 8 ½`,
    description: movie.synopsis,
  };
}

export default async function MoviePage({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 pb-20">
      <NavBar />

      {/* Hero Backdrop */}
      <div className="relative h-[60vh] w-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 h-full flex items-center pt-20">
          <Link 
            href="/"
            className="absolute top-24 left-6 md:left-12 flex items-center gap-2 text-stone-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm uppercase tracking-widest">Back to Collection</span>
          </Link>
        </div>
      </div>

      {/* Content Content */}
      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Poster */}
          <div className="flex-shrink-0 w-full md:w-[350px]">
            <div className="relative aspect-[2/3] shadow-2xl shadow-black/50 border border-white/5 rounded-sm overflow-hidden">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
               <button className="col-span-2 bg-amber-600 hover:bg-amber-500 text-white py-3 font-medium transition-colors uppercase tracking-wider text-sm">
                 Watch Now
               </button>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 pt-4 md:pt-12">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-stone-400 mb-8 font-light">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                <span>{movie.rating}</span>
              </div>
               <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-500" />
                <span>{movie.director}</span>
              </div>
            </div>

            <div className="border-t border-b border-white/10 py-8 mb-8">
              <h3 className="text-amber-500 uppercase tracking-widest text-sm mb-4">Synopsis</h3>
              <p className="text-xl leading-relaxed text-stone-200 font-serif opacity-90">
                {movie.synopsis}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-amber-500 uppercase tracking-widest text-sm mb-4">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(g => (
                    <span key={g} className="px-3 py-1 bg-stone-900 border border-white/10 text-stone-300 text-sm">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                 <h3 className="text-amber-500 uppercase tracking-widest text-sm mb-4">Director</h3>
                 <p className="text-lg text-white font-serif italic">{movie.director}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
