module.exports = (mongoose) => {
  const serviceSchema =
    mongoose.Schema({
      barberId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      service_name: {
        type: String,
        required: true
      },
      total_price: {
        type: Number,
        required: true
      }
    })
  serviceSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.serviceId = _id
    return object
  })

  const Service = mongoose.model('services', serviceSchema)
  return Service
}
