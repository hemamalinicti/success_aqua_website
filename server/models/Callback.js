import mongoose from 'mongoose';

const callbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  preferredTime: { type: String, default: 'Within 15 Minutes' },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Contacted', 'Closed'] }
}, {
  timestamps: true
});

export default mongoose.model('Callback', callbackSchema);
