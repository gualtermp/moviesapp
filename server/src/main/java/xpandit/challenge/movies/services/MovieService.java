package xpandit.challenge.movies.services;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import xpandit.challenge.movies.entities.Movie;
import xpandit.challenge.movies.interfaces.MovieProjection;
import xpandit.challenge.movies.repositories.MovieRepository;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public Page<Movie> getAllMovies(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "voteAverage"));
        return movieRepository.findAll(pageable);
    }

    public Page<MovieProjection> getAllMoviesByFields(int page, int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(
                Sort.Order.desc("voteCount"),
                Sort.Order.desc("voteAverage")));
        return movieRepository.findAllProjectedBy(pageable);
    }

    public Movie getMovieById(String movieId) {
        return movieRepository.findById(movieId).orElse(null);
    }

    public List<MovieProjection> getTop10MoviesByRevenue() {
        Pageable pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Order.desc("revenue")));
        Page<MovieProjection> moviesPage = movieRepository.findTop10MoviesByRevenue(pageRequest);
        List<MovieProjection> top10MoviesByRevenue = moviesPage.getContent();
        return top10MoviesByRevenue;
    }

    public List<MovieProjection> getTop10MoviesByRevenueForYear(int year) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate;
        Date endDate;

        try {
            startDate = dateFormat.parse(year + "-01-01");
            endDate = dateFormat.parse(year + "-12-31");
        } catch (ParseException e) {
            return Collections.emptyList(); 
        }

        Pageable pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Order.desc("revenue")));
        Page<MovieProjection> moviesPage = movieRepository.findTop10MoviesByRevenueForYear(year, startDate, endDate, pageRequest);
        List<MovieProjection> top10MoviesByRevenueForYear = moviesPage.getContent();
        return top10MoviesByRevenueForYear;
    }
}
