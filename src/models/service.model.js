const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
  barberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  serviceName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

ServiceSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.serviceId = _id
  return object
})
module.exports = mongoose.model('Service', ServiceSchema)
