const express = require('express')
const router = express.Router()
const auth = require('../middleware/authMiddleware')
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/service.controller')

router.post('/', auth, createService)
router.get('/', getServices)
router.get('/:id', auth, getServiceById)
router.put('/:id', auth, updateService)
router.delete('/:id', auth, deleteService)

module.exports = router
