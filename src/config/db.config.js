require('dotenv').config()

const CONFIG = {
  ATLAS: process.env.ATLAS,
  LOCAL: process.env.LOCAL,
  PORT: process.env.PORT
}

module.exports = { CONFIG }
module.CONFIG = CONFIG
