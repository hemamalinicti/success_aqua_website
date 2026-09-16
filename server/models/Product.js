import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, default: 'Purified Water' },
  price: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  gstNote: { type: String, default: '+ 18% GST' },
  subscriptionPrice: { type: String, default: '' },
  specs: [
    {
      label: { type: String },
      val: { type: String }
    }
  ],
  ideal: { type: String, default: 'Residences & Businesses' },
  image: { type: String, default: '/images/can-20l.png' },
  popular: { type: Boolean, default: false },
  inStock: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
