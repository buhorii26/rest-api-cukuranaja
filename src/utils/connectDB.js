const db = require('../models/index')
const { CONFIG } = require('../config/db.config')
const mongoose = require('mongoose')

db.mongoose
  .connect(CONFIG.LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Succes Connected to database!')
  })
  .catch((error) => {
    console.error('Cannot connected to database!', error)
    process.exit()
  })

module.exports = mongoose
