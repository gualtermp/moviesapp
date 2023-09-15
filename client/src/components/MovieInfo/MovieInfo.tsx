import { Divider, Grid, IconButton, SxProps, Theme } from "@mui/material";
import { useGetMovieByIdQuery } from "../../store/moviesService";
import MovieInfoProps from "../../types/MovieInfoProps";
import { InfoSection } from "../InfoSection/InfoSection";

import "./MovieInfo.scss";

const divider: SxProps<Theme> = {
  width: 50,
  borderColor: "#21B3CF",
  borderWidth: 1.5,
  marginTop: 0,
  marginBottom: 2
};

export const MovieInfo = ({ movieId, onClose }: MovieInfoProps) => {
  const { data: movie } = useGetMovieByIdQuery(movieId);

  return movie ? (
    <div className="movie_info_container">
      <div className="movie_info_header">
        <span className="title">{movie?.title}</span>
        <div>
          <IconButton disableRipple onClick={onClose}>
            x
          </IconButton>
          <span onClick={onClose}>Close</span>
        </div>
      </div>
      <Divider sx={divider}/>
      <InfoSection title="Year" value={new Date(movie.releaseDate).getFullYear().toString()} />
      <InfoSection title="Genre" value={movie.genres.join(", ") || "---"} />
      <InfoSection title="Description" value={movie.overview} specialClass="description" />
      <Grid container columnSpacing={5}>
        <Grid item xs={12} lg={2}>
          <InfoSection title="Director" value={movie.director} specialClass="makers" />
        </Grid>
        <Grid item xs={12} lg={10}>
          <InfoSection
            title="Actors"
            value={movie.actors.slice(0, 4).join("  ") || "No actors"}
            specialClass="makers" 
          />
        </Grid>
      </Grid>
      <InfoSection title="Runtime" value={`${movie.runtime} mins`} />
      <InfoSection title="Rating" value={movie.voteAverage.toString()} />
      <InfoSection title="Votes" value={movie.voteCount.toString()} />
      <InfoSection
        title="Revenue"
        value={`$${movie.revenue.toLocaleString("en-US")}`}
      />
      <InfoSection title="Metascore" value={movie.metascore.toString()} />
    </div>
  ): null;
};
