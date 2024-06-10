const mongoose = require('mongoose')
const Booking = require('../models/booking.model')
const Customer = require('../models/customer.model')
const Barber = require('../models/barber.model')
const Service = require('../models/service.model')

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { customerId, barberId, serviceId, date, time, place, status } = req.body

    // Validasi ID yang diberikan
    if (!mongoose.Types.ObjectId.isValid(customerId) ||
        !mongoose.Types.ObjectId.isValid(barberId) ||
        !mongoose.Types.ObjectId.isValid(serviceId)) {
      return res.status(400).json({ error: 'Invalid ID provided' })
    }

    // Cari dan validasi customer
    const customer = await Customer.findById(customerId)
    if (!customer) {
      return res.status(400).json({ error: 'Invalid customer ID' })
    }

    // Cari dan validasi barber
    const barber = await Barber.findById(barberId)
    if (!barber) {
      return res.status(400).json({ error: 'Invalid barber ID' })
    }

    // Cari dan validasi service
    const service = await Service.findById(serviceId)
    if (!service) {
      return res.status(400).json({ error: 'Invalid service ID' })
    }

    const newBooking = new Booking({
      customer: customerId,
      barber: barberId,
      service: serviceId,
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
