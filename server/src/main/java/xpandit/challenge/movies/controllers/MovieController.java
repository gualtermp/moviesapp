package xpandit.challenge.movies.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import xpandit.challenge.movies.entities.Movie;
import xpandit.challenge.movies.interfaces.MovieProjection;
import xpandit.challenge.movies.services.MovieService;

@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<?> getMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) List<String> fields,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Integer year) {
        try {
            // Some input validation
            if (page < 0 || size < 1) {
                return new ResponseEntity<>("Invalid page or size values", HttpStatus.BAD_REQUEST);
            }

            if (year != null) {
                List<MovieProjection> top10RevenueYearMovies = movieService.getTop10MoviesByRevenueForYear(year);
                return new ResponseEntity<>(top10RevenueYearMovies, HttpStatus.OK);
            }

            if (fields != null && !fields.isEmpty()) {
                if ("revenue".equals(sort)) {
                    List<MovieProjection> top10RevenueMovies = movieService.getTop10MoviesByRevenue();
                    return new ResponseEntity<>(top10RevenueMovies, HttpStatus.OK);
                } else {
                    Page<MovieProjection> moviePage = movieService.getAllMoviesByFields(page, size);
                    return new ResponseEntity<>(moviePage, HttpStatus.OK);
                }
            } else {
                Page<Movie> moviePage = movieService.getAllMovies(page, size);
                return new ResponseEntity<>(moviePage, HttpStatus.OK);
            }
        } catch (Exception e) {
            return handleException(e);
        }
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<?> getMovieById(@PathVariable String movieId) {
        try {
            Movie movie = movieService.getMovieById(movieId);
            if (movie != null) {
                return new ResponseEntity<>(movie, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return handleException(e);
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
