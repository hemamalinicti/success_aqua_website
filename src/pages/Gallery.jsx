import React, { useState } from 'react';
import { Camera, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function Gallery({ onOpenOrder }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      title: '7-Stage Reverse Osmosis Unit',
      category: 'plant',
      image: '/images/step-2-carbon.jpg',
      desc: 'High capacity stainless steel RO membranes processing 25,000L daily.'
    },
    {
      id: 2,
      title: 'Automated 5-Step Can Washing Line',
      category: 'bottling',
      image: '/images/step-6-ozone.jpg',
      desc: 'Machine washing cans with 80°C hot water and ozonated spray.'
    },
    {
      id: 3,
      title: 'NABL Certified Water Testing Lab',
      category: 'quality',
      image: '/images/purity-glass.jpg',
      desc: 'Daily TDS, pH, and microbiological batch inspection.'
    },
    {
      id: 4,
      title: 'Fast Express Delivery Fleet',
      category: 'fleet',
      image: '/images/event-bulk-cans.jpg',
      desc: 'Dedicated delivery vehicles for express doorstep service.'
    },
    {
      id: 5,
      title: 'Corporate Client Pantry Installation',
      category: 'clients',
      image: '/images/can-tap-dispenser.png',
      desc: '20L water cans installed with automatic USB dispenser pumps.'
    },
    {
      id: 6,
      title: '1L Bottle Packaging & Sealing',
      category: 'bottling',
      image: '/images/products-hero.jpg',
      desc: 'Hygienic touchless bottling for events and conferences.'
    }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-aqua-700 uppercase tracking-widest bg-aqua-50 px-3.5 py-1.5 rounded-full border border-aqua-200">
          Plant & Quality Facility
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Photo Gallery & <br />
          <span className="text-blue-700 font-black text-3xl sm:text-4xl block mt-2">
            Hygiene Standards Showcase
          </span>
        </h1>
        <p className="text-slate-600 text-base">
          Take a virtual tour of our automated purification plant, quality testing lab, and delivery operations.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'All Photos' },
          { id: 'plant', label: 'Purification Plant' },
          { id: 'bottling', label: 'Automated Bottling' },
          { id: 'quality', label: 'Quality Lab' },
          { id: 'fleet', label: 'Delivery Fleet' },
          { id: 'clients', label: 'Corporate Clients' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition ${
              activeFilter === tab.id
                ? 'bg-ocean-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden group hover:shadow-2xl transition duration-300 flex flex-col justify-between"
          >
            <div className="relative h-60 overflow-hidden bg-slate-100">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full backdrop-blur-md">
                {item.category}
              </span>
            </div>

            <div className="p-6 space-y-2">
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-ocean-600 transition">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> ISO Standards Compliant</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-2xl font-bold">Want to Visit Our Plant or Place an Order?</h3>
        <p className="text-xs text-slate-400">We welcome corporate clients and bulk buyers for plant tours upon appointment.</p>
        <button
          onClick={onOpenOrder}
          className="bg-aqua-500 hover:bg-aqua-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl transition text-xs shadow-md"
        >
          Book Water Delivery Now
        </button>
      </div>

    </div>
  );
}
