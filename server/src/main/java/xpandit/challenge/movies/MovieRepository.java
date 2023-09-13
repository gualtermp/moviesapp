package xpandit.challenge.movies;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface MovieRepository extends MongoRepository<Movie, Object> {
    
    Page<MovieProjection> findAllProjectedBy(Pageable pageable);
}
