package xpandit.challenge.movies;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private Date releaseDate;
    private String title;
    private boolean video;
    private double voteAverage;
    private int voteCount;
    private long revenue;
    private List<String> genres;
    private String director;
    private List<String> actors;
    private int runtime;
    private int metascore;
    
}
