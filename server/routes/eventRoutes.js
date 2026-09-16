import express from 'express';
import EventBooking from '../models/EventBooking.js';

const router = express.Router();

// Register mass event / function water booking
router.post('/', async (req, res) => {
  try {
    const { 
      name, phone, eventType, eventDate, guestCount, 
      location, neededItems, paymentMode, subtotal, gstAmount, grandTotal 
    } = req.body;

    if (!name || !phone || !eventDate || !location) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, Phone, Event Date, and Location are required.' 
      });
    }

    const bookingId = 'SAG-EVT-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking = new EventBooking({
      bookingId,
      name,
      phone,
      eventType: eventType || 'Marriage / Wedding Function',
      eventDate,
      guestCount: guestCount || 300,
      location,
      neededItems: neededItems || [],
      paymentMode: paymentMode || 'upi',
      subtotal: subtotal || 0,
      gstAmount: gstAmount || 0,
      grandTotal: grandTotal || 0
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Event booking registered successfully!',
      data: savedBooking
    });
  } catch (error) {
    console.error('[API Event Booking Error]:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while submitting event booking.',
      error: error.message 
    });
  }
});

// Get all event bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await EventBooking.find().sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
