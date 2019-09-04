let {
    get_movies, 
    get_in_cinemas, 
    get_coming_soon,
    search_movies,
    rate_movie,
    get_movie_info
} = require('./controllers/movie-controller');

const router = require('express').Router();
/**
 * responds with a list of 20 movies
 * expected query parameters:
 *      start: 
 *      sort_by: (ex: rating, date_released (new))
 */
router.get('/', get_movies);

/**
 * responds with a list of movies that are currently being shown in cinemas
 * the movies will be sorted based on the rating they received
 */
router.get('/in_cinemas', get_in_cinemas);

/**
 * responds with a list of movies that are currently advertizing
 */
router.get('/coming_soon', get_coming_soon);

/**
 * responds with a list of movies matching the name of the movie provided
 * expected query parameters:
 *      title: movie title
 */
router.get('/search', search_movies);

/**
 * updates a movies rating and returns the new rating
 */
router.put('/:id/rate', rate_movie);

/**
 * responds with the information of a particular movie with the given id
 */
router.get('/:id', get_movie_info);


module.exports = router;

