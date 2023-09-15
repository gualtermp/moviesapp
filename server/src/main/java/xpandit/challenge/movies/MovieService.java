package xpandit.challenge.movies;

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

    public Page<Movie> getAllMovies(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "voteAverage"));
        return movieRepository.findAll(pageable);
    }

    public Page<MovieProjection> getAllMoviesByFields(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "voteAverage"));
        return movieRepository.findAllProjectedBy(pageable);
    }

    public Movie getMovieById(String movieId) {
        return movieRepository.findById(movieId).orElse(null);
    }
}
