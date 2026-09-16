import express from 'express';
import Order from '../models/Order.js';
import Callback from '../models/Callback.js';
import EventBooking from '../models/EventBooking.js';
import ContactEnquiry from '../models/ContactEnquiry.js';
import Product from '../models/Product.js';

const router = express.Router();

// Admin Authentication Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Default Admin Credentials: admin / admin123
  if ((username === 'admin' && password === 'admin123') || (username === 'admin' && password === 'admin')) {
    return res.json({
      success: true,
      token: 'admin-jwt-token-success-aqua-green-' + Date.now(),
      admin: {
        username: 'admin',
        name: 'Suvarna Traders Admin',
        role: 'SuperAdmin'
      }
    });
  }

  res.status(401).json({
    success: false,
    message: 'Invalid Admin Username or Password.'
  });
});

// Admin Stats & Overview Metrics
router.get('/stats', async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });
    const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });
    
    const ordersList = await Order.find();
    const totalRevenue = ordersList.reduce((acc, curr) => acc + (curr.grandTotal || 0), 0);

    const pendingCallbacks = await Callback.countDocuments({ status: 'Pending' });
    const totalEventBookings = await EventBooking.countDocuments();
    const totalEnquiries = await ContactEnquiry.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.json({
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        deliveredOrders,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        pendingCallbacks,
        totalEventBookings,
        totalEnquiries,
        totalProducts
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Order Status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, message: `Order status updated to ${status}`, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Order
router.delete('/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Callback Status
router.put('/callbacks/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Callback.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Callback not found' });
    res.json({ success: true, message: `Callback status updated to ${status}`, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Callback
router.delete('/callbacks/:id', async (req, res) => {
  try {
    await Callback.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Callback entry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update Event Booking Status
router.put('/events/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await EventBooking.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, message: `Booking status updated to ${status}`, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Event Booking
router.delete('/events/:id', async (req, res) => {
  try {
    await EventBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event booking deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete Contact Enquiry
router.delete('/contact/:id', async (req, res) => {
  try {
    await ContactEnquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
