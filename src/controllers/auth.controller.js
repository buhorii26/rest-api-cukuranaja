const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { name, email, password } = req.body

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
      password
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, 'my_jwt_secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err
      res.json({
        status: 'success',
        message: 'User Created',
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

    jwt.sign(payload, 'my_jwt_secret', { expiresIn: 360000 }, (err, token) => {
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
