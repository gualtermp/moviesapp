import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  selectSelectedMovieID,
  setPage,
  setSelectedMovieID,
} from "../../store/moviesSlice";
import { useListMoviesQuery } from "../../store/moviesService";
import { MoviesList } from "../MoviesList/MoviesList";
import "./MoviesListPage.scss";
import { CircularProgress, Modal } from "@mui/material";
import { MovieInfo } from "../MovieInfo/MovieInfo";

import "./MoviesListPage.scss";

export function MoviesListPage() {
  const dispatch = useDispatch();

  const page = useSelector(selectPage);
  const selectedMovieID = useSelector(selectSelectedMovieID) ?? "";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: allMovies, isLoading, isFetching } = useListMoviesQuery({
    page,
  });

  useEffect(() => {
    if (selectedMovieID) {
      setIsModalOpen(true);
    }
  }, [selectedMovieID]);

  const handleOnClose = () => {
    dispatch(setSelectedMovieID(undefined));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container_movies_list">
        <div className="title_header">
          <div className="title">
            Movie Ranking
            {isFetching && <CircularProgress size={20} />}
          </div>
          {allMovies?.content ? (
            <MoviesList
              data={allMovies?.content}
              fetches={isFetching || isLoading}
            />
          ) : null}
        </div>
      </div>
      <Modal open={isModalOpen}>
        <MovieInfo movieId={selectedMovieID} onClose={handleOnClose} />
      </Modal>
    </>
  );
}
