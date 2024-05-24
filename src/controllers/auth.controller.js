const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = 'my_jwt_secret'
const axios = require('axios')

exports.register = async (req, res) => {
  const { name, email, password } = req.body
  // Generate avatar URL
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`

  // Custom email validation
  if (!/@*\.com$/.test(email)) {
    return res.status(400).json({ msg: 'Email must end with @example.com' })
  }
  // Custom password validation
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'Password must be at least 8 characters long' })
  }

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }

    user = new User({
      name,
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

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' })
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
