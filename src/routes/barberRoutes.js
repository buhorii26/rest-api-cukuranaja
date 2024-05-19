const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  createBarber,
  getBarbers,
  getBarberById,
  updateBarber,
  deleteBarber
} = require('../controllers/barber.controller')

router.post('/', auth, createBarber)
router.get('/', auth, getBarbers)
router.get('/:id', auth, getBarberById)
router.put('/:id', auth, updateBarber)
router.delete('/:id', auth, deleteBarber)

module.exports = router
