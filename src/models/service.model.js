const mongoose = require('mongoose')

const ServiceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Service', ServiceSchema)
