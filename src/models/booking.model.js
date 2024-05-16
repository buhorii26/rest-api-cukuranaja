// membuat schema
module.exports = (mongoose) => {
  const bookingSchema =
    mongoose.Schema(
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
        service_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
          required: true
        },
        date: {
          type: Date,
          required: true
        },
        time: {
          type: String,
          required: true
        },
        totalPrice: {
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
  bookingSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.bookingId = _id
    return object
  })

  const Booking = mongoose.model('bookings', bookingSchema)
  return Booking
}
