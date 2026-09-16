import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

const initialProducts = [
  // --- FILLED PACKAGED WATER PRODUCTS ---
  {
    productId: 'can-20l',
    name: '20 Litre Premium Water Can (Filled)',
    category: 'Purified Water Cans',
    price: '₹80',
    unitPrice: 80,
    gstNote: '+ 18% GST (₹94.40 Total)',
    subscriptionPrice: '₹1,999 / Month (30 Cans)',
    specs: [
      { label: 'Volume', val: '20 Litres (5.28 Gallons)' },
      { label: 'Purification', val: '7-Stage RO + UV + Ozone' },
      { label: 'TDS Level', val: '75 - 120 PPM (Ideal)' },
      { label: 'Container', val: 'Food-Grade Polycarbonate' },
      { label: 'Cap Seal', val: 'Tamper-Evident Heat Sealed' }
    ],
    ideal: 'Residences, Offices & Functions',
    image: '/images/can-20l.png',
    popular: true,
    inStock: true
  },
  {
    productId: 'can-5l',
    name: '5 Litre Handy Aqua Can (Filled)',
    category: 'Purified Water Cans',
    price: '₹45',
    unitPrice: 45,
    gstNote: '+ 18% GST (₹53.10 Total)',
    subscriptionPrice: '₹1,150 / Month (30 Cans)',
    specs: [
      { label: 'Volume', val: '5 Litres' },
      { label: 'Special Feature', val: 'Built-in Pouring Dispenser Tap' },
      { label: 'Purification', val: '7-Stage RO + UV + Ozone' },
      { label: 'Portability', val: 'Ergonomic Top Handle' },
      { label: 'Usage', val: 'Kitchen Counter & Travel' }
    ],
    ideal: 'PG Rooms, Travelers & Small Kitchens',
    image: '/images/can-5l.png',
    popular: false,
    inStock: true
  },
  {
    productId: 'bottle-2l',
    name: '2 Litre Packaged Bottle Box (6 Pcs)',
    category: 'Packaged Water Bottles',
    price: '₹180',
    unitPrice: 180,
    gstNote: '+ 18% GST (₹212.40 Total)',
    subscriptionPrice: '₹30 / Bottle (Box of 6)',
    specs: [
      { label: 'Pack Size', val: '6 Bottles x 2.0 Litres' },
      { label: 'Packaging', val: 'Sealed Heavy Corrugated Box' },
      { label: 'Bottle Quality', val: '100% Recyclable Virgin PET' },
      { label: 'Shelf Life', val: '6 Months' }
    ],
    ideal: 'Travel, Dining Tables & Family Outings',
    image: '/images/can-2l.png',
    popular: false,
    inStock: true
  },
  {
    productId: 'bottle-1l',
    name: '1 Litre Packaged Bottle Carton (12 Pcs)',
    category: 'Packaged Water Bottles',
    price: '₹240',
    unitPrice: 240,
    gstNote: '+ 18% GST (₹283.20 Total)',
    subscriptionPrice: '₹20 / Bottle (Box of 12)',
    specs: [
      { label: 'Pack Size', val: '12 Bottles x 1.0 Litre' },
      { label: 'Packaging', val: 'Sealed Corrugated Carton' },
      { label: 'Certification', val: 'ISI Marked & FSSAI Approved' }
    ],
    ideal: 'Conferences, Marriages & Functions',
    image: '/images/can-20l.png',
    popular: true,
    inStock: true
  },
  {
    productId: 'bottle-500ml',
    name: '500 ml Handy Bottle Carton (24 Pcs)',
    category: 'Packaged Water Bottles',
    price: '₹280',
    unitPrice: 280,
    gstNote: '+ 18% GST (₹330.40 Total)',
    subscriptionPrice: '₹11.60 / Bottle (Box of 24)',
    specs: [
      { label: 'Pack Size', val: '24 Bottles x 500 ml' },
      { label: 'Packaging', val: 'Compact Travel Carton' },
      { label: 'Portability', val: 'Easy Handheld Size' }
    ],
    ideal: 'VIP Guests, Meeting Rooms & Vehicle Travel',
    image: '/images/bottle-500ml.png',
    popular: true,
    inStock: true
  },
  {
    productId: 'bottle-300ml',
    name: '300 ml Mini Function Bottle Carton (24 Pcs)',
    category: 'Packaged Water Bottles',
    price: '₹240',
    unitPrice: 240,
    gstNote: '+ 18% GST (₹283.20 Total)',
    subscriptionPrice: '₹10 / Bottle (Box of 24)',
    specs: [
      { label: 'Pack Size', val: '24 Bottles x 300 ml' },
      { label: 'Feature', val: 'Zero-Waste Mini Serving Size' },
      { label: 'Usage', val: 'Marriage Reception Halls & Lunches' }
    ],
    ideal: 'Wedding Receptions, Catering & Dinners',
    image: '/images/bottle-300ml.png',
    popular: true,
    inStock: true
  },

  // --- EMPTY MANUFACTURING CANS & BOTTLES ---
  {
    productId: 'empty-can-20l',
    name: 'Heavy Duty 20L Polycarbonate Can (Empty)',
    category: 'Empty Can Manufacturing',
    price: '₹180',
    unitPrice: 180,
    gstNote: '+ 18% GST (₹212.40 Total)',
    subscriptionPrice: 'Bulk Tier: ₹160 (>100 Pcs)',
    specs: [
      { label: 'Capacity', val: '20 Litres Standard' },
      { label: 'Material', val: '100% Virgin Food-Grade Polycarbonate' },
      { label: 'Weight', val: '750g - 800g Reinforced' },
      { label: 'Neck Fit', val: 'Standard 55mm Press Neck' }
    ],
    ideal: 'Water Plants, Distributors & Bulk Retailers',
    image: '/images/can-20l.png',
    popular: true,
    inStock: true
  },
  {
    productId: 'empty-can-5l',
    name: '5L PET Handy Can with Dispenser Cap (Empty)',
    category: 'Empty Can Manufacturing',
    price: '₹65',
    unitPrice: 65,
    gstNote: '+ 18% GST (₹76.70 Total)',
    subscriptionPrice: 'Bulk Tier: ₹55 (>200 Pcs)',
    specs: [
      { label: 'Capacity', val: '5 Litres' },
      { label: 'Material', val: 'BPA-Free Clear PET' },
      { label: 'Accessories', val: 'Includes Sturdy Handle & Tap Cap' }
    ],
    ideal: 'Packaging Units & Retail Outlets',
    image: '/images/can-5l.png',
    popular: false,
    inStock: true
  },
  {
    productId: 'empty-bottle-1l',
    name: '1 Litre PET Empty Water Bottle Carton (12 Pcs)',
    category: 'Empty Bottle Manufacturing',
    price: '₹120',
    unitPrice: 120,
    gstNote: '+ 18% GST (₹141.60 Total)',
    subscriptionPrice: 'Bulk Tier: ₹9 / pc (>500 Pcs)',
    specs: [
      { label: 'Capacity', val: '1.0 Litre' },
      { label: 'Pack Size', val: '12 Empty PET Bottles Box' },
      { label: 'Material', val: '100% Virgin Food-Grade PET' }
    ],
    ideal: 'Bottling Plants, Water Suppliers & B2B Retailers',
    image: '/images/can-20l.png',
    popular: true,
    inStock: true
  },
  {
    productId: 'empty-bottle-500ml',
    name: '500 ml PET Empty Water Bottle Carton (24 Pcs)',
    category: 'Empty Bottle Manufacturing',
    price: '₹144',
    unitPrice: 144,
    gstNote: '+ 18% GST (₹169.92 Total)',
    subscriptionPrice: 'Bulk Tier: ₹5 / pc (>1000 Pcs)',
    specs: [
      { label: 'Capacity', val: '500 ml' },
      { label: 'Pack Size', val: '24 Empty PET Bottles Box' },
      { label: 'Material', val: '100% Virgin Food-Grade PET' }
    ],
    ideal: 'Custom Brand Bottling & Event Suppliers',
    image: '/images/bottle-500ml.png',
    popular: false,
    inStock: true
  },

  // --- ACCESSORIES & FITTINGS ---
  {
    productId: 'can-tap-dispenser',
    name: 'High-Flow Water Can Dispenser Tap',
    category: 'Accessories & Fittings',
    price: '₹25',
    unitPrice: 25,
    gstNote: '+ 18% GST (₹29.50 Total)',
    subscriptionPrice: 'Bulk Tier: ₹18 (>100 Pcs)',
    specs: [
      { label: 'Compatibility', val: 'Fits 5L & 20L Water Cans' },
      { label: 'Material', val: '100% Food-Grade Virgin PP' },
      { label: 'Seal', val: 'Leakproof Silicone Gasket' }
    ],
    ideal: 'Residences, Offices & Water Can Units',
    image: '/images/can-tap-dispenser.png',
    popular: true,
    inStock: true
  },
  {
    productId: 'can-lifting-gripper',
    name: 'Heavy-Duty 20L Water Can Lifting Gripper Handle',
    category: 'Accessories & Fittings',
    price: '₹40',
    unitPrice: 40,
    gstNote: '+ 18% GST (₹47.20 Total)',
    subscriptionPrice: 'Bulk Tier: ₹30 (>100 Pcs)',
    specs: [
      { label: 'Purpose', val: 'Easy 20L Can Lifting & Carrying' },
      { label: 'Material', val: 'Reinforced Heavy Duty ABS Plastic' },
      { label: 'Load Rating', val: 'Tested Up to 30 Kg Weight' }
    ],
    ideal: 'Delivery Staff, Homeowners & Offices',
    image: '/images/can-lifting-gripper.png',
    popular: true,
    inStock: true
  }
];

