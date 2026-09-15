import React, { useState } from 'react';
import { 
  PartyPopper, Calendar, Users, Droplets, CheckCircle2, ShieldCheck, 
  CreditCard, QrCode, Banknote, Sparkles, Truck, Calculator, Loader2 
} from 'lucide-react';

export default function EventBooking({ onOpenOrder, onOpenCallback }) {
  const [eventType, setEventType] = useState('Marriage / Wedding Function');
  const [guestCount, setGuestCount] = useState(300);
  const [eventDate, setEventDate] = useState('');
  const [eventVenue, setEventVenue] = useState('');

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    paymentMode: 'upi',
    specialInstructions: ''
  });

  const [loading, setLoading] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const totalLitersNeeded = Math.ceil(guestCount * 1.5);
  const recommended20LCans = Math.ceil(totalLitersNeeded / 20);
  const recommended1LBottles = Math.ceil(guestCount * 1.2);
  const recommendedDispensers = Math.ceil(guestCount / 100);

  const cansCost = recommended20LCans * 65;
  const dispensersCost = recommendedDispensers * 50;
  const subtotal = cansCost + dispensersCost;
  const gstAmount = Math.round(subtotal * 0.18 * 100) / 100;
  const grandTotal = Math.round((subtotal + gstAmount) * 100) / 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !eventDate || !eventVenue) {
      alert('Please fill in Name, Phone, Event Date, and Venue Address.');
      return;
    }

    setLoading(true);

    const bookingPayload = {
      name: contactForm.name,
      phone: contactForm.phone,
      eventType,
      eventDate,
      guestCount,
      location: eventVenue,
      neededItems: [
        `${recommended20LCans} x 20L Water Cans`,
        `${recommendedDispensers} x Dispenser Stands`
      ],
      paymentMode: contactForm.paymentMode,
      subtotal,
      gstAmount,
      grandTotal
    };

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedBooking(data.data);
      }
    } catch (err) {
      setSubmittedBooking({
        eventId: 'SAG-EVT-' + Math.floor(10000 + Math.random() * 90000),
        ...bookingPayload
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 py-8 max-w-[96%] xl:max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
      
      {/* MASS EVENT HERO BANNER WITH BULK CANS IMAGE */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border-2 border-slate-800 shadow-2xl p-6 sm:p-10 lg:p-12">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src="/images/event-bulk-cans.jpg" 
            alt="Bulk Water Cans Event Supply" 
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/50 z-0"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <span className="inline-block text-xs font-black text-slate-950 uppercase tracking-widest bg-amber-400 px-5 py-2 rounded-full border-2 border-amber-500 shadow-md">
              Mass Function & Event Water Management
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Bulk Water Booking for <br />
              <span className="text-cyan-300 font-black">
                Marriages, Festivals & Celebrations in Coimbatore
              </span>
            </h1>
            <p className="text-slate-200 font-semibold text-sm sm:text-base leading-relaxed max-w-2xl">
              Planning a function in Coimbatore? Calculate required water volumes, reserve bulk 20L water cans & dispenser stands, and book with automatic GST billing & instant confirmation.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-full max-w-xs h-56 sm:h-64 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl group">
              <img 
                src="/images/event-bulk-cans.jpg" 
                alt="Bulk Water Cans Stock" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-3 flex flex-col justify-end">
                <span className="text-[10px] font-black uppercase text-amber-400">Suvarna Traders Bulk Fleet</span>
                <p className="text-xs font-black text-white">Event Ready 20L Water Cans</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Main Grid: Calculator + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Interactive Event Requirement Estimator */}
        <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-slate-800 space-y-8">
          
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950">
              <PartyPopper className="w-4 h-4 text-slate-950" /> Event Planner Tool
            </span>
            <h2 className="text-2xl font-black text-white">1. Select Event Parameters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-amber-400 uppercase tracking-wider mb-2">Function / Event Category</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full text-base p-3.5 rounded-xl bg-slate-900 border-2 border-slate-700 text-white font-extrabold focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                <option value="Marriage / Wedding Function">Marriage / Wedding Reception</option>
                <option value="Corporate Annual Meet / Conference">Corporate Annual Meet / Conference</option>
                <option value="Temple / Cultural Festival">Temple / Cultural Festival</option>
                <option value="Birthday & Family Function">Birthday & Family Function</option>
                <option value="Sports Meet & Tournament">Sports Meet & Tournament</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black text-slate-200 uppercase tracking-wider mb-2">
                <span>Expected Number of Attendees / Guests:</span>
                <span className="text-amber-400 text-lg font-black">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-3 rounded-lg bg-slate-800"
              />
              <div className="flex justify-between text-xs text-amber-300 font-black mt-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                <span>50 Guests</span>
                <span>1,000 Guests</span>
                <span>5,000+ Guests</span>
              </div>
            </div>
          </div>

          {/* Recommended Requirement Cards */}
          <div className="bg-slate-900 rounded-2xl p-6 border-2 border-slate-800 space-y-4 shadow-lg">
            <h3 className="text-sm font-black text-amber-400 uppercase tracking-wide flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calculator className="w-5 h-5 text-amber-400" /> Recommended Water & Stand Requirement
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
              <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border-2 border-slate-800 flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs text-slate-300 uppercase font-black tracking-normal leading-tight">Total Water Required</p>
                <p className="text-xl sm:text-2xl font-black text-white mt-1.5">{totalLitersNeeded} Litres</p>
              </div>
              <div className="bg-slate-950 p-3 sm:p-4 rounded-xl border-2 border-slate-800 flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs text-amber-400 uppercase font-black tracking-normal leading-tight">20L Cans Needed</p>
                <p className="text-xl sm:text-2xl font-black text-amber-400 mt-1.5">{recommended20LCans} Cans</p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 bg-slate-950 rounded-xl border-2 border-slate-800 text-xs sm:text-sm text-slate-200 space-y-2 font-bold">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-800 pb-2 gap-1">
                <span className="text-slate-300">1L Bottled Option (Alternative):</span>
                <span className="font-black text-white">{recommended1LBottles} Bottles ({Math.ceil(recommended1LBottles/12)} Boxes)</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center pt-1 gap-1">
                <span className="text-slate-300">Dispenser Stands Needed:</span>
                <span className="font-black text-cyan-300">{recommendedDispensers} Stainless Stands</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Function Booking & Payment Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-3xl border-2 border-slate-300 shadow-xl">
          
          {submittedBooking ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 border-2 border-green-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-black text-slate-950">Event Booking Reserved!</h3>
              
              <div className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-6 text-left text-xs sm:text-sm text-slate-950 space-y-2.5 font-bold">
                <div className="flex justify-between font-black border-b-2 border-slate-300 pb-2 text-base">
                  <span>Booking ID:</span>
                  <span className="text-blue-700 font-black">{submittedBooking.eventId}</span>
                </div>
                <p><strong className="text-slate-950 font-black">Organizer:</strong> {submittedBooking.name} ({submittedBooking.phone})</p>
                <p><strong className="text-slate-950 font-black">Function:</strong> {submittedBooking.eventType} on {submittedBooking.eventDate}</p>
                <p><strong className="text-slate-950 font-black">Venue Address:</strong> {submittedBooking.location}</p>
                <p><strong className="text-slate-950 font-black">Reserved Stock:</strong> {recommended20LCans} x 20L Cans ({guestCount} Guests)</p>
                <p><strong className="text-slate-950 font-black">Payment Choice:</strong> {submittedBooking.paymentMode.toUpperCase()} ({submittedBooking.paymentMode === 'cod' ? 'Pay Cash on Venue Delivery' : 'Paid Online'})</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-900 font-extrabold bg-amber-50 p-3 rounded-xl border border-amber-300">
                Our Coimbatore event delivery team will deliver and setup the cans & dispensers 2 hours before the function start time.
              </p>

              <button
                onClick={() => setSubmittedBooking(null)}
                className="w-full bg-slate-950 hover:bg-slate-900 text-white font-black py-4 rounded-xl transition text-sm shadow-md uppercase tracking-wider"
              >
                Create Another Event Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 border-b-2 border-slate-200 pb-3">
                2. Event Venue & Payment Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Organizer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="e.g. K. Rajasekar"
                    className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="e.g. 9994919151"
                    className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-1.5">Venue Hall / Address (Coimbatore) *</label>
                  <input
                    type="text"
                    required
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    placeholder="Hall Name, Street, Area Landmark"
                    className="w-full text-base p-3.5 rounded-xl border-2 border-slate-300 font-black text-slate-950 placeholder:text-slate-400 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* PAYMENT SELECTION */}
              <div>
                <label className="block text-xs font-black text-slate-950 uppercase tracking-wider mb-2">Select Payment Mode *</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setContactForm({ ...contactForm, paymentMode: 'upi' })}
                    className={`p-3.5 rounded-xl text-xs font-black flex flex-col items-center gap-1.5 border-2 transition ${
                      contactForm.paymentMode === 'upi'
                        ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md scale-[1.02]'
                        : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <QrCode className="w-6 h-6 text-slate-950" />
                    <span>UPI / GPay / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactForm({ ...contactForm, paymentMode: 'card' })}
                    className={`p-3.5 rounded-xl text-xs font-black flex flex-col items-center gap-1.5 border-2 transition ${
                      contactForm.paymentMode === 'card'
                        ? 'bg-blue-700 text-white border-blue-900 shadow-md scale-[1.02]'
                        : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-white" />
                    <span>Card / Netbank</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContactForm({ ...contactForm, paymentMode: 'cod' })}
                    className={`p-3.5 rounded-xl text-xs font-black flex flex-col items-center gap-1.5 border-2 transition ${
                      contactForm.paymentMode === 'cod'
                        ? 'bg-green-600 text-white border-green-800 shadow-md scale-[1.02]'
                        : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                    }`}
                  >
                    <Banknote className="w-6 h-6 text-white" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>
              </div>

              {/* AUTOMATIC GST INVOICE BOX */}
              <div className="bg-slate-950 p-5 rounded-2xl border-2 border-slate-900 text-xs sm:text-sm space-y-2 font-bold text-white shadow-inner">
                <div className="flex justify-between text-slate-300">
                  <span>Mass Event Water Cans ({recommended20LCans} Cans @ ₹65):</span>
                  <span className="font-black text-white text-base">₹{cansCost}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Dispenser Stand Rental ({recommendedDispensers} Stands):</span>
                  <span className="font-black text-white text-base">₹{dispensersCost}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal Amount:</span>
                  <span className="font-black text-white text-base">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-amber-400 font-black pt-2 border-t border-slate-800 text-sm">
                  <span>18% GST (CGST 9% + SGST 9%):</span>
                  <span>+ ₹{gstAmount}</span>
                </div>
                <div className="flex justify-between text-white font-black text-lg pt-2 border-t-2 border-slate-700">
                  <span>Total Payable Invoice:</span>
                  <span className="text-cyan-300 font-black text-xl">₹{grandTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-4 rounded-xl shadow-xl transition text-base flex items-center justify-center gap-2 uppercase tracking-wide border-2 border-amber-500 cursor-pointer"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <PartyPopper className="w-6 h-6" />}
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}



