import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const { 
      userId, userEmail, name, phone, address, pincode, product, quantity, 
      unitPrice, subtotal, gstAmount, grandTotal, paymentMode, 
      deliveryTimeSlot, notes 
    } = req.body;

    if (!name || !phone || !address || !pincode) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, Phone, Address, and Pincode are required.' 
      });
    }

    const orderId = 'SAG-ST-' + Math.floor(100000 + Math.random() * 900000);
    const calculatedUnitPrice = unitPrice || 80;
    const qty = quantity || 1;
    const calcSubtotal = subtotal || (calculatedUnitPrice * qty);
    const calcGst = gstAmount || Math.round(calcSubtotal * 0.18 * 100) / 100;
    const calcGrandTotal = grandTotal || Math.round((calcSubtotal + calcGst) * 100) / 100;

    const newOrder = new Order({
      orderId,
      userId: userId || '',
      userEmail: userEmail || '',
      name,
      phone,
      address,
      pincode,
      product: product || '20 Litre Premium Water Can (Filled)',
      quantity: qty,
      unitPrice: calculatedUnitPrice,
      subtotal: calcSubtotal,
      gstAmount: calcGst,
      grandTotal: calcGrandTotal,
      paymentMode: paymentMode || 'upi',
      deliveryTimeSlot: deliveryTimeSlot || 'ASAP (Next 1-2 Hours)',
      notes: notes || '',
      gstin: '33CAHPP5553L1ZB',
      branch: 'Suvarna Traders'
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: savedOrder
    });
  } catch (error) {
    console.error('[API Order Error]:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while placing order.',
      error: error.message 
    });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
