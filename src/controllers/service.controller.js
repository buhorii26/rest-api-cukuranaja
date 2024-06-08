const Service = require('../models/service.model')

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { serviceName, price } = req.body
    const service = new Service({ serviceName, price })
    await service.save()
    res.status(201).json({
      status: 'success',
      message: 'Create New Service Success',
      data: {
        service
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find()
    res.json({
      status: 'success',
      message: 'ok',
      data: {
        services
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const detailService = await Service.findById(req.params.id)
    res.json({
      status: 'success',
      message: 'barber by ID retrieved',
      data: {
        detailService
      }
    })
    if (!detailService) {
      return res.status(404).json({ error: 'Service not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const { serviceName, price } = req.body
    const detailService = await Service.findById(req.params.id)
    if (!detailService) {
      return res.status(404).json({ error: 'Service not found' })
    }
    detailService.serviceName = serviceName || detailService.serviceName
    detailService.price = price || detailService.price
    await detailService.save()
    res.json({
      status: 'success',
      message: 'service updated success',
      data: {
        detailService
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Delete a service by ID
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id)
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json({ msg: 'Service deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
