export interface Movie {
  id: number;
  title: string;
  revenue: number;
  release_date: string;
  rating: number;
  genres: string[];
  overview: string;
  director: string;
  actors: string[];
  runtime: number;
  vote_average: number;
  vote_count: number;
  metascore: number;
}
