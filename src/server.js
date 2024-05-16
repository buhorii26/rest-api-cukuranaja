const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const { CONFIG } = require('./config/db.config')

// connect to database
require('./utils/connectDB')

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
// parse body request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/bookings', require('./routes/bookingRoutes'))
app.use('/api/customers', require('./routes/customerRoutes'))
app.use('/api/barbers', require('./routes/barberRoutes'))
app.use('/api/services', require('./routes/serviceRoutes'))

// port
const port = CONFIG.PORT
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
