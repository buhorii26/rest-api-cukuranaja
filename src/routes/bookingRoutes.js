const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const { createBooking } = require('../controllers/booking.controller')

router.post('/', auth, createBooking)

module.exports = router
