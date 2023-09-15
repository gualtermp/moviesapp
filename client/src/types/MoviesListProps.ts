import { Movie } from "./Movie";

export interface MoviesListProps {
  data: Pick<Movie, "title" | "id" | "release_date" | "revenue">[];
  fetches: boolean;
}
