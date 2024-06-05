const Booking = require('../models/booking.model')
const Customer = require('../models/customer.model')
const Barber = require('../models/barber.model')
const Service = require('../models/service.model')

// create booking
exports.createBooking = async (req, res) => {
  try {
    const { customerId, barberId, serviceId, date, time, place, price, status } = req.body
    // Validate customer, barber, and service exist
    const foundCustomer = await Customer.findById(customerId)
    const foundBarber = await Barber.findById(barberId)
    const foundService = await Service.findById(serviceId)

    if (!foundCustomer) {
      return res.status(400).json({ msg: 'Invalid customer ID, not found!' })
    }
    if (!foundBarber) {
      return res.status(400).json({ msg: 'Invalid barber ID, not found!' })
    }
    if (!foundService) {
      return res.status(400).json({ msg: 'Invalid service ID, not found' })
    }
    const newBooking = new Booking({
      customerId,
      barberId,
      serviceId,
      date,
      time,
      place,
      price,
      status
    })

    await newBooking.save()
    res.status(201).json({
      status: 'success',
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

// Get all booking
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('customer').populate('barber').populate('service')
    res.json({
      success: true,
      message: 'all bookings retrieved',
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
    const booking = await Booking.findById(req.params.id).populate('customer').populate('barber').populate('service')
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    res.json({
      status: 'success',
      message: 'Booking By id Success retrived',
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
    const { customer, barber, service, date, time, place, price, status } = req.body
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' })
    }
    booking.customer = customer || booking.customer
    booking.barber = barber || booking.barber
    booking.service = service || booking.service
    booking.date = date || booking.date
    booking.time = time || booking.time
    booking.place = place || booking.place
    booking.price = price || booking.price
    booking.status = status || booking.status
    await booking.save()
    res.json({
      status: 'success',
      message: 'booking updated success',
      data: {
        booking
      }
    })
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
    res.json({
      status: 'success',
      message: 'Booking deleted'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
