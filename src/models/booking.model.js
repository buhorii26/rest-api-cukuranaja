// membuat schema
const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    barberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Barber',
      required: true
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  { timestamp: true }
)
BookingSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.bookingId = _id
  return object
})
module.exports = mongoose.model('Booking', BookingSchema)
