import { Movie } from "./Movie";

export interface MoviesListProps {
  data: Pick<Movie, "title" | "id" | "releaseDate" | "revenue">[];
  fetches: boolean;
}
