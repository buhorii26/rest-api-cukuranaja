const Booking = require('../models/booking.model')

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { customer, barber, service, date, time, place, status } = req.body

    const newBooking = new Booking({
      customer,
      barber,
      service,
      date,
      time,
      place,
      status
    })

    await newBooking.save()
    res.status(201).json({
      success: true,
      message: 'Create New Booking Success',
      data: {
        newBooking
      }
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('customer barber service')
    res.json({
      status: 'success',
      message: 'All bookings retrieved',
      data: {
        bookings
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('customer barber service')
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    res.json({
      status: 'success',
      message: 'Booking retrieved by ID',
      data: {
        booking
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const { customer, barber, service, date, time, place, status } = req.body
    const booking = await Booking.findById(req.params.id).populate('customer barber service')
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }

    booking.customer = customer || booking.customer
    booking.barber = barber || booking.barber
    booking.service = service || booking.service
    booking.date = date || booking.date
    booking.time = time || booking.time
    booking.place = place || booking.place
    booking.status = status || booking.status

    await booking.save()
    res.json({
      status: 'success',
      message: 'Booking updated successfully',
      data: {
        booking
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Delete a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id).populate('customer barber service')
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    res.json({
      status: 'success',
      message: 'Booking deleted successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
