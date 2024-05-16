const Customer = require('../models/customer.model')

// Create a new customer
exports.createCustomer = async (req, res) => {
  try {
    const { userId, customerName, gender, address, city, province, phone } = req.body
    const customer = new Customer({ userId, customerName, gender, address, city, province, phone })
    await customer.save()
    res.status(201).json(customer.toJSON())
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers.map(customer => customer.toJSON()))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Get a customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.json(customer.toJSON())
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  try {
    const { userId, customerName, gender, address, city, province, phone } = req.body
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    customer.userId = userId || customer.userId
    customer.customerName = customerName || customer.customerName
    customer.gender = gender || customer.gender
    customer.address = address || customer.address
    customer.city = city || customer.city
    customer.province = province || customer.province
    customer.phone = phone || customer.phone
    await customer.save()
    res.json(customer.toJSON())
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' })
    }
    res.json({ msg: 'Customer deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
}
