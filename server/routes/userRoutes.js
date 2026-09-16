import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = express.Router();

// Fallback memory store for cloud hosting when MongoDB daemon is not active
const memoryUsers = [];

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

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();

    let savedUserObj = null;

    // Check if MongoDB is connected and ready
    if (mongoose.connection.readyState === 1) {
      try {
        const existingUser = await User.findOne({ $or: [{ email: cleanEmail }, { phone: cleanPhone }] });
        if (existingUser) {
          return res.status(400).json({ 
            success: false, 
            message: 'An account with this Email or Phone number already exists. Please sign in.' 
          });
        }

        const newUser = new User({
          name,
          email: cleanEmail,
          phone: cleanPhone,
          password,
          address: address || '',
          pincode: pincode || '641045'
        });

        const saved = await newUser.save();
        savedUserObj = {
          id: saved._id,
          name: saved.name,
          email: saved.email,
          phone: saved.phone,
          address: saved.address,
          pincode: saved.pincode
        };
      } catch (dbErr) {
        console.warn('[MongoDB User Register Warning, falling back to memory store]:', dbErr.message);
      }
    }

    // Fallback if DB is not ready or DB error occurred
    if (!savedUserObj) {
      const existingInMemory = memoryUsers.find(u => u.email === cleanEmail || u.phone === cleanPhone);
      if (existingInMemory) {
        return res.status(400).json({
          success: false,
          message: 'An account with this Email or Phone number already exists. Please sign in.'
        });
      }

      const memUser = {
        id: 'usr_' + Date.now(),
        name,
        email: cleanEmail,
        phone: cleanPhone,
        password,
        address: address || '',
        pincode: pincode || '641045'
      };
      memoryUsers.push(memUser);

      savedUserObj = {
        id: memUser.id,
        name: memUser.name,
        email: memUser.email,
        phone: memUser.phone,
        address: memUser.address,
        pincode: memUser.pincode
      };
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! You can now place orders.',
      token: 'customer-token-' + savedUserObj.id + '-' + Date.now(),
      user: savedUserObj
    });
  } catch (error) {
    console.error('[User Register Error]:', error);
    return res.status(500).json({ success: false, message: error.message });
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
    let userObj = null;

    if (mongoose.connection.readyState === 1) {
      try {
        const dbUser = await User.findOne({
          $or: [{ email: input }, { phone: input }]
        });
        if (dbUser && dbUser.password === password) {
          userObj = {
            id: dbUser._id,
            name: dbUser.name,
            email: dbUser.email,
            phone: dbUser.phone,
            address: dbUser.address,
            pincode: dbUser.pincode
          };
        }
      } catch (dbErr) {
        console.warn('[MongoDB User Login Warning, checking memory store]:', dbErr.message);
      }
    }

    if (!userObj) {
      const memUser = memoryUsers.find(u => (u.email === input || u.phone === input) && u.password === password);
      if (memUser) {
        userObj = {
          id: memUser.id,
          name: memUser.name,
          email: memUser.email,
          phone: memUser.phone,
          address: memUser.address,
          pincode: memUser.pincode
        };
      }
    }

    if (!userObj) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid Email/Phone or Password.' 
      });
    }

    return res.json({
      success: true,
      message: 'Signed in successfully!',
      token: 'customer-token-' + userObj.id + '-' + Date.now(),
      user: userObj
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Get User Orders
router.get('/my-orders', async (req, res) => {
  try {
    const { phone, email, userId } = req.query;
    let dbOrders = [];

    if (mongoose.connection.readyState === 1) {
      try {
        const query = [];
        if (phone) query.push({ phone });
        if (email) query.push({ userEmail: email });
        if (userId) query.push({ userId });

        if (query.length > 0) {
          dbOrders = await Order.find({ $or: query }).sort({ createdAt: -1 });
        }
      } catch (e) {
        console.warn('[MongoDB My-Orders Warning]:', e.message);
      }
    }

    return res.json({
      success: true,
      count: dbOrders.length,
      data: dbOrders
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
