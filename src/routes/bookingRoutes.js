const express = require('express')
const router = express.Router()
// const auth = require('../middleware/authMiddleware')
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} = require('../controllers/booking.controller')

router.post('/', createBooking)
router.get('/', getBookings)
router.get('/:id', getBookingById)
router.put('/:id', updateBooking)
router.delete('/:id', deleteBooking)

module.exports = router
