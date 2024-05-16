// membuat schema
module.exports = (mongoose) => {
  const customerSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
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
    noHp: {
      type: String,
      required: true
    }
  })
  customerSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.customerId = _id
    return object
  })
  const Customer = mongoose.model('customers', customerSchema)

  return Customer
}
