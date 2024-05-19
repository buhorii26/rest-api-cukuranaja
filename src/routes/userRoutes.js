const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const { getAllUsers, getUserById } = require('../controllers/user.controller')

router.get('/', getAllUsers)
router.get('/me', auth, getUserById)
module.exports = router
