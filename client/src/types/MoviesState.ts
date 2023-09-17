export interface MoviesState {
  page: number;
  year?: number;
  sortByRevenue: boolean;
  sortByRevenueForYear: boolean;
  selectedMovieID?: string;
}
