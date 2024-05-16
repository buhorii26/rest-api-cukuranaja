const express = require('express')
const router = express.Router()
const {
  createBarber,
  getBarbers,
  getBarberById,
  updateBarber,
  deleteBarber
} = require('../controllers/barber.controller')

router.post('/', createBarber)
router.get('/', getBarbers)
router.get('/:id', getBarberById)
router.put('/:id', updateBarber)
router.delete('/:id', deleteBarber)

module.exports = router
