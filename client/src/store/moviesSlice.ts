import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { MoviesState } from "../types/MoviesState";

const initialState = {
  page: 0,
} as MoviesState;

// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSelectedMovieID(state, action: PayloadAction<number | undefined>) {
      state.selectedMovieID = action.payload;
    },
  },
});

// Reselectors
export const selectPage = (state: RootState) => state.movies.page;
export const selectSelectedMovieID = (state: RootState) =>
  state.movies.selectedMovieID;

export const {
  setPage,
  setSelectedMovieID,
} = moviesSlice.actions;

export default moviesSlice.reducer;
