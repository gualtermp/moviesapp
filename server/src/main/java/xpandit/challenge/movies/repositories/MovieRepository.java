package xpandit.challenge.movies.repositories;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import xpandit.challenge.movies.entities.Movie;
import xpandit.challenge.movies.interfaces.MovieProjection;

public interface MovieRepository extends MongoRepository<Movie, Object> {

    Page<MovieProjection> findAllProjectedBy(Pageable pageable);

    @Query("[{ $sort: { revenue: -1 } }, { $limit: 10 }]")
    Page<MovieProjection> findTop10MoviesByRevenue(Pageable pageable);
    @Query("{ release_date: { '$gte': ?1, '$lt': ?2 } }")
    Page<MovieProjection> findTop10MoviesByRevenueForYear(@Param("year") int year, Date startDate, Date endDate, Pageable pageable);
}
