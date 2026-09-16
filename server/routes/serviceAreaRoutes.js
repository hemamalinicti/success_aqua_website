import express from 'express';
import ServiceArea from '../models/ServiceArea.js';

const router = express.Router();

const defaultCoimbatoreAreas = [
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

// Get service areas with query search
router.get('/', async (req, res) => {
  try {
    const { query = '' } = req.query;

    // Check if database is populated, if not, seed default areas
    const count = await ServiceArea.countDocuments();
    if (count === 0) {
      await ServiceArea.insertMany(defaultCoimbatoreAreas);
    }

    let filter = {};
    if (query) {
      const q = String(query).toLowerCase();
      filter = {
        $or: [
          { pincode: { $regex: q, $options: 'i' } },
          { areaName: { $regex: q, $options: 'i' } },
          { zone: { $regex: q, $options: 'i' } }
        ]
      };
    }

    const areas = await ServiceArea.find(filter);
    res.json({ success: true, count: areas.length, data: areas });
  } catch (error) {
    console.error('[API Service Areas Error]:', error);
    // Fallback search over static array if DB is not reachable
    const q = String(req.query.query || '').toLowerCase();
    const filtered = defaultCoimbatoreAreas.filter(a => 
      a.pincode.includes(q) || a.areaName.toLowerCase().includes(q) || a.zone.toLowerCase().includes(q)
    );
    res.json({ success: true, count: filtered.length, data: filtered, fallback: true });
  }
});

export default router;
