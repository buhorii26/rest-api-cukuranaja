// membuat schema
const mongoose = require('mongoose')

const BarberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barberName: {
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
  },
  experience: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  }
})

BarberSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.barberId = _id
  return object
})
module.exports = mongoose.model('Barber', BarberSchema)
