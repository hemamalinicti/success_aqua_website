import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory data store for lead tracking & area search
const orders = [];
const enquiries = [];
const callbacks = [];
const eventBookings = [];

// Company Details (Suvarna Traders - Success Aqua Green)
const companyInfo = {
  name: 'SUCCESS AQUA GREEN',
  branch: 'Suvarna Traders',
  gstin: '33CAHPP5553L1ZB',
  address: 'No.37, Indira Nagar, Sungam By-Pass Road, Sungam, Coimbatore - 641045',
  phonePrimary: '99949 19151',
  phoneSecondary: '97903 70924',
  landline: '0422 4919151',
  email: 'sarveshenterprises2020@gmail.com'
};

// Coimbatore Delivery Service Areas
const serviceAreas = [
  { pincode: '641045', areaName: 'Sungam By-Pass Road / Indira Nagar (Branch Hub)', zone: 'Central-East Coimbatore', deliveryTime: '20 Mins', available: true },
  { pincode: '641018', areaName: 'Race Course / Thomas Park / Trichy Road', zone: 'Central Coimbatore', deliveryTime: '30 Mins', available: true },
  { pincode: '641045', areaName: 'Ramanathapuram / Trinity Church / Valankulam', zone: 'Central-East Coimbatore', deliveryTime: '30 Mins', available: true },
  { pincode: '641002', areaName: 'R.S. Puram / TVS Nagar / Brookefields', zone: 'West Coimbatore', deliveryTime: '45 Mins', available: true },
  { pincode: '641004', areaName: 'Peelamedu / Hopes College / PSG Tech', zone: 'East Coimbatore', deliveryTime: '45 Mins', available: true },
  { pincode: '641012', areaName: 'Gandhipuram / Cross Cut Road / 100 Feet Rd', zone: 'Central Coimbatore', deliveryTime: '35 Mins', available: true },
  { pincode: '641006', areaName: 'Ganapathy / Prozone Mall / Sathy Road', zone: 'North Coimbatore', deliveryTime: '45 Mins', available: true },
  { pincode: '641021', areaName: 'Kurichi SIDCO Industrial Estate / Eachanari', zone: 'South Coimbatore', deliveryTime: '45 Mins', available: true },
  { pincode: '641035', areaName: 'Saravanampatti / CHIL SEZ IT Park', zone: 'North-East IT Belt', deliveryTime: '50 Mins', available: true },
  { pincode: '641049', areaName: 'Kovaipudur / Kuniyamuthur / VLB Tech', zone: 'South-West Coimbatore', deliveryTime: '45 Mins', available: true },
];

