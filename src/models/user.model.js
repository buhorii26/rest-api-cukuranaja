const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'barber'],
    required: true
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /@*\.com$/.test(v)
      },
      message: props => `${props.value} email tidak valid! Email harus ber extension @example.com, @gmail.com`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password harus 8 karakter']
  }
})

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})
module.exports = mongoose.model('User', UserSchema)
