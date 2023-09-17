package xpandit.challenge.movies;

import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;
    private final Logger logger = LoggerFactory.getLogger(MovieService.class);

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
        Sort sort = Sort.by(Sort.Direction.DESC, "revenue");

        return movieRepository.findTop10MoviesByRevenue(sort);
    }

    public List<MovieProjection> getTop10MoviesByRevenueForYear(int year) {
        Sort sort = Sort.by(Sort.Direction.DESC, "revenue");

        return movieRepository.findTop10MoviesByRevenueForYear(year, sort);
    }
}
