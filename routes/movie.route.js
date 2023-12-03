var router = require('express').Router()
var movieController = require('../controllers/movie.controller')

router.get('/', movieController.index)
router.post('/', movieController.addNewMovie)
router.get('/:id', movieController.getMovieFromId)
router.delete('/:id', movieController.deleteMovie)
router.put('/:id', movieController.updateMovie)

module.exports = router