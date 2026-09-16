import express from 'express';
import ContactEnquiry from '../models/ContactEnquiry.js';

const router = express.Router();

// Submit contact form enquiry
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, enquiryType, subject, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and Phone number are required.' 
      });
    }

    const newEnquiry = new ContactEnquiry({
      name,
      phone,
      email: email || '',
      enquiryType: enquiryType || 'General Enquiry',
      subject: subject || '',
      message: message || ''
    });

    const savedEnquiry = await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      data: savedEnquiry
    });
  } catch (error) {
    console.error('[API Contact Error]:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while submitting contact enquiry.',
      error: error.message 
    });
  }
});

// Get all contact enquiries
router.get('/', async (req, res) => {
  try {
    const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
