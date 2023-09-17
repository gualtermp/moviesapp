import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { MoviesState } from "../types/MoviesState";

const initialState = {
  page: 0,
  sortByRevenue: false,
  sortByRevenueForYear: false,
} as MoviesState;

// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPage(state) {
      state.page = state.page + 1;
    },
    resetPage(state) {
      state.page = 0;
    },
    setSortByRevenue(state, action: PayloadAction<boolean>) {
      state.sortByRevenue = action.payload;
      state.sortByRevenueForYear = false;
    },
    setSortByRevenueForYear(state, action: PayloadAction<boolean>) {
      state.sortByRevenueForYear = action.payload;
      state.sortByRevenue = false;
    },
    resetSorts(state) {
      state.sortByRevenue = false;
      state.sortByRevenueForYear = false;
    },
    setYear(state, action: PayloadAction<number | undefined>) {
      state.year = action.payload;
    },
    setSelectedMovieID(state, action: PayloadAction<string | undefined>) {
      state.selectedMovieID = action.payload;
    },
  },
});

// Reselectors
export const selectPage = (state: RootState) => state.movies.page;
export const selectSelectedMovieID = (state: RootState) =>
  state.movies.selectedMovieID;
export const selectYear = (state: RootState) => state.movies.year;
export const selectSortByRevenue = (state: RootState) =>
  state.movies.sortByRevenue;
export const selectSortByRevenueForYear = (state: RootState) =>
  state.movies.sortByRevenueForYear;

export const {
  setPage,
  setSelectedMovieID,
  setSortByRevenue,
  setSortByRevenueForYear,
  resetSorts,
  setYear,
} = moviesSlice.actions;

export default moviesSlice.reducer;
