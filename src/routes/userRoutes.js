const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const { getAllUsers, getUserById, updateUser } = require('../controllers/user.controller')

router.get('/', auth, getAllUsers)
router.get('/me', auth, getUserById)
router.put('/me', auth, updateUser)
module.exports = router
