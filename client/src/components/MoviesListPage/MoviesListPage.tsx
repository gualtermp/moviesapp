import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, selectSelectedMovieID, setSelectedMovieID } from "../../store/moviesSlice";
import { useListMoviesQuery } from "../../store/moviesService";
import { MoviesList } from "../MoviesList/MoviesList";

export function MoviesListPage() {
    const dispatch = useDispatch();

    const page = useSelector(selectPage);
    const selectedMovieID = useSelector(selectSelectedMovieID);
  
    const {
      data: allMovies,
      isFetching,
      isLoading,
      isError,
    } = useListMoviesQuery({
      page,
    });


    // const handleOnClose = () => dispatch(setSelectedMovieID(undefined));
  
    return (
      <div>
        <span>
          <div>
            Movie Ranking
            {/* {isFetching && <CircularProgress size={20} />} */}
          </div>
        </span>
        {/* <SelectYear anchorEl={anchorEl} /> */}
        <MoviesList data={allMovies?.content} />
        {/* {selectedMovieID ? (
          <MovieDetails id={selectedMovieID} onClose={handleOnClose} />
        ) : null} */}
      </div>
    );
  }