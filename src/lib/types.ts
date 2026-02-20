import { InferSelectModel } from "drizzle-orm";
import { directors, movies } from "@/db/schema";

export type Director = InferSelectModel<typeof directors>;
export type Movie = InferSelectModel<typeof movies>;

/** Director with computed fields for display */
export type DirectorWithMovies = Director & {
  notableMovies: string[];
};

/** Movie with computed director name for display */
export type MovieWithDirector = Movie & {
  directorName: string;
};
