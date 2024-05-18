const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking
} = require('../controllers/booking.controller')

router.post('/', auth, createBooking)
router.get('/', auth, getBookings)
router.get('/:id', auth, getBookingById)
router.put('/:id', auth, updateBooking)
router.delete('/:id', auth, deleteBooking)

module.exports = router
