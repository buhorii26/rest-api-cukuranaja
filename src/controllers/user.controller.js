const User = require('../models/user.model')
// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json({
      status: 'success',
      message: 'users retrieved',
      data: {
        users
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server Error' })
  }
}

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
        data: {
          user: null
        }
      })
    }
    res.json({
      status: 'success',
      message: 'users retrieved',
      data: {
        user
      }
    })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
