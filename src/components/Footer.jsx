import React, { useState } from 'react';
import { Droplets, Phone, Mail, MapPin, ShieldCheck, Clock, Award, ArrowUpRight, Building2, X, FileText, Truck, Shield } from 'lucide-react';

export default function Footer({ setActiveTab, onOpenOrder, onOpenCallback }) {
  const [activeModal, setActiveModal] = useState(null);

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
          <p>© {new Date().getFullYear()} Suvarna Traders - Success Aqua Green. GSTIN: 33CAHPP5553L1ZB.</p>
          <div className="flex flex-wrap gap-6 items-center">
            <button 
              onClick={() => setActiveModal('privacy')}
              className="hover:text-cyanGlow-300 transition cursor-pointer text-left"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setActiveModal('delivery')}
              className="hover:text-cyanGlow-300 transition cursor-pointer text-left"
            >
              Terms of Delivery
            </button>
            <button 
              onClick={() => setActiveModal('gst')}
              className="hover:text-cyanGlow-300 transition cursor-pointer text-left"
            >
              GST Invoice Terms
            </button>
            <button 
              onClick={() => handleLink('admin')}
              className="hover:text-slate-300 transition cursor-pointer text-left text-slate-600 font-mono text-[11px]"
              title="Suvarna Traders Admin Login"
            >
              🔒 Staff Login
            </button>
          </div>
        </div>
      </div>

      {/* Policy & Terms Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-slate-200 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'privacy' && (
              <div>
                <div className="flex items-center gap-3 mb-4 text-cyanGlow-400">
                  <Shield className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                  <p>
                    <strong>Suvarna Traders (Success Aqua Green)</strong> values your trust and is committed to protecting your privacy and personal data.
                  </p>
                  <div>
                    <h4 className="font-semibold text-white mb-1">1. Information We Collect</h4>
                    <p className="text-slate-400">We collect basic customer information such as name, phone number, delivery address, and order requirements strictly to process packaged drinking water deliveries and handle callback inquiries.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">2. Data Usage & Protection</h4>
                    <p className="text-slate-400">Your details are used solely for order processing, logistics coordination across Coimbatore, and generating GST invoices. We do not sell, rent, trade, or share customer data with third parties.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">3. Customer Support Contact</h4>
                    <p className="text-slate-400">If you have any questions regarding your data or wish to update your records, contact us at <strong>sarveshenterprises2020@gmail.com</strong> or call <strong>+91 99949 19151</strong>.</p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'delivery' && (
              <div>
                <div className="flex items-center gap-3 mb-4 text-cyanGlow-400">
                  <Truck className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Terms of Delivery</h3>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                  <p>
                    Delivery service rules and scheduling policy for <strong>Suvarna Traders - Success Aqua Green</strong> packaged water products across Coimbatore.
                  </p>
                  <div>
                    <h4 className="font-semibold text-white mb-1">1. Delivery Zones & Timings</h4>
                    <p className="text-slate-400">We supply water cans & bottles across Sungam, RS Puram, Gandhipuram, Peelamedu, Singanallur, and surrounding Coimbatore regions. Standard delivery window is <strong>8:00 AM to 8:00 PM</strong> daily.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">2. Returnable 20L Water Can Deposit</h4>
                    <p className="text-slate-400">20 Litre water cans are supplied on a returnable empty-can exchange basis. First-time customers without an empty can are required to pay an initial refundable can deposit.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">3. Mass Event & Corporate Dispatch</h4>
                    <p className="text-slate-400">For weddings, marriage halls, corporate events, and bulk bottle orders (300ml, 500ml, 1L, 2L cartons), advance booking (24–48 hours) is recommended to ensure guaranteed timely delivery.</p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'gst' && (
              <div>
                <div className="flex items-center gap-3 mb-4 text-cyanGlow-400">
                  <Building2 className="w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">GST Invoice Terms</h3>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                  <p>
                    Tax invoicing guidelines and statutory business registration details for <strong>Suvarna Traders</strong>.
                  </p>
                  <div>
                    <h4 className="font-semibold text-white mb-1">1. GST Registration</h4>
                    <p className="text-slate-400">Official GSTIN: <strong className="text-cyanGlow-300">33CAHPP5553L1ZB</strong>. Registered business entity: Suvarna Traders (Branch Office, Sungam, Coimbatore).</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">2. HSN Classification & Tax Rates</h4>
                    <p className="text-slate-400">Packaged Drinking Water is supplied under HSN Code <strong>2201</strong> with applicable GST (CGST 9% + SGST 9%).</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">3. Invoice Requests for B2B & Corporate Accounts</h4>
                    <p className="text-slate-400">Official GST tax invoices are provided for corporate supply contracts, event organizers, and business clients. Provide your GSTIN during order booking for tax credit invoicing.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
