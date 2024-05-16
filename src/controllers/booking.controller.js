const Booking = require('../models/booking.model')

exports.createBooking = async (req, res) => {
  const { customerId, barberId, serviceId, date, time, totalPrice, status } = req.body

  try {
    const newBooking = new Booking({
      user: req.user.id,
      customerId,
      barberId,
      serviceId,
      date,
      time,
      totalPrice,
      status
    })

    const booking = await newBooking.save()
    res.json(booking)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
