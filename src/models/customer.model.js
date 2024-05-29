// membuat schema
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
})

CustomerSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.customerId = _id
  return object
})
module.exports = mongoose.model('Customer', CustomerSchema)
