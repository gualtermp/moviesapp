package xpandit.challenge.movies.entities;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Document(collection = "movies")
@Data
public class Movie {

    @Id
    private String id;
    private boolean adult;
    private String backdropPath;
    private int movieId;
    private String originalLanguage;
    private String originalTitle;
    private String overview;
    private double popularity;
    private String posterPath;
    @Field("release_date")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private Date releaseDate;
    private String title;
    private boolean video;
    @Field("vote_average")
    private double voteAverage;
    @Field("vote_count")
    private int voteCount;
    private long revenue;
    private List<String> genres;
    private String director;
    private List<String> actors;
    private int runtime;
    private int metascore;

}
