import React from 'react';
import { Droplets, Phone, Mail, MapPin, ShieldCheck, Clock, Award, ArrowUpRight, Building2 } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenOrder, onOpenCallback }) {
  const handleLink = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyanGlow-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyanGlow-400 to-sapphire-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-cyanGlow-400 fill-cyanGlow-400/20" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">SUCCESS AQUA GREEN</span>
                <p className="text-[10px] font-bold text-cyanGlow-400 uppercase tracking-widest">SUVARNA TRADERS • PACKAGED WATER</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Branch Office: <strong>Suvarna Traders</strong>. Supplying 300ml, 500ml, 1L, 2L, 5L & 20L packaged drinking water cans & bottles for all functions, events, residences, and B2B corporate clients across Coimbatore.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyanGlow-500/10 text-cyanGlow-300 border border-cyanGlow-500/20">
                <Building2 className="w-3.5 h-3.5 text-cyanGlow-400" /> GSTIN: 33CAHPP5553L1ZB
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-xs">Quick Navigation</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Company & Story' },
                { id: 'products', label: 'Products & All Water Sizes' },
                { id: 'event-booking', label: 'Mass Event & Wedding Booking' },
                { id: 'contact', label: 'Contact Us & Sungam Branch' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLink(link.id)}
                    className="hover:text-cyanGlow-300 transition flex items-center gap-1.5 group text-left"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyanGlow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products & Sizes */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-xs">Available Bottle & Can Sizes</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>• 20 Litre Standard Water Cans</li>
              <li>• 5 Litre Handy Aqua Cans w/ Tap</li>
              <li>• 2 Litre Family Bottles Box (6 Pcs)</li>
              <li>• 1 Litre Function Bottles Box (12 Pcs)</li>
              <li>• 500 ml Handy Bottles Box (24 Pcs)</li>
              <li>• 300 ml Mini Function Bottles (24 Pcs)</li>
            </ul>
            <div className="mt-4">
              <button
                onClick={onOpenOrder}
                className="w-full bg-gradient-to-r from-cyanGlow-500 to-sapphire-600 hover:from-cyanGlow-400 hover:to-sapphire-500 text-white text-xs font-bold py-2.5 rounded-lg transition text-center block shadow-glow-cyan"
              >
                Order Water Cans / Bottles
              </button>
            </div>
          </div>

          {/* Column 4: Suvarna Traders Sungam Office */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-xs">Suvarna Traders Branch</h3>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="w-5 h-5 text-cyanGlow-400 shrink-0 mt-0.5" />
              <span>No.37, Indira Nagar, Sungam By-Pass Road, Sungam, Cbe - 45</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="w-4 h-4 text-cyanGlow-400 shrink-0" />
              <span>+91 99949 19151 / 97903 70924</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="w-4 h-4 text-cyanGlow-400 shrink-0" />
              <span>Landline / Customer Care: 0422 4919151</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Mail className="w-4 h-4 text-cyanGlow-400 shrink-0" />
              <span>sarveshenterprises2020@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Suvarna Traders - Success Aqua Green. GSTIN: 33CAHPP5553L1ZB. Prepared by Hemamalini S (CodeThrive Infotech).</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Delivery</span>
            <span className="hover:text-slate-400 cursor-pointer">GST Invoice Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
