var router = require('express').Router()
var movieController = require('../controllers/movie.controller')

router.get('/', movieController.index)
router.get('/active/lists', movieController.activeMovies)
router.post('/', movieController.addNewMovie)
router.get('/:id', movieController.getMovieFromId)
router.delete('/:id', movieController.deleteMovie)
router.put('/:id', movieController.updateMovie)
router.get('/search/:title', movieController.searchMovieFromTitle)

module.exports = router