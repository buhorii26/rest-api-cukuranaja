const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true
  },
  description: {
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
