let {
    create_cinema,
    create_movie
} = require('./controllers/super-admin-controller');

const router = require('express').Router();

/**
 * renders the super-admin login page
 */
router.get('/', (req, res) => { res.send('works'); });

/**
 * creates a cinema
 */
router.post('/create_cinema', create_cinema);

/**
 * creates a movie
 */
router.post('/create_movie', create_movie);

module.exports = router;