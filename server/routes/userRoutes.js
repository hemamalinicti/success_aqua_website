import express from 'express';
import User from '../models/User.js';
import Order from '../models/Order.js';

const router = express.Router();

// Register Customer Account
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, address, pincode } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, Email, Phone number, and Password are required.' 
      });
    }

    const existingUser = await User.findOne({ $or: [{ email: email.toLowerCase() }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this Email or Phone number already exists. Please sign in.' 
      });
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      phone,
      password, // In production use bcrypt, storing securely
      address: address || '',
      pincode: pincode || '641045'
    });

    const savedUser = await newUser.save();

    const userObj = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      phone: savedUser.phone,
      address: savedUser.address,
      pincode: savedUser.pincode
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully! You can now place orders.',
      token: 'customer-token-' + savedUser._id + '-' + Date.now(),
      user: userObj
    });
  } catch (error) {
    console.error('[User Register Error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Login Customer Account
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide Email/Phone and Password.' 
      });
    }

    const input = String(emailOrPhone).trim().toLowerCase();
    const user = await User.findOne({
      $or: [{ email: input }, { phone: input }]
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Email/Phone or Password.' 
      });
    }

    const userObj = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      pincode: user.pincode
    };

    res.json({
      success: true,
      message: 'Signed in successfully!',
      token: 'customer-token-' + user._id + '-' + Date.now(),
      user: userObj
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get My Orders for logged in user
router.get('/my-orders', async (req, res) => {
  try {
    const { userId, phone, email } = req.query;

    let filter = {};
    if (userId) filter.userId = userId;
    else if (email) filter.userEmail = email.toLowerCase();
    else if (phone) filter.phone = phone;

    if (Object.keys(filter).length === 0) {
      return res.json({ success: true, count: 0, data: [] });
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
