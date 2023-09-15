package xpandit.challenge.movies;

import java.util.Date;

public interface MovieProjection {
    String getId();
    String getTitle();
    Date getReleaseDate();
    Long getRevenue();
}