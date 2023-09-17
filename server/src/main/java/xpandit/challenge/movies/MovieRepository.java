package xpandit.challenge.movies;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface MovieRepository extends MongoRepository<Movie, Object> {

    Page<MovieProjection> findAllProjectedBy(Pageable pageable);

    @Query("[{ $sort: { revenue: -1 } }, { $limit: 10 }]")
    Page<MovieProjection> findTop10MoviesByRevenue(Pageable pageable);

    // Use a custom query to find the top 10 movies by revenue for the specified
    // year
    @Query(value = "{ 'releaseDate': { '$gte': ?0 }, 'releaseDate': { '$lt': ?1 } }")
    List<MovieProjection> findTop10MoviesByRevenueForYear(int year, Sort sort);
}
