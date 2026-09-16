import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, default: '' },
  pincode: { type: String, default: '641045' },
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
