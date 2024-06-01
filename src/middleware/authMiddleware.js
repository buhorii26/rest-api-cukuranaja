const jwt = require('jsonwebtoken')
const jwtSecret = 'my_jwt_secret'

function authMiddleware (req, res, next) {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], jwtSecret)
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' })
  }
}

module.exports = authMiddleware
