import mongoose from 'mongoose';

const eventBookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true,
    default: () => 'SAG-EVT-' + Math.floor(100000 + Math.random() * 900000)
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: String, required: true },
  guestCount: { type: Number, required: true },
  location: { type: String, required: true },
  neededItems: [{ type: String }],
  paymentMode: { type: String, default: 'upi' },
  subtotal: { type: Number, required: true },
  gstAmount: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  status: { type: String, default: 'Confirmed', enum: ['Pending', 'Confirmed', 'Dispatched', 'Completed', 'Cancelled'] }
}, {
  timestamps: true
});

export default mongoose.model('EventBooking', eventBookingSchema);
