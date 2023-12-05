var router = require('express').Router()
var bookingController = require('../controllers/booking.controller')

router.get('/', bookingController.index)
router.post('/', bookingController.addNewBooking)
router.get('/inactive/:id', bookingController.markAsInactive)
router.post('/booked_seats', bookingController.getBookedSeats)
// router.get('/:id', bookingController.getBookingFromId)
// router.delete('/:id', bookingController.deleteBooking)
// router.put('/:id', bookingController.updateBooking)

module.exports = router