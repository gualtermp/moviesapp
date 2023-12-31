import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  selectSelectedMovieID,
  selectSortByRevenue,
  selectSortByRevenueForYear,
  selectYear,
  setSelectedMovieID,
} from "../../store/moviesSlice";
import {
  useListMoviesQuery,
  useListTop10MoviesQuery,
} from "../../store/moviesService";
import { MoviesList } from "../MoviesList/MoviesList";
import "./MoviesListPage.scss";
import { CircularProgress, Modal } from "@mui/material";
import { MovieInfo } from "../MovieInfo/MovieInfo";

import "./MoviesListPage.scss";
import { Filters } from "../Filters/Filters";

export function MoviesListPage() {
  const dispatch = useDispatch();

  const page = useSelector(selectPage);
  const year = useSelector(selectYear);
  const isSortByRevenue = useSelector(selectSortByRevenue);
  const isSortByRevenueForYear = useSelector(selectSortByRevenueForYear);
  const selectedMovieID = useSelector(selectSelectedMovieID) ?? "";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch movies
  const {
    data: allMovies,
    isLoading,
    isFetching,
  } = useListMoviesQuery({
    page,
  });

  // Fetch top movies
  const { data: topMovies, isFetching: isFetchingTop } =
    useListTop10MoviesQuery(
      {
        year,
      },
      { skip: !isSortByRevenue && !isSortByRevenueForYear } // No fetching needed if no filter is toggled
    );

  useEffect(() => {
    if (selectedMovieID) {
      setIsModalOpen(true);
    }
  }, [selectedMovieID]);

  const handleOnClose = () => {
    dispatch(setSelectedMovieID(undefined));
    setIsModalOpen(false);
  };

  const moviesToShow =
    isSortByRevenue || isSortByRevenueForYear ? topMovies : allMovies;

  if (isFetching || isFetchingTop) {
    return (
      <CircularProgress
        size={80}
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
        }}
      />
    );
  }

  return (
    <>
      <div className="container_movies_list">
        <div className="title_header">
          <div className="title">Movie Ranking</div>
          <Filters />
          {moviesToShow ? (
            <MoviesList
              data={moviesToShow.content ?? moviesToShow}
              fetches={isFetching || isLoading}
            />
          ) : null}
        </div>
      </div>
      <Modal open={isModalOpen}>
        <>
          <MovieInfo movieId={selectedMovieID} onClose={handleOnClose} />
        </>
      </Modal>
    </>
  );
}
