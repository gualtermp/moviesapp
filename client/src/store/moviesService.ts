import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Movie } from "../types/Movie";

interface ListResponse<T> {
  currentPage: number;
  totalPages: number;
  content: T[];
}

// Here we define the API
export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    // Pick lets us select what we want to get
    listMovies: builder.query<
      ListResponse<Pick<Movie, "id" | "title" | "releaseDate" | "revenue">>,
      { page: number; }
    >({
      query: ({ page }) =>
        `movies?page=${
          page ?? 0
        }&size=10&fields=id&fields=title&fields=releaseDate&fields=revenue`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry - important for infinite scroll
      // Otherwise we'd keep replacing the data and that's not what we want :)
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    listTop10Movies: builder.query<
      ListResponse<Pick<Movie, "id" | "title" | "releaseDate" | "revenue">>,
      { year?: number }
    >({
      query: ({ year }) =>
        `movies?fields=id&fields=title&fields=releaseDate&fields=revenue&sort=revenue${year ? `&year=${year}` : ""}`,
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => `movies/${id}`,
    }),
  }),
});

// Export hooks to make the calls
export const {
  useListMoviesQuery,
  useListTop10MoviesQuery,
  useGetMovieByIdQuery,
} = moviesApi;
