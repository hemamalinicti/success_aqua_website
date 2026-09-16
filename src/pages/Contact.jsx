import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, MessageSquare, Clock, Send, Search,
  CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Loader2, Truck, ShieldAlert, Building2 
} from 'lucide-react';

export default function Contact({ onOpenOrder, onOpenCallback }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    enquiryType: 'General Enquiry',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Service Areas Search State
  const [pincodeQuery, setPincodeQuery] = useState('');
  const [areas, setAreas] = useState([]);
  const [areaLoading, setAreaLoading] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const fetchAreas = async (searchQuery = '') => {
    setAreaLoading(true);
    try {
      const res = await fetch(`/api/service-areas?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data.success) {
        setAreas(data.data);
      }
    } catch (e) {
      // Local Coimbatore fallback dataset
      const defaultList = [
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
      setAreas(defaultList.filter(a => 
        a.pincode.includes(searchQuery) || a.areaName.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } finally {
      setAreaLoading(false);
    }
  };

  useEffect(() => {
    fetchAreas(pincodeQuery);
  }, [pincodeQuery]);

  const faqs = [
    {
      q: 'Which bottle sizes are available for functions and event supply?',
      a: 'We supply 300 ml mini function bottles, 500 ml bottles, 1 Litre bottles, 2 Litre bottles, 5 Litre handy cans, and 20 Litre water cans on order for all celebrations, marriage halls, and corporate events.'
    },
    {
      q: 'What is the official GSTIN and company registration details?',
      a: 'Our registered branch office is SUVARNA TRADERS with GSTIN 33CAHPP5553L1ZB located at No.37, Indira Nagar, Sungam By-Pass Road, Sungam, Coimbatore - 641045.'
    },
    {
      q: 'What are the customer care phone numbers to place direct orders?',
      a: 'You can reach Suvarna Traders customer care at +91 99949 19151, +91 97903 70924, or Landline 0422 4919151.'
    },
    {
      q: 'What payment options do you support?',
      a: 'We support Online UPI (GPay/PhonePe), Credit/Debit Cards, Netbanking, and offline Cash on Delivery (COD). All orders provide an 18% GST tax invoice.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setError('Please fill in your Name, Phone Number, and Message.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || 'Error sending message.');
      }
    } catch (err) {
      console.error('Contact enquiry error:', err);
      setError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-8 max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
      
      {/* CONTACT HERO BANNER WITH DRINKING WATER IMAGE */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border-2 border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/images/contact-hero.jpg" 
            alt="Drinking Pure Packaged Water" 
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50 z-0"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <span className="inline-block text-xs font-black text-slate-950 uppercase tracking-widest bg-amber-400 px-5 py-2 rounded-full border-2 border-amber-500 shadow-md">
              Suvarna Traders - Success Aqua Green
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Branch Office, Service Areas & <br />
              <span className="text-cyan-300 font-black">
                Customer Support Center
              </span>
            </h1>
            <p className="text-slate-200 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl">
              Contact Suvarna Traders at Sungam By-Pass Road, Coimbatore for 300ml, 500ml, 1L, 2L, 5L, and 20L water can & bottle orders or instant doorstep support.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-xs h-56 sm:h-64 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl group">
              <img 
                src="/images/contact-hero.jpg" 
                alt="Hydration Showcase" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-3 flex flex-col justify-end">
                <span className="text-[10px] font-black uppercase text-amber-400">Pure Hydration</span>
                <p className="text-xs font-black text-white">Coimbatore Customer Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTEGRATED SERVICE AREAS & PINCODE CHECKER SECTION */}
      <div className="bg-gradient-to-br from-slate-950 via-ocean-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 space-y-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyanGlow-500/20 text-cyanGlow-300 border border-cyanGlow-500/30">
            <Truck className="w-3.5 h-3.5 text-cyanGlow-400" /> Coimbatore Sungam Branch Network
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Coimbatore Delivery Service Areas</h2>
          <p className="text-slate-200 text-sm font-bold">
            Enter your Coimbatore pincode or area name below to check delivery lead time.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Pincode or Area (e.g. 641045, Sungam, RS Puram, Peelamedu, Gandhipuram)"
            value={pincodeQuery}
            onChange={(e) => setPincodeQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 text-sm rounded-2xl bg-slate-900 border-2 border-slate-700 text-white font-extrabold placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 focus:outline-none shadow-inner"
          />
        </div>

        {/* Results grid */}
        <div className="max-w-4xl mx-auto">
          {areaLoading ? (
            <p className="text-center py-4 text-amber-400 font-black text-sm">Searching Coimbatore delivery network...</p>
          ) : areas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {areas.map((area, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900 p-4 rounded-2xl border-2 border-slate-800 space-y-2 hover:border-amber-400 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-0.5 rounded-md">
                      {area.pincode}
                    </span>
                    <span className="text-xs text-amber-300 font-black">{area.zone}</span>
                  </div>
                  <p className="text-sm font-bold text-white">{area.areaName}</p>
                  <div className="pt-1 flex items-center justify-between text-xs">
                    <span className="text-cyanGlow-300 font-medium flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3 text-cyanGlow-400" /> {area.deliveryTime}
                    </span>
                    <button
                      onClick={onOpenOrder}
                      className="bg-gradient-to-r from-ocean-600 to-sapphire-600 hover:from-ocean-500 hover:to-sapphire-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg transition"
                    >
                      Order Can
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 space-y-2 bg-gold-500/10 rounded-2xl border border-gold-500/30 p-4 text-gold-200 text-xs">
              <ShieldAlert className="w-6 h-6 mx-auto text-gold-400" />
              <p className="font-bold">No exact match for "{pincodeQuery}"</p>
              <p>We deliver across all Coimbatore zones. Call +91 99949 19151 for direct delivery.</p>
            </div>
          )}
        </div>

      </div>

      {/* Main Grid: Info + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-300 shadow-xl space-y-5">
            <div className="flex justify-between items-center border-b-2 border-slate-200 pb-3">
              <h3 className="text-xl font-black text-slate-950">Branch Office Details</h3>
              <span className="text-xs font-black text-slate-950 bg-amber-400 px-3 py-1 rounded-lg border-2 border-amber-500 shadow-sm uppercase tracking-wider">
                Suvarna Traders
              </span>
            </div>

            <div className="space-y-5 text-sm text-slate-900 font-bold">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-800 border-2 border-blue-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <p className="font-black text-slate-950 text-base">Branch Office Address</p>
                  <p className="text-slate-900 font-bold text-sm mt-0.5">No.37, Indira Nagar, Sungam By-Pass Road, Sungam, Cbe - 45 (Coimbatore - 641045)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-slate-950 border-2 border-amber-400 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <p className="font-black text-slate-950 text-base">GSTIN Registration</p>
                  <p className="text-slate-950 font-mono font-black text-sm bg-amber-400 px-3 py-1 rounded-lg border-2 border-amber-500 mt-1 inline-block shadow-sm">33CAHPP5553L1ZB</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-800 border-2 border-blue-300 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <p className="font-black text-slate-950 text-base">Customer Care Helplines</p>
                  <p className="text-blue-700 font-black text-base">+91 99949 19151</p>
                  <p className="text-blue-700 font-black text-base">+91 97903 70924</p>
                  <p className="text-slate-900 font-black text-xs mt-0.5 bg-slate-100 px-2 py-0.5 rounded inline-block border border-slate-300">Landline: 0422 4919151</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-slate-950 border-2 border-amber-400 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <p className="font-black text-slate-950 text-base">Official Email</p>
                  <p className="text-slate-900 font-black text-sm sm:text-base">sarveshenterprises2020@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick WhatsApp Banner */}
          <div className="bg-slate-950 text-white p-6 rounded-3xl border-2 border-slate-900 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber-400">Customer Care Desk</p>
              <h4 className="text-xl font-black text-white">Chat on WhatsApp</h4>
              <p className="text-xs text-slate-200 font-bold">99949 19151 / 97903 70924</p>
            </div>
            <a
              href="https://wa.me/919994919151?text=Hi%20Success%20Aqua%20Green%20Suvarna%20Traders,%20I%20have%20an%20enquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-3 rounded-xl shadow-md transition shrink-0 flex items-center gap-1.5 uppercase tracking-wider border-2 border-amber-500"
            >
              <MessageSquare className="w-4 h-4 fill-current text-slate-950" /> WhatsApp Direct
            </a>
          </div>
        </div>

        {/* Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-300 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-950 mb-1 border-b-2 border-slate-200 pb-3">Send Us an Enquiry</h3>
          <p className="text-xs sm:text-sm text-slate-800 font-bold mb-6">Suvarna Traders team responds to all online messages within 30 minutes.</p>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 border-2 border-green-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-950">Message Received!</h4>
              <p className="text-sm text-slate-900 font-bold max-w-md mx-auto">
                Thank you <strong className="text-slate-950 font-black">{formData.name}</strong>. Suvarna Traders customer care will call you at <strong className="text-blue-700 font-black">{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', enquiryType: 'General Enquiry', subject: '', message: '' }); }}
                className="bg-slate-950 hover:bg-slate-900 text-white font-black text-xs px-6 py-3.5 rounded-xl shadow transition uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border-2 border-rose-300 rounded-xl text-xs text-rose-900 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9994919151"
                    className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarveshenterprises2020@gmail.com"
                    className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Enquiry Category</label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  >
                    <option value="Purified Water Can Delivery">Purified Water Can Delivery (20L / 5L)</option>
                    <option value="Function & Marriage Bottle Order">Function & Marriage Bottle Order (300ml, 500ml, 1L, 2L)</option>
                    <option value="Manufactured Empty Cans & Bottles">Manufactured Empty Cans & Bottles</option>
                    <option value="Corporate Monthly Subscription">Corporate Monthly Subscription</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Brief summary of your request"
                  className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Your Message *</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your address, bottle/can sizes needed, or function date here..."
                  className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-4 rounded-xl shadow-xl transition text-base flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-amber-500 cursor-pointer"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-5 h-5" />}
                Submit Online Enquiry
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Embedded Google Map Section (Sungam By-Pass Road, Coimbatore - 641045) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-ocean-600" /> Suvarna Traders Location (Indira Nagar, Sungam By-Pass Rd, Coimbatore - 641045)
        </h3>
        <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
          <iframe 
            title="Suvarna Traders Success Aqua Green Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.472890184496!2d76.9800!3d10.9900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU5JzI0LjAiTiA3NsKwNTgnNDguMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen="" 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

    </div>
  );
}
