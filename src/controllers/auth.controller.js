const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = 'my_jwt_secret'

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body
  // Generate avatar URL
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`

  // Custom email validation
  if (!/@*\.com$/.test(email)) {
    return res.status(400).json({ message: 'Email must end with @example.com' })
  }
  // Custom password validation
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'Password must be at least 8 characters long' })
  }

  // Validasi role
  if (!['customer', 'barber'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role specified' })
  }

  if (!name || !role || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' })
  }

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ message: 'User already exists' })
    }

    user = new User({
      name,
      role,
      email,
      password,
      avatar: avatarUrl
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err) => {
      if (err) throw err
      res.json({
        status: 'success',
        message: 'User created successfully',
        data: {
          user
        }
      })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    // Custom email validation
    if (!/@*\.com$/.test(email)) {
      return res.status(400).json({ message: 'Email not valid!' })
    }

    if (!user) {
      return res.status(400).json({ message: 'Email not found!' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err
      res.json({
        status: 'success',
        message: 'user logged in',
        data: {
          token
        }
      })
    })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}
