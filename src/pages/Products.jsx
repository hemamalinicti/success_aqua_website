import React, { useState } from 'react';
import { 
  Droplets, CheckCircle2, ShoppingCart, Calculator, Building2, 
  Sparkles, ShieldCheck, ArrowRight, RefreshCw, Zap, Truck, Factory, Package 
} from 'lucide-react';

export default function Products({ onOpenOrder, onOpenCallback }) {
  const [activeCatalogTab, setActiveCatalogTab] = useState('filled'); // 'filled' | 'manufacturing'

  // Water Calculator State
  const [peopleCount, setPeopleCount] = useState(4);
  const [usageType, setUsageType] = useState('home');

  const dailyLiters = usageType === 'home' ? peopleCount * 2.5 : peopleCount * 1.5;
  const monthlyCans = Math.ceil((dailyLiters * 30) / 20);
  const subtotalEst = monthlyCans * 70;
  const gstEst = Math.round(subtotalEst * 0.18);
  const totalEst = subtotalEst + gstEst;

  const filledProducts = [
    {
      id: 'can-20l',
      name: '20 Litre Premium Water Can (Filled)',
      category: 'Purified Water',
      price: '₹80',
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
      popular: true
    },
    {
      id: 'can-5l',
      name: '5 Litre Handy Aqua Can (Filled)',
      category: 'Purified Water',
      price: '₹45',
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
      popular: false
    },
    {
      id: 'bottle-2l',
      name: '2 Litre Packaged Bottle Box (6 Pcs)',
      category: 'Purified Water',
      price: '₹180',
      gstNote: '+ 18% GST (₹212.40 Total)',
      subscriptionPrice: '₹30 / bottle (Box of 6)',
      specs: [
        { label: 'Pack Size', val: '6 Bottles x 2.0 Litres' },
        { label: 'Packaging', val: 'Sealed Heavy Corrugated Box' },
        { label: 'Bottle Quality', val: '100% Recyclable Virgin PET' },
        { label: 'Shelf Life', val: '6 Months' }
      ],
      ideal: 'Travel, Dining Tables & Family Outings',
      image: '/images/can-2l.png',
      popular: false
    },
    {
      id: 'bottle-1l',
      name: '1 Litre Packaged Bottle Carton (12 Pcs)',
      category: 'Purified Water',
      price: '₹240',
      gstNote: '+ 18% GST (₹283.20 Total)',
      subscriptionPrice: '₹20 / bottle (Box of 12)',
      specs: [
        { label: 'Pack Size', val: '12 Bottles x 1.0 Litre' },
        { label: 'Packaging', val: 'Sealed Corrugated Carton' },
        { label: 'Bottle Quality', val: '100% Recyclable Virgin PET' },
        { label: 'Certification', val: 'ISI Marked & FSSAI Approved' }
      ],
      ideal: 'Conferences, Marriages & Functions',
      image: '/images/bottle-500ml.png',
      popular: true
    },
    {
      id: 'bottle-500ml',
      name: '500 ml Handy Bottle Carton (24 Pcs)',
      category: 'Purified Water',
      price: '₹280',
      gstNote: '+ 18% GST (₹330.40 Total)',
      subscriptionPrice: '₹11.60 / bottle (Box of 24)',
      specs: [
        { label: 'Pack Size', val: '24 Bottles x 500 ml' },
        { label: 'Packaging', val: 'Compact Travel Carton' },
        { label: 'Portability', val: 'Easy Handheld Size' }
      ],
      ideal: 'VIP Guests, Meeting Rooms & Vehicle Travel',
      image: '/images/bottle-500ml.png',
      popular: true
    },
    {
      id: 'bottle-300ml',
      name: '300 ml Mini Function Bottle Carton (24 Pcs)',
      category: 'Purified Water',
      price: '₹240',
      gstNote: '+ 18% GST (₹283.20 Total)',
      subscriptionPrice: '₹10 / bottle (Box of 24)',
      specs: [
        { label: 'Pack Size', val: '24 Bottles x 300 ml' },
        { label: 'Feature', val: 'Zero-Waste Mini Serving Size' },
        { label: 'Usage', val: 'Marriage Reception Halls & Lunches' }
      ],
      ideal: 'Wedding Receptions, Catering & Dinners',
      image: '/images/bottle-300ml.png',
      popular: true
    }
  ];

  const emptyManufacturingProducts = [
    {
      id: 'empty-can-20l',
      name: 'Heavy Duty 20L Polycarbonate Can (Empty)',
      category: 'Empty Can Manufacturing',
      price: '₹180',
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
      popular: true
    },
    {
      id: 'empty-can-5l',
      name: '5L PET Handy Can with Dispenser Cap (Empty)',
      category: 'Empty Can Manufacturing',
      price: '₹65',
      gstNote: '+ 18% GST (₹76.70 Total)',
      subscriptionPrice: 'Bulk Tier: ₹55 (>200 Pcs)',
      specs: [
        { label: 'Capacity', val: '5 Litres' },
        { label: 'Material', val: 'BPA-Free Clear PET' },
        { label: 'Accessories', val: 'Includes Sturdy Handle & Tap Cap' }
      ],
      ideal: 'Packaging Units & Retail Outlets',
      image: '/images/can-5l.png',
      popular: false
    },
    {
      id: 'empty-bottle-1l',
      name: '1 Litre PET Empty Water Bottle Carton (12 Pcs)',
      category: 'Empty Bottle Manufacturing',
      price: '₹120',
      gstNote: '+ 18% GST (₹141.60 Total)',
      subscriptionPrice: 'Bulk Tier: ₹9 / pc (>500 Pcs)',
      specs: [
        { label: 'Capacity', val: '1.0 Litre' },
        { label: 'Pack Size', val: '12 Empty PET Bottles Box' },
        { label: 'Material', val: '100% Virgin Food-Grade PET' },
        { label: 'Cap Type', val: 'Includes 28mm Tamper-Evident Screw Caps' }
      ],
      ideal: 'Bottling Plants, Water Suppliers & B2B Retailers',
      image: '/images/bottle-500ml.png',
      popular: true
    },
    {
      id: 'empty-bottle-500ml',
      name: '500 ml PET Empty Water Bottle Carton (24 Pcs)',
      category: 'Empty Bottle Manufacturing',
      price: '₹144',
      gstNote: '+ 18% GST (₹169.92 Total)',
      subscriptionPrice: 'Bulk Tier: ₹5 / pc (>1000 Pcs)',
      specs: [
        { label: 'Capacity', val: '500 ml' },
        { label: 'Pack Size', val: '24 Empty PET Bottles Box' },
        { label: 'Material', val: '100% Virgin Food-Grade PET' },
        { label: 'Cap Type', val: 'Includes 28mm Tamper-Evident Screw Caps' }
      ],
      ideal: 'Custom Brand Bottling & Event Suppliers',
      image: '/images/bottle-500ml.png',
      popular: false
    },
    {
      id: 'can-tap-dispenser',
      name: 'High-Flow Water Can Dispenser Tap',
      category: 'Accessories & Fittings',
      price: '₹25',
      gstNote: '+ 18% GST (₹29.50 Total)',
      subscriptionPrice: 'Bulk Tier: ₹18 (>100 Pcs)',
      specs: [
        { label: 'Compatibility', val: 'Fits 5L & 20L Water Cans' },
        { label: 'Material', val: '100% Food-Grade Virgin PP' },
        { label: 'Seal', val: 'Leakproof Silicone Gasket' },
        { label: 'Flow Rate', val: 'High-Flow Fast Pouring' }
      ],
      ideal: 'Residences, Offices & Water Can Units',
      image: '/images/can-tap-dispenser.png',
      popular: true
    },
    {
      id: 'can-lifting-gripper',
      name: 'Heavy-Duty 20L Water Can Lifting Gripper Handle',
      category: 'Lifting Accessories',
      price: '₹40',
      gstNote: '+ 18% GST (₹47.20 Total)',
      subscriptionPrice: 'Bulk Tier: ₹30 (>100 Pcs)',
      specs: [
        { label: 'Purpose', val: 'Easy 20L Can Lifting & Carrying' },
        { label: 'Material', val: 'Reinforced Heavy Duty ABS Plastic' },
        { label: 'Grip', val: 'Anti-Slip Ergonomic Hand Grip' },
        { label: 'Load Rating', val: 'Tested Up to 30 Kg Weight' }
      ],
      ideal: 'Delivery Staff, Homeowners & Offices',
      image: '/images/can-lifting-gripper.png',
      popular: true
    }
  ];

  const currentProducts = activeCatalogTab === 'filled' ? filledProducts : emptyManufacturingProducts;

  return (
    <div className="space-y-16 py-8 max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
      
      {/* HERO BANNER SECTION WITH WATER IMAGE */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border-2 border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute inset-0 z-0 opacity-35">
          <img 
            src="/images/products-hero.jpg" 
            alt="Pure Water Fountain" 
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50 z-0"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <span className="inline-block text-xs font-black text-slate-950 uppercase tracking-widest bg-amber-400 px-4 py-1.5 rounded-full border border-amber-500 shadow-sm">
              Suvarna Traders - All Water Sizes & Empty Cans
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              300ml, 500ml, 1L, 2L, 5L & 20L <br />
              <span className="text-cyan-300 font-black">
                Packaged Drinking Water & Empty Cans
              </span>
            </h1>
            <p className="text-slate-200 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl">
              We supply all packaged drinking water sizes (300ml, 500ml, 1L, 2L, 5L, 20L) for all functions, events, and daily home/office delivery in Coimbatore.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-48 h-60 sm:w-56 sm:h-68 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl group">
              <img 
                src="/images/products-hero.jpg" 
                alt="Pure Water Fountain Showcase" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-3 flex flex-col justify-end">
                <span className="text-[10px] font-black uppercase text-amber-400">100% Pure & Hygienic</span>
                <p className="text-xs font-black text-white">7-Stage RO + UV + Ozone</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DUAL CATALOG CATEGORY TOGGLE */}
      <div className="flex justify-center">
        <div className="bg-slate-200 p-2 rounded-2xl border-2 border-slate-300 inline-flex gap-2">
          <button
            onClick={() => setActiveCatalogTab('filled')}
            className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition flex items-center gap-2 ${
              activeCatalogTab === 'filled'
                ? 'bg-blue-700 text-white shadow-lg scale-105'
                : 'text-slate-900 hover:bg-slate-300'
            }`}
          >
            <Droplets className="w-4 h-4" /> Purified Water Sizes (300ml - 20L)
          </button>
          <button
            onClick={() => setActiveCatalogTab('manufacturing')}
            className={`px-6 py-3 rounded-xl font-black text-xs sm:text-sm transition flex items-center gap-2 ${
              activeCatalogTab === 'manufacturing'
                ? 'bg-slate-950 text-white shadow-lg scale-105 border border-amber-400'
                : 'text-slate-900 hover:bg-slate-300'
            }`}
          >
            <Factory className="w-4 h-4 text-amber-400" /> Manufactured Empty Cans & Bottles
          </button>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {currentProducts.map((product) => (
          <div 
            key={product.id}
            className="bg-white rounded-2xl border-2 border-slate-200 shadow-md overflow-hidden flex flex-col justify-between group hover:-translate-y-1 transition duration-300"
          >
            <div>
              {/* Compact Image Box */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-b from-blue-50 to-slate-100 border-b border-slate-200 flex items-center justify-center p-2.5">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition duration-300"
                />
                {product.popular && (
                  <span className="absolute top-2 right-2 bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow z-10 border border-amber-500">
                    Popular
                  </span>
                )}
              </div>

              {/* Compact Body Content */}
              <div className="p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">{product.category}</span>
                  <span className="text-[9px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{product.ideal}</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight">{product.name}</h3>

                {/* Compact 2-Column Key Specs */}
                <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-bold">
                  {product.specs.slice(0, 2).map((spec, i) => (
                    <div key={i} className="bg-slate-50 p-1.5 rounded border border-slate-200">
                      <span className="text-slate-500 block text-[9px] font-bold uppercase">{spec.label}</span>
                      <span className="text-slate-950 font-black truncate block">{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Compact Footer */}
            <div className="p-3.5 pt-0 space-y-2">
              <div className="flex items-baseline justify-between border-t border-slate-100 pt-2">
                <div>
                  <span className="text-lg font-black text-slate-900">{product.price}</span>
                  <span className="text-[9px] text-blue-700 font-extrabold block">{product.gstNote}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-slate-900 block">{product.subscriptionPrice}</span>
                  <span className="text-[8px] text-slate-500 font-bold uppercase">Offer Rate</span>
                </div>
              </div>

              <button
                onClick={() => onOpenOrder(product.name)}
                className="w-full bg-slate-950 hover:bg-blue-700 text-white font-black py-2 rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5 uppercase tracking-wider cursor-pointer"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-amber-400" /> Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
