// membuat schema
const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    barber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    service: {
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
    place: {
      type: String,
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
