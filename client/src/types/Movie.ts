export interface Movie {
  id: string;
  title: string;
  revenue: number;
  releaseDate: string;
  rating: number;
  genres: string[];
  overview: string;
  director: string;
  actors: string[];
  runtime: number;
  voteAverage: number;
  voteCount: number;
  metascore: number;
}
