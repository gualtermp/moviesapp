package xpandit.challenge.movies;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

        // If we get a year, then we know we want the top 10 movies by revenue for it
        if (year != null) {
            // Retrieve top 10 movies by revenue for the specified year
            List<MovieProjection> top10RevenueYearMovies = movieService.getTop10MoviesByRevenueForYear(year);
            return new ResponseEntity<>(top10RevenueYearMovies, HttpStatus.OK);
        }

        if (fields != null && !fields.isEmpty()) {
            // Apply projection using the specified fields
            if ("revenue".equals(sort)) {
                List<MovieProjection> top10RevenueMovies = movieService.getTop10MoviesByRevenue();
                return new ResponseEntity<>(top10RevenueMovies, HttpStatus.OK);
            } else {
                Page<MovieProjection> moviePage = movieService.getAllMoviesByFields(page, size);
                return new ResponseEntity<>(moviePage, HttpStatus.OK);
            }

        } else {
            // No projection, return all fields
            Page<Movie> moviePage = movieService.getAllMovies(page, size);
            return new ResponseEntity<>(moviePage, HttpStatus.OK);
        }
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Movie> getMovieById(@PathVariable String movieId) {
        Movie movie = movieService.getMovieById(movieId);
        if (movie != null) {
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
