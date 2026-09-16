import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    default: () => 'SAG-ST-' + Math.floor(100000 + Math.random() * 900000)
  },
  userId: { type: String, default: '' },
  userEmail: { type: String, default: '' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  gstAmount: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  paymentMode: { type: String, default: 'upi' },
  deliveryTimeSlot: { type: String, default: 'ASAP (Next 1-2 Hours)' },
  notes: { type: String, default: '' },
  gstin: { type: String, default: '33CAHPP5553L1ZB' },
  branch: { type: String, default: 'Suvarna Traders' },
  status: { 
    type: String, 
    default: 'Pending', 
    enum: ['Pending', 'Confirmed', 'Out for Delivery', 'Delayed', 'Delivered', 'Cancelled'] 
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
