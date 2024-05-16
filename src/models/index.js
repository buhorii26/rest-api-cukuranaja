const { CONFIG } = require('../config/db.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.LOCAL = CONFIG.LOCAL

db.User = require('./user.model')(mongoose)
db.Barber = require('./barber.model')(mongoose)
db.Customer = require('./customer.model')(mongoose)
db.Booking = require('./booking.model')(mongoose)
db.Service = require('./service.model')(mongoose)

module.exports = db
