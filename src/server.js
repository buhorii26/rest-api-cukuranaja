const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const { CONFIG } = require('./config/db.config')
const authRoutes = require('./routes/authRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const customerRoutes = require('./routes/customerRoutes')
const barberRoutes = require('./routes/barberRoutes')
const serviceRoutes = require('./routes/serviceRoutes')

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
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/barbers', barberRoutes)
app.use('/api/services', serviceRoutes)

// port
const port = CONFIG.PORT
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
