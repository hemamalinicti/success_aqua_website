import React, { useState } from 'react';
import { 
  Droplets, ShieldCheck, Truck, Clock, Award, Star, CheckCircle, ArrowRight, 
  MapPin, PhoneCall, Sparkles, Building2, Users, Flame, RefreshCw, Factory, PartyPopper 
} from 'lucide-react';
import PurificationProcess from '../components/PurificationProcess';

export default function Home({ setActiveTab, onOpenOrder, onOpenCallback }) {
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const handlePincodeCheck = async (e) => {
    e.preventDefault();
    if (!pincodeInput) return;
    setPincodeLoading(true);

    try {
      const res = await fetch(`/api/service-areas?query=${encodeURIComponent(pincodeInput)}`);
      const data = await res.json();
      if (data.data && data.data.length > 0) {
        setPincodeResult({ available: true, area: data.data[0] });
      } else {
        setPincodeResult({ available: false, query: pincodeInput });
      }
    } catch (err) {
      const valid = ['641045', '641018', '641002', '641004', '641012', '641006', '641021', '641035', '641049'];
      if (valid.includes(pincodeInput.trim())) {
        setPincodeResult({ available: true, area: { areaName: 'Coimbatore Delivery Zone', deliveryTime: '30 Mins' } });
      } else {
        setPincodeResult({ available: false, query: pincodeInput });
      }
    } finally {
      setPincodeLoading(false);
    }
  };

  const featuredProducts = [
    {
      id: 'can-20l',
      name: '20 Litre Premium Water Can (Filled)',
      subtitle: 'Most Popular for Homes, Offices & Halls',
      price: '₹80',
      gstNote: '+ 18% GST',
      tag: 'Filled Can',
      badgeColor: 'bg-cyan-500 text-slate-950 font-black',
      image: '/images/can-20l.png',
      features: ['7-Stage RO + UV + Ozone', 'Food-grade BPA Free Can', 'Free Doorstep Delivery', 'Tamper Seal Guarantee']
    },
    {
      id: 'empty-can-20l',
      name: 'Heavy Duty 20L Polycarbonate Can (Empty)',
      subtitle: 'Factory Direct Empty Can Manufacturing',
      price: '₹180',
      gstNote: '+ 18% GST',
      tag: 'Empty Can',
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
      image: '/images/can-20l.png',
      features: ['100% Virgin Food-Grade PC', 'Reinforced Heavy Weight', 'Standard 55mm Press Neck', '500+ Wash Lifespan']
    },
    {
      id: 'can-tap-dispenser',
      name: 'Fast Flow Can Tap Dispenser',
      subtitle: 'Food-Grade Dispenser Tap Accessory',
      price: '₹50',
      gstNote: '+ 18% GST',
      tag: 'Dispenser Tap',
      badgeColor: 'bg-emerald-500 text-white font-black',
      image: '/images/can-tap-dispenser.png',
      features: ['Food-Grade Safe Plastic', 'Leak-Proof Silicone Seal', 'Press-to-Flow Operation', 'Fits Standard 20L Water Cans']
    },
    {
      id: 'can-lifting-gripper',
      name: 'Heavy Duty Can Lifting Gripper',
      subtitle: 'Ergonomic Dual-Hand Carrying Handle',
      price: '₹70',
      gstNote: '+ 18% GST',
      tag: 'Can Gripper',
      badgeColor: 'bg-purple-600 text-white font-black',
      image: '/images/can-lifting-gripper.png',
      features: ['Ergonomic Anti-Slip Grip', 'Reduces Lifting Strain by 50%', 'Heavy Duty Reinforced ABS', 'Fits 20L & 10L Water Cans']
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* HERO BANNER SECTION - High Contrast Bright Text */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-slate-950 text-white border-b border-slate-800">

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/60 to-slate-950/90 z-0"></div>

        <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-400 text-amber-300 text-xs font-black shadow-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Suvarna Traders • Water Supply & Empty Can Manufacturing</span>
              </div>

              {/* Headings - Crisp High Contrast Pure White & Glowing Cyan */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Pure Packaged Water & <br />
                <span className="text-cyan-300 underline underline-offset-8 decoration-amber-400">
                  Empty Can Manufacturing
                </span>
              </h1>

              <p className="text-slate-100 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-semibold">
                Success Aqua Green (Suvarna Traders) supplies 300ml, 500ml, 1L, 2L, 5L, and 20L water cans, manufactures empty PC cans & PET bottles, and manages mass water supply for functions with official 18% GST billing (GSTIN: 33CAHPP5553L1ZB).
              </p>

              {/* Action Buttons - Solid High Contrast Bright Colors */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenOrder()}
                  className="w-full sm:w-auto bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3"
                >
                  <Droplets className="w-5 h-5 fill-current text-slate-950" />
                  Order Water / Empty Cans
                </button>
                <button
                  onClick={() => setActiveTab('event-booking')}
                  className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2"
                >
                  <PartyPopper className="w-5 h-5 text-slate-950" />
                  Mass Event Booking
                </button>
              </div>

              {/* Quick Pincode Checker Card */}
              <div className="pt-4">
                <div className="bg-slate-900 p-5 rounded-2xl border-2 border-slate-700 shadow-2xl max-w-md mx-auto lg:mx-0 space-y-3">
                  <p className="text-xs font-black text-white flex items-center gap-2">
                    <MapPin className="w-4.5 h-4.5 text-cyan-400" /> Check Coimbatore Pincode Delivery Availability
                  </p>
                  <form onSubmit={handlePincodeCheck} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Pincode (e.g. 641045, Sungam)"
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value)}
                      className="w-full text-sm px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-600 text-white placeholder:text-slate-400 font-bold focus:ring-2 focus:ring-cyan-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={pincodeLoading}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-5 py-3 rounded-xl shrink-0 transition"
                    >
                      {pincodeLoading ? 'Checking...' : 'Check'}
                    </button>
                  </form>
                  {pincodeResult && (
                    <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      pincodeResult.available ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400' : 'bg-amber-500/20 text-amber-300 border border-amber-400'
                    }`}>
                      {pincodeResult.available ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span>Delivery Available! Express Delivery in <strong>{pincodeResult.area.deliveryTime}</strong> ({pincodeResult.area.areaName})</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Coimbatore Pincode active! Call +91 99949 19151 for booking.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Hero Right Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                
                <div className="absolute -top-4 -left-4 z-20 bg-slate-900 p-3.5 rounded-2xl shadow-2xl border-2 border-slate-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">Suvarna Traders</p>
                    <p className="text-[10px] font-bold text-cyan-300">Sungam By-Pass, Coimbatore</p>
                  </div>
                </div>

                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-slate-900 group relative h-[380px] flex items-center justify-center p-3">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-2xl shadow-inner group-hover:scale-105 transition duration-700"
                  >
                    <source src="/videos/hero-feature.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-5 flex flex-col justify-end text-white rounded-b-2xl pointer-events-none">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400">GSTIN: 33CAHPP5553L1ZB</span>
                    <h3 className="text-xl font-black text-white">All Water Sizes (300ml - 20L)</h3>
                    <p className="text-xs text-slate-200 mt-0.5 font-semibold">Official 18% GST invoice billing & online/COD payments.</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 z-20 bg-slate-900 p-3.5 rounded-2xl shadow-2xl border-2 border-slate-700 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-black">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">4.9 / 5.0 Rating</p>
                    <p className="text-[10px] font-bold text-slate-300">Coimbatore's #1 Choice</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl border-2 border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-cyan-300">300ml - 20L</p>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">All Bottle & Can Sizes</p>
          </div>
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-amber-300">100% PC</p>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Empty Can Manufacturing</p>
          </div>
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <p className="text-3xl sm:text-4xl font-black text-white">18% GST</p>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Automatic Tax Invoicing</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-black text-cyan-300">UPI / COD</p>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-wider">Online & Offline Payment</p>
          </div>
        </div>
      </section>

      {/* PRODUCT HIGHLIGHTS SECTION */}
      <section className="max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black text-slate-900 uppercase tracking-widest bg-amber-400 px-4 py-1.5 rounded-full border border-amber-500 shadow-sm">
            Suvarna Traders Coimbatore Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 tracking-tight">
            Purified Water & Manufactured Empty Cans
          </h2>
          <p className="text-slate-700 text-sm mt-2 font-semibold">
            Choose between purified drinking water delivery or direct factory supply of manufactured empty 20L Polycarbonate cans and PET bottles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md flex flex-col justify-between group hover:-translate-y-1 transition duration-300"
            >
              {/* Compact Image Box */}
              <div className="relative h-40 overflow-hidden bg-gradient-to-b from-blue-50 to-slate-100 border-b border-slate-200 flex items-center justify-center p-2.5">
                <img 
                  src={prod.image} 
                  alt={prod.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition duration-300"
                />
                <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase shadow z-10 border border-slate-300 ${prod.badgeColor}`}>
                  {prod.tag}
                </span>
              </div>

              {/* Compact Body Content */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-tight group-hover:text-blue-700 transition">{prod.name}</h3>
                  <p className="text-[10px] text-slate-600 font-bold mt-0.5">{prod.subtitle}</p>

                  <div className="mt-2 pt-2 border-t border-slate-100 space-y-1">
                    {prod.features.slice(0, 3).map((feat, idx) => (
                      <p key={idx} className="text-[10px] text-slate-800 font-semibold flex items-center gap-1.5">
                        <CheckCircle className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>{feat}</span>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-slate-900">{prod.price}</span>
                    <span className="text-[9px] text-blue-700 font-extrabold block">{prod.gstNote}</span>
                  </div>
                  <button
                    onClick={() => onOpenOrder(prod.name)}
                    className="bg-slate-950 hover:bg-blue-700 text-white font-black text-xs px-3.5 py-2 rounded-xl shadow transition flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                  >
                    Buy Now <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Navigation Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-3 bg-blue-700 hover:bg-slate-950 text-white font-black text-xs sm:text-sm px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 border-2 border-blue-800 cursor-pointer uppercase tracking-wider group"
          >
            <span>View All Products & Sizes (300ml - 20L Cans & Accessories)</span>
            <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* 7-STAGE PURIFICATION VISUALIZER */}
      <section className="max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        <PurificationProcess />
      </section>

    </div>
  );
}
