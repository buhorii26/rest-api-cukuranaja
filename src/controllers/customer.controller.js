const Customer = require('../models/customer.model')

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { customerName, gender, address, city, province, phone } = req.body
    // Cek duplikat berdasarkan customerName
    const existingCustomerByName = await Customer.findOne({ customerName })
    if (existingCustomerByName) {
      return res.status(400).json({ error: 'Customer Name already exists' })
    }

    const customer = new Customer({ customerName, gender, address, city, province, phone })
    await customer.save()
    res.status(201).json({
      status: 'success',
      message: 'Create New Customer Success',
      data: {
        customer
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json({
      status: 'success',
      message: 'all customers retrieved',
      data: {
        customers
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const detailCustomer = await Customer.findById(req.params.id)
    res.json({
      status: 'success',
      message: 'customer by id retrieved',
      data: {
        detailCustomer
      }
    })
    if (!detailCustomer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const { gender, address, city, province, phone } = req.body
    const customer = await Customer.findById(req.params.id).populate('user')
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    customer.gender = gender || customer.gender
    customer.address = address || customer.address
    customer.city = city || customer.city
    customer.province = province || customer.province
    customer.phone = phone || customer.phone
    await customer.save()
    res.json({
      status: 'success',
      message: 'customer updated success',
      data: {
        customer
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id).populate('user')
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.json({
      status: 'success',
      message: 'Customer deleted'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
