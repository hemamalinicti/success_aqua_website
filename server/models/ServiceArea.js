import mongoose from 'mongoose';

const serviceAreaSchema = new mongoose.Schema({
  pincode: { type: String, required: true },
  areaName: { type: String, required: true },
  zone: { type: String, required: true },
  deliveryTime: { type: String, required: true },
  available: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('ServiceArea', serviceAreaSchema);