// Product Catalog (Matching Business Card Sizes: 300ml, 500ml, 1L, 2L, 5L, 20L + Manufactured Empty Cans)
const products = [
  // FILLED WATER SIZES
  {
    id: 'can-20l',
    name: '20 Litre Premium Water Can (Filled)',
    type: 'filled',
    size: '20L',
    category: 'Purified Water',
    price: 80,
    gstRate: 0.18,
    idealFor: 'Residences, Offices & Functions',
    description: '7-Stage RO + UV + Ozone purified drinking water delivered in food-safe 20L cans with hygienic tamper seal.',
    popular: true,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'can-5l',
    name: '5 Litre Handy Aqua Can (Filled)',
    type: 'filled',
    size: '5L',
    category: 'Purified Water',
    price: 45,
    gstRate: 0.18,
    idealFor: 'Small Households, Travel & Kitchens',
    description: 'Portable 5L water container with built-in pouring dispenser tap.',
    popular: false,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'bottle-2l',
    name: '2 Litre Packaged Bottle Box (6 Pcs)',
    type: 'filled',
    size: '2L x 6',
    category: 'Purified Water',
    price: 180,
    gstRate: 0.18,
    idealFor: 'Travel, Dining & Family Packets',
    description: 'Sealed carton containing 6 individual 2-Litre purified water bottles.',
    popular: false,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'bottle-1l',
    name: '1 Litre Packaged Bottle Carton (12 Pcs)',
    type: 'filled',
    size: '1L x 12',
    category: 'Purified Water',
    price: 240,
    gstRate: 0.18,
    idealFor: 'Weddings, Conferences & Event Functions',
    description: 'Sealed box containing 12 individual 1-Litre purified water bottles.',
    popular: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'bottle-500ml',
    name: '500 ml Handy Bottle Carton (24 Pcs)',
    type: 'filled',
    size: '500ml x 24',
    category: 'Purified Water',
    price: 280,
    gstRate: 0.18,
    idealFor: 'Meeting Rooms, VIP Guests & Car Travel',
    description: 'Compact 500ml individual water bottles box of 24 pieces.',
    popular: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'bottle-300ml',
    name: '300 ml Mini Function Bottle Carton (24 Pcs)',
    type: 'filled',
    size: '300ml x 24',
    category: 'Purified Water',
    price: 240,
    gstRate: 0.18,
    idealFor: 'Wedding Receptions, Dinners & Marriage Halls',
    description: 'Mini 300ml compact drinking water bottles for zero-waste event serving.',
    popular: true,
    image: '/images/bottle-300ml.png'
  },

  // MANUFACTURED EMPTY CANS & BOTTLES
  {
    id: 'empty-can-20l',
    name: 'Heavy Duty 20L Polycarbonate Can (Empty)',
    type: 'empty_manufacturing',
    size: '20L Empty',
    category: 'Manufacturing',
    price: 180,
    gstRate: 0.18,
    idealFor: 'Water Plants, Distributors & Bulk Buyers',
    description: 'Factory direct manufactured heavy-duty food-grade Polycarbonate (PC) 20L empty water container.',
    popular: true,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'empty-can-5l',
    name: '5L PET Handy Can with Dispenser Cap (Empty)',
    type: 'empty_manufacturing',
    size: '5L Empty',
    category: 'Manufacturing',
    price: 65,
    gstRate: 0.18,
    idealFor: 'Packaging Units & Retailers',
    description: 'Empty 5 Litre PET blow-molded container with tap cap.',
    popular: false,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'can-tap-dispenser',
    name: 'High-Flow Water Can Dispenser Tap',
    type: 'empty_manufacturing',
    size: 'Standard Tap Fit',
    category: 'Accessories & Fittings',
    price: 25,
    gstRate: 0.18,
    idealFor: 'Residences, Offices & Water Can Units',
    description: 'High-flow food-grade dispenser tap with silicone leakproof gasket for 5L & 20L water cans.',
    popular: true,
    image: '/images/can-tap-dispenser.png'
  },
  {
    id: 'can-lifting-gripper',
    name: 'Heavy-Duty 20L Water Can Lifting Gripper Handle',
    type: 'empty_manufacturing',
    size: '20L Can Gripper',
    category: 'Lifting Accessories',
    price: 40,
    gstRate: 0.18,
    idealFor: 'Delivery Staff, Homeowners & Offices',
    description: 'Ergonomic anti-slip lifting handle/gripper designed to easily lift and carry heavy 20L water cans.',
    popular: true,
    image: '/images/can-lifting-gripper.png'
  }
];

// GET Company Info
app.get('/api/company', (req, res) => {
  res.json({ success: true, data: companyInfo });
});

// GET Products
app.get('/api/products', (req, res) => {
  res.json({ success: true, data: products });
});

// GET Service Areas
app.get('/api/service-areas', (req, res) => {
  const query = (req.query.query || '').trim().toLowerCase();
  if (!query) {
    return res.json({ success: true, data: serviceAreas });
  }
  const filtered = serviceAreas.filter(a => 
    a.pincode.includes(query) || 
    a.areaName.toLowerCase().includes(query) ||
    a.zone.toLowerCase().includes(query)
  );
  res.json({ success: true, data: filtered });
});

