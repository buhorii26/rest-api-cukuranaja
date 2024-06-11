const Barber = require('../models/barber.model')

// Create a new barber
exports.createBarber = async (req, res) => {
  try {
    const { barberName, gender, address, city, province, phone, experience, skills } = req.body
    // Cek duplikat berdasarkan barberName
    const existingBarberByName = await Barber.findOne({ barberName })
    if (existingBarberByName) {
      return res.status(400).json({ error: 'Barber Name already exists' })
    }
    const barber = new Barber({ barberName, gender, address, city, province, phone, experience, skills })
    await barber.save()
    res.status(201).json({
      status: 'success',
      message: 'Create New Barber Success',
      data: {
        barber
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get all barbers
exports.getBarbers = async (req, res) => {
  try {
    const barbers = await Barber.find()
    res.json({
      status: 'success',
      message: 'all barbers retrieved',
      data: {
        barbers
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get a barber by ID
exports.getBarberById = async (req, res) => {
  try {
    const detailBarber = await Barber.findById(req.params.id)
    res.json({
      status: 'success',
      message: 'barber by ID retrieved',
      data: {
        detailBarber
      }
    })
    if (!detailBarber) {
      return res.status(404).json({ error: 'Barber not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a barber by ID
exports.updateBarber = async (req, res) => {
  try {
    const { gender, address, city, province, phone, experience, skills } = req.body
    const barber = await Barber.findById(req.params.id).populate('user')
    if (!barber) {
      return res.status(404).json({ error: 'Barber not found' })
    }
    barber.gender = gender || barber.gender
    barber.address = address || barber.address
    barber.city = city || barber.city
    barber.province = province || barber.province
    barber.phone = phone || barber.phone
    barber.experience = experience || barber.experience
    barber.skills = skills || barber.skills
    await barber.save()
    res.json({
      status: 'success',
      message: 'barber updated success',
      data: {
        barber
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Delete a barber by ID
exports.deleteBarber = async (req, res) => {
  try {
    const barber = await Barber.findByIdAndDelete(req.params.id).populate('user')
    if (!barber) {
      return res.status(404).json({ error: 'Barber not found' })
    }
    res.json({
      status: 'success',
      message: 'Barber deleted'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
