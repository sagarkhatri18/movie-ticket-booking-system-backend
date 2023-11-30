var router = require('express').Router()
var theatreController = require('../controllers/theatre.controller')

router.get('/', theatreController.index)
router.post('/', theatreController.addNewTheatre)
router.get('/:slug', theatreController.getTheatreFromSlug)
router.delete('/:slug', theatreController.deleteTheatre)
router.put('/:id', theatreController.updateTheatre)

module.exports = router