import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';

import orderRoutes from './routes/orderRoutes.js';
import callbackRoutes from './routes/callbackRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import serviceAreaRoutes from './routes/serviceAreaRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/orders', orderRoutes);
app.use('/api/callbacks', callbackRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/enquiries', contactRoutes);
app.use('/api/service-areas', serviceAreaRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'Success Aqua Green Backend API',
    branch: 'Suvarna Traders',
    gstin: '33CAHPP5553L1ZB',
    timestamp: new Date().toISOString()
  });
});

// Serve production static website files
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// SPA Fallback for non-API routes to render Website UI
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Backend Server] Express API & Website running on http://localhost:${PORT}`);
});
