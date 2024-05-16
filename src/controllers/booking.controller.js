const Booking = require('../models/booking.model')

// create booking
exports.createBooking = async (req, res) => {
  try {
    const { customerId, barberId, serviceId, date, time, price, status } = req.body
    const newBooking = new Booking({
      customerId,
      barberId,
      serviceId,
      date,
      time,
      price,
      status
    })

    await newBooking.save()
    res.status(201).json(newBooking.toJSON())
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
}

// Get all booking
exports.getBookings = async (req, res) => {
  try {
    const booking = await Booking.find()
    res.json(booking.map(booking => booking.toJSON()))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get a booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    res.json(booking.toJSON())
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a booking by ID
exports.updateBooking = async (req, res) => {
  try {
    const { customerId, barberId, serviceId, date, time, price, status } = req.body
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    booking.customerId = customerId || booking.customerId
    booking.barberId = barberId || booking.barberId
    booking.serviceId = serviceId || booking.serviceId
    booking.date = date || booking.date
    booking.time = time || booking.time
    booking.price = price || booking.price
    booking.status = status || booking.status
    await booking.save()
    res.json(booking.toJSON())
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Delete a service by ID
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    res.json({ msg: 'Booking success deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
