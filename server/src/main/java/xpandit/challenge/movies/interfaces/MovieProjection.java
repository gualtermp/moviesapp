package xpandit.challenge.movies.interfaces;

import java.util.Date;

public interface MovieProjection {
    String getId();
    String getTitle();
    Date getReleaseDate();
    Long getRevenue();
}