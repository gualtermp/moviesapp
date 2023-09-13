package xpandit.challenge.movies;

import java.time.LocalDate;

public interface MovieProjection {
    String getId();
    String getTitle();
    LocalDate getReleaseDate();
    Long getRevenue();
}