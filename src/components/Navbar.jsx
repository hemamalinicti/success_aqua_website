import React, { useState } from 'react';
import { Droplets, Phone, ShoppingCart, Menu, X, Building2, Clock } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenOrder, onOpenCallback }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'products', label: 'Products & Sizes' },
    { id: 'event-booking', label: 'Mass Event Booking' },
    { id: 'contact', label: 'Contact Us & Sungam Hub' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800 text-white shadow-2xl">
      {/* Top Banner Bar - Desktop & Mobile Clean Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-3 sm:px-6 border-b border-slate-800">
        <div className="max-w-[96%] xl:max-w-[1600px] mx-auto flex items-center justify-between gap-2">
          
          {/* Left info */}
          <div className="flex items-center gap-3 truncate">
            <span className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px] sm:text-xs truncate">
              <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> 
              <span className="truncate">SUVARNA TRADERS • GSTIN: 33CAHPP5553L1ZB</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-cyan-300 font-semibold shrink-0">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Sungam, Coimbatore
            </span>
          </div>

          {/* Right Helplines */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button 
              onClick={onOpenCallback}
              className="hidden sm:flex text-amber-300 hover:text-amber-200 underline font-extrabold items-center gap-1 transition text-xs"
            >
              <Phone className="w-3.5 h-3.5" /> Care: 0422 4919151
            </button>
            <a 
              href="tel:+919994919151" 
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full font-black text-[10px] sm:text-xs transition flex items-center gap-1 shadow-md"
            >
              <Phone className="w-3 h-3 fill-current text-slate-950" /> +91 99949 19151
            </a>
          </div>

        </div>
      </div>

      {/* Main Navbar Header */}
      <div className="max-w-[96%] xl:max-w-[1600px] mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand Name */}
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-cyan-400 p-0.5 shadow-md transition duration-300 group-hover:scale-105 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
                <Droplets className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 fill-cyan-400/30" />
              </div>
            </div>
            <div>
              <span className="text-sm sm:text-xl lg:text-2xl font-black tracking-tight text-white block leading-tight whitespace-nowrap">
                SUCCESS AQUA GREEN
              </span>
              <p className="text-[9px] sm:text-xs font-bold tracking-wider text-amber-400 uppercase hidden xs:block">
                SUVARNA TRADERS • COIMBATORE
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900 p-1.5 rounded-full border border-slate-700">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-black transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                      : 'text-slate-100 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenOrder()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              Order Cans / Bottles
            </button>
          </div>

          {/* Mobile Right Action Bar */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => onOpenOrder()}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-md cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-slate-950" /> Order
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-amber-400" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm sm:text-base transition ${
                activeTab === item.id
                  ? 'bg-cyan-500 text-slate-950 border-l-4 border-amber-400 font-black'
                  : 'text-white hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenOrder(); }}
              className="w-full bg-amber-400 text-slate-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 shadow-md text-sm"
            >
              <ShoppingCart className="w-4 h-4" /> Order Water Cans / Bottles
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCallback(); }}
              className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm border border-slate-700"
            >
              <Phone className="w-4 h-4 text-cyan-400" /> Request Helpline Callback
            </button>
            <div className="text-[11px] text-slate-400 font-bold text-center pt-2">
              Suvarna Traders • GSTIN: 33CAHPP5553L1ZB • Sungam, Coimbatore
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

