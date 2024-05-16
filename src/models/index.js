const { CONFIG } = require('../config/db.config')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.URL = CONFIG.URL

db.User = require('./user.model')(mongoose)
db.barbers = require('./barber.model')(mongoose)
db.customers = require('./customer.model')(mongoose)
db.bookings = require('./booking.model')(mongoose)
db.services = require('./service.model')(mongoose)

module.exports = db
