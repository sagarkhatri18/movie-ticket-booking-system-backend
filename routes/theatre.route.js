var router = require('express').Router()
var theatreController = require('../controllers/theatre.controller')

router.get('/', theatreController.index)
router.get('/active/lists', theatreController.activeTheatres)
router.post('/', theatreController.addNewTheatre)
router.get('/:id', theatreController.getTheatreFromId)
router.delete('/:id', theatreController.deleteTheatre)
router.put('/:id', theatreController.updateTheatre)

module.exports = router