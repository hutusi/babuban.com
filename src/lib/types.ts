export interface Director {
  id: string;
  name: string;
  birthYear: number;
  deathYear?: number;
  nationality: string;
  biography: string;
  photoUrl: string;
  notableMovies: string[];
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  directorId: string;
  directorName: string;
  genre: string[];
  synopsis: string;
  posterUrl: string;
  runtime: number; // minutes
  rating?: number; // IMDb-style 1-10
  language: string;
  country: string;
}
