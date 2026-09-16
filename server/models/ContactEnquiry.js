import mongoose from 'mongoose';

const contactEnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  enquiryType: { type: String, default: 'General Enquiry' },
  subject: { type: String, default: '' },
  message: { type: String, default: '' },
  status: { type: String, default: 'New', enum: ['New', 'In Progress', 'Resolved'] }
}, {
  timestamps: true
});

export default mongoose.model('ContactEnquiry', contactEnquirySchema);