// POST Orders (With Official GSTIN & Invoice Details)
app.post('/api/orders', (req, res) => {
  const { 
    name, phone, address, pincode, product, unitPrice, quantity, 
    paymentMode, deliveryTimeSlot 
  } = req.body;

  if (!name || !phone || !address || !pincode || !product) {
    return res.status(400).json({ success: false, message: 'Please fill in Name, Phone, Address, Pincode, and Product.' });
  }

  const qty = parseInt(quantity) || 1;
  const price = parseFloat(unitPrice) || 80;
  const subtotal = Math.round(price * qty * 100) / 100;
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  const cgst = Math.round(gstAmount / 2 * 100) / 100;
  const sgst = Math.round(gstAmount / 2 * 100) / 100;
  const grandTotal = Math.round((subtotal + gstAmount) * 100) / 100;

  const orderId = 'SAG-ST-' + Math.floor(100000 + Math.random() * 900000);
  const paymentStatus = (paymentMode === 'cod') ? 'Pending (Pay Cash on Delivery)' : 'Paid Online';

  const newOrder = {
    orderId,
    name,
    phone,
    address,
    pincode,
    city: 'Coimbatore',
    gstin: companyInfo.gstin,
    branch: companyInfo.branch,
    product,
    unitPrice: price,
    quantity: qty,
    subtotal,
    cgst,
    sgst,
    gstAmount,
    grandTotal,
    paymentMode: paymentMode || 'cod',
    paymentStatus,
    deliveryTimeSlot: deliveryTimeSlot || 'ASAP (Next 1-2 Hours)',
    createdAt: new Date().toISOString(),
    status: 'Confirmed'
  };

  orders.push(newOrder);
  console.log('New Official Order Received:', newOrder);

  res.status(201).json({
    success: true,
    message: `Order confirmed successfully! Tax Invoice Total: ₹${grandTotal} (GSTIN: 33CAHPP5553L1ZB).`,
    data: newOrder
  });
});

// POST Event / Mass Function Bookings
app.post('/api/events', (req, res) => {
  const { name, phone, eventType, eventDate, guestCount, location, neededItems, paymentMode } = req.body;

  if (!name || !phone || !eventType || !eventDate || !guestCount) {
    return res.status(400).json({ success: false, message: 'Please fill in Event Name, Phone, Date, and Guest Count.' });
  }

  const eventId = 'SAG-EVT-' + Math.floor(10000 + Math.random() * 90000);
  const newEventBooking = {
    eventId,
    name,
    phone,
    eventType,
    eventDate,
    guestCount,
    location: location || 'Coimbatore',
    neededItems: neededItems || [],
    paymentMode: paymentMode || 'cod',
    gstin: companyInfo.gstin,
    createdAt: new Date().toISOString(),
    status: 'Scheduled & Reserved'
  };

  eventBookings.push(newEventBooking);
  console.log('New Mass Event Booking:', newEventBooking);

  res.status(201).json({
    success: true,
    message: 'Mass Event Water Booking Reserved! Suvarna Traders customer care will contact you.',
    data: newEventBooking
  });
});

// POST Enquiries
app.post('/api/enquiries', (req, res) => {
  const { name, phone, email, subject, message, enquiryType } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ success: false, message: 'Please provide Name, Phone number, and Message.' });
  }

  const enquiryId = 'SAG-ENQ-' + Math.floor(10000 + Math.random() * 90000);
  const newEnquiry = {
    enquiryId,
    name,
    phone,
    email: email || companyInfo.email,
    enquiryType: enquiryType || 'General Enquiry',
    subject: subject || 'Water Supply / Function Order Enquiry',
    message,
    city: 'Coimbatore',
    createdAt: new Date().toISOString()
  };

  enquiries.push(newEnquiry);
  console.log('New Enquiry Received:', newEnquiry);

  res.status(201).json({
    success: true,
    message: 'Thank you! Suvarna Traders customer care will call you at your mobile number.',
    data: newEnquiry
  });
});

// POST Callbacks
app.post('/api/callbacks', (req, res) => {
  const { name, phone, preferredTime } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and Phone number are required.' });
  }

  const callbackId = 'SAG-CALL-' + Math.floor(1000 + Math.random() * 9000);
  const newCallback = {
    callbackId,
    name,
    phone,
    preferredTime: preferredTime || 'Immediate',
    city: 'Coimbatore',
    createdAt: new Date().toISOString()
  };

  callbacks.push(newCallback);
  console.log('New Callback Request:', newCallback);

  res.status(201).json({
    success: true,
    message: 'Callback registered! Suvarna Traders customer care will dial your mobile number.',
    data: newCallback
  });
});

app.listen(PORT, () => {
  console.log(`Success Aqua Green (Suvarna Traders - CBE Sungam) running on port ${PORT}`);
});
