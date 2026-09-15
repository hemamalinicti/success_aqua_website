import React, { useState, useEffect } from 'react';
import { MapPin, Search, Clock, CheckCircle2, Truck, ShieldAlert, PhoneCall } from 'lucide-react';

export default function ServiceAreas({ onOpenOrder, onOpenCallback }) {
  const [query, setQuery] = useState('');
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAreas = async (searchQuery = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/service-areas?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setAreas(data.data);
      }
    } catch (e) {
      // Local Coimbatore fallback dataset
      const defaultList = [
        { pincode: '641002', areaName: 'R.S. Puram / TVS Nagar', zone: 'West Coimbatore', deliveryTime: '45 Mins', available: true },
        { pincode: '641004', areaName: 'Peelamedu / Hopes College / PSG Tech', zone: 'East Coimbatore', deliveryTime: '45 Mins', available: true },
        { pincode: '641006', areaName: 'Ganapathy / Prozone Mall / Sathy Road', zone: 'North Coimbatore', deliveryTime: '1 Hour', available: true },
        { pincode: '641012', areaName: 'Gandhipuram / Cross Cut Road / 100 Feet Rd', zone: 'Central Coimbatore', deliveryTime: '45 Mins', available: true },
        { pincode: '641018', areaName: 'Race Course / Thomas Park / Collectorate', zone: 'Central Coimbatore', deliveryTime: '45 Mins', available: true },
        { pincode: '641021', areaName: 'Kurichi SIDCO Industrial Estate / Eachanari', zone: 'South Coimbatore (Plant Hub)', deliveryTime: '30 Mins', available: true },
        { pincode: '641035', areaName: 'Saravanampatti / CHIL SEZ IT Park', zone: 'North-East IT Belt', deliveryTime: '1 Hour', available: true },
        { pincode: '641045', areaName: 'Singanallur / Ramanathapuram / Ondipudur', zone: 'East Coimbatore', deliveryTime: '1 Hour', available: true },
        { pincode: '641049', areaName: 'Kovaipudur / Kuniyamuthur / VLB Tech', zone: 'South-West Coimbatore', deliveryTime: '1 Hour', available: true },
      ];
      setAreas(defaultList.filter(a => 
        a.pincode.includes(searchQuery) || a.areaName.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas(query);
  }, [query]);

  return (
    <div className="space-y-16 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
          Coimbatore Delivery Coverage
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Coimbatore Service Areas & <br />
          <span className="text-blue-700 font-black text-3xl sm:text-4xl block mt-2">
            Pincode Delivery Checker
          </span>
        </h1>
        <p className="text-slate-600 text-base">
          We operate a fleet of delivery vehicles across Coimbatore city. Search your area or pincode below to check delivery lead time.
        </p>
      </div>

      {/* Interactive Search Tool */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card max-w-3xl mx-auto space-y-6">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Pincode or Area (e.g., 641004, RS Puram, Peelamedu, Gandhipuram, Saravanampatti)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base rounded-2xl border border-slate-300 focus:ring-2 focus:ring-aqua-500 focus:outline-none shadow-sm"
          />
        </div>

        {/* Results grid */}
        <div>
          {loading ? (
            <p className="text-center py-6 text-slate-500 text-sm">Searching Coimbatore service areas...</p>
          ) : areas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {areas.map((area, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between hover:bg-aqua-50/50 hover:border-aqua-200 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-ocean-600 text-white font-extrabold text-xs px-2 py-0.5 rounded-md">
                        {area.pincode}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">{area.zone}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{area.areaName}</p>
                    <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Lead Time: {area.deliveryTime}
                    </p>
                  </div>

                  <button
                    onClick={onOpenOrder}
                    className="bg-ocean-600 hover:bg-ocean-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition shrink-0"
                  >
                    Order Can
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 space-y-3 bg-amber-50 rounded-2xl border border-amber-200 p-6">
              <ShieldAlert className="w-8 h-8 text-amber-600 mx-auto" />
              <p className="font-bold text-amber-900 text-sm">No exact match for "{query}" in default list</p>
              <p className="text-xs text-amber-800">
                Don't worry! We cover all surrounding Coimbatore industrial & residential belts. Call our hotline for custom delivery.
              </p>
              <button
                onClick={onOpenCallback}
                className="bg-amber-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md"
              >
                Request Call for Coimbatore Delivery
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
