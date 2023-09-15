import {Movie} from "./Movie";

export interface MoviesListProps {
  data?: Pick<Movie, "title" | "id" | "release_date" | "revenue">[];
  isFetching: boolean;
  loadMoreData: () => void;
}