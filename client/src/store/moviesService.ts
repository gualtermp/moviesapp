import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Movie } from "../types/Movie";

interface ListResponse<T> {
  currentPage: number;
  totalPages: number;
  content: T[];
}

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    // Pick lets us select what we want to get
    listMovies: builder.query<
      ListResponse<Pick<Movie, "id" | "title" | "release_date" | "revenue">>,
      { page: number; }
    >({
      query: ({ page }) =>
        `movies?page=${
          page ?? 0
        }&size=10&fields=id&fields=title&fields=releaseDate&fields=revenue`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        currentCache.content.push(...newItems.content);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getMovieById: builder.query<Movie, string>({
      query: (id) => `movies/${id}`,
    }),
  }),
});

export const {
  useListMoviesQuery,
  useGetMovieByIdQuery,
} = moviesApi;
