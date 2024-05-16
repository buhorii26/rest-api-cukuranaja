// membuat schema
module.exports = (mongoose) => {
  const barberSchema =
    mongoose.Schema(
      {
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
        noHp: {
          type: String,
          required: true
        },
        pengalaman: {
          type: String
        },
        skills: {
          type: String
        }
      }
    )
  barberSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.barberId = _id
    return object
  })

  const Barber = mongoose.model('barbers', barberSchema)

  return Barber
}
