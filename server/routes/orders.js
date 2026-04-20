const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { customerName, email, address, items, totalItems, totalAmount } = req.body;

    if (!customerName || !email || !address) {
      return res.status(400).json({ message: 'customerName, email and address are required' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    const order = await Order.create({
      customerName,
      email,
      address,
      items,
      totalItems,
      totalAmount
    });

    return res.status(201).json({
      message: 'Order saved successfully',
      orderId: order._id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Failed to save order' });
  }
});

module.exports = router;
