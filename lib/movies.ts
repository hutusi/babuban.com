import { prisma } from "@/lib/db";
import { Movie as PrismaMovie, Genre } from "@prisma/client";

export type Movie = PrismaMovie & {
  genres: string[]; // transforming from Genre[] object to string[] for UI convenience if needed, or just keep as objects
};

// Helper to transform Prisma result to our UI shape
// The UI currently expects 'genre' as string[] but Prisma returns genres as { name: string }[]
function transformMovie(movie: PrismaMovie & { genres: Genre[] }): Movie {
  return {
    ...movie,
    genres: movie.genres.map(g => g.name)
  };
}

export async function getMovies(): Promise<Movie[]> {
  const movies = await prisma.movie.findMany({
    include: {
      genres: true
    },
    orderBy: {
      year: 'desc'
    }
  });
  
  return movies.map(transformMovie);
}

export async function getMovieById(id: string): Promise<Movie | null> {
  const movie = await prisma.movie.findUnique({
    where: { id },
    include: {
      genres: true
    }
  });

  if (!movie) return null;
  return transformMovie(movie);
}