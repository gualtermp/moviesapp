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

  return (
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
      <InfoSection title="Year" value={movie?.release_date} />
      <InfoSection title="Genre" value={movie?.genres.join(", ") || "---"} />
      <InfoSection title="Description" value={movie?.overview} />
      <Grid container columnSpacing={5}>
        <Grid item xs={12} lg={2}>
          <InfoSection title="Director" value={movie?.director} />
        </Grid>
        <Grid item xs={12} lg={10}>
          <InfoSection
            title="Actors"
            value={movie?.actors?.slice(0, 4).join("     ") || "-"}
          />
        </Grid>
      </Grid>
      <InfoSection title="Runtime" value={`${movie?.runtime} mins`} />
      <InfoSection title="Rating" value={movie?.vote_average?.toString()} />
      <InfoSection title="Votes" value={movie?.vote_count?.toString()} />
      <InfoSection
        title="Revenue"
        value={`$${movie?.revenue.toLocaleString("en-US")}`}
      />
      <InfoSection title="Metascore" value={movie?.metascore?.toString()} />
    </div>
  );
};