// Get all products (with auto-seeding/reset if missing items)
router.get('/', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count < initialProducts.length) {
      // Upsert all initial products to guarantee all 12 products exist in database
      for (const p of initialProducts) {
        await Product.findOneAndUpdate(
          { productId: p.productId },
          { $setOnInsert: p },
          { upsert: true, new: true }
        );
      }
    }
    const products = await Product.find().sort({ createdAt: 1 });
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error('[API Products Error]:', error);
    res.json({ success: true, count: initialProducts.length, data: initialProducts, fallback: true });
  }
});

// Create new product (Admin)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, unitPrice, gstNote, subscriptionPrice, specs, ideal, image, popular, inStock } = req.body;
    
    if (!name || unitPrice === undefined) {
      return res.status(400).json({ success: false, message: 'Product name and unit price are required.' });
    }

    const productId = 'prod-' + Date.now();
    const formattedPrice = typeof price === 'string' && price.startsWith('₹') ? price : `₹${unitPrice}`;

    const newProd = new Product({
      productId,
      name,
      category: category || 'Purified Water Cans',
      price: formattedPrice,
      unitPrice: Number(unitPrice),
      gstNote: gstNote || `+ 18% GST (₹${(Number(unitPrice) * 1.18).toFixed(2)} Total)`,
      subscriptionPrice: subscriptionPrice || '',
      specs: specs || [],
      ideal: ideal || 'Residences & Businesses',
      image: image || '/images/can-20l.png',
      popular: Boolean(popular),
      inStock: inStock !== undefined ? Boolean(inStock) : true
    });

    const saved = await newProd.save();
    res.status(201).json({ success: true, message: 'Product created successfully', data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update product (Admin)
router.put('/:id', async (req, res) => {
  try {
    const { name, category, price, unitPrice, gstNote, subscriptionPrice, specs, ideal, image, popular, inStock } = req.body;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (unitPrice !== undefined) {
      updateData.unitPrice = Number(unitPrice);
      updateData.price = `₹${unitPrice}`;
      if (!gstNote) {
        updateData.gstNote = `+ 18% GST (₹${(Number(unitPrice) * 1.18).toFixed(2)} Total)`;
      }
    }
    if (price !== undefined) updateData.price = price;
    if (gstNote !== undefined) updateData.gstNote = gstNote;
    if (subscriptionPrice !== undefined) updateData.subscriptionPrice = subscriptionPrice;
    if (specs !== undefined) updateData.specs = specs;
    if (ideal !== undefined) updateData.ideal = ideal;
    if (image !== undefined) updateData.image = image;
    if (popular !== undefined) updateData.popular = Boolean(popular);
    if (inStock !== undefined) updateData.inStock = Boolean(inStock);

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete product (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
