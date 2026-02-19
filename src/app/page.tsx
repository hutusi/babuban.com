import Hero from "@/components/hero";
import MovieCollection from "@/components/movie-collection";
import { getMovies, getAllGenres } from "@/lib/queries";

export default async function HomePage() {
  const movies = await getMovies();
  const genres = getAllGenres();

  return (
    <>
      <Hero />
      <MovieCollection movies={movies} genres={genres} />
    </>
  );
}
