import express from 'express';
import Callback from '../models/Callback.js';

const router = express.Router();

// Create quick callback request
router.post('/', async (req, res) => {
  try {
    const { name, phone, preferredTime } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and Phone number are required.' 
      });
    }

    const newCallback = new Callback({
      name,
      phone,
      preferredTime: preferredTime || 'Within 15 Minutes'
    });

    const savedCallback = await newCallback.save();

    res.status(201).json({
      success: true,
      message: 'Callback request registered successfully!',
      data: savedCallback
    });
  } catch (error) {
    console.error('[API Callback Error]:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while registering callback.',
      error: error.message 
    });
  }
});

// Get all callbacks
router.get('/', async (req, res) => {
  try {
    const callbacks = await Callback.find().sort({ createdAt: -1 });
    res.json({ success: true, count: callbacks.length, data: callbacks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
