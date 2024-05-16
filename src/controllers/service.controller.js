const Service = require('../models/service.model')

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { barberId, serviceName, price } = req.body
    const service = new Service({ barberId, serviceName, price })
    await service.save()
    res.status(201).json(service.toJSON())
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find()
    res.json(services.map(service => service.toJSON()))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get a service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json(service.toJSON())
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a service by ID
exports.updateService = async (req, res) => {
  try {
    const { barberId, serviceName, price } = req.body
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    service.barberId = barberId || service.barberId
    service.serviceName = serviceName || service.serviceName
    service.price = price || service.price
    await service.save()
    res.json(service.toJSON())
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
