import React from 'react';
import { MessageSquare, PhoneCall, ShoppingCart } from 'lucide-react';

export default function FloatingWidgets({ onOpenOrder }) {
  const whatsappNumber = "919994919151";
  const whatsappMessage = encodeURIComponent("Hello Suvarna Traders! I would like to order packaged water cans / bottles or empty cans in Coimbatore.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
      {/* High-Contrast Floating Action Dock */}
      <div className="bg-transparent flex flex-col items-center gap-2.5 sm:gap-3">
        
        {/* Quick Order / Cart Button (Icon Only) */}
        <button
          onClick={() => onOpenOrder('20 Litre Premium Water Can (Filled)')}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg border border-amber-500 hover:scale-110 cursor-pointer shrink-0"
          title="Cart / Order Water Cans & Bottles"
          aria-label="Cart / Order"
        >
          <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950" />
        </button>

        {/* WhatsApp Chat Button (Icon Only) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500 hover:bg-emerald-400 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg border border-emerald-400 hover:scale-110 cursor-pointer shrink-0"
          title="WhatsApp Chat (+91 99949 19151)"
          aria-label="WhatsApp Chat"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-200"></span>
            </span>
            <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-current text-white" />
          </div>
        </a>

        {/* Call Directly Phone Button (Icon Only) */}
        <a
          href="tel:+919994919151"
          className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg border border-cyan-300 hover:scale-110 cursor-pointer shrink-0"
          title="Call Now (+91 99949 19151)"
          aria-label="Call Now"
        >
          <PhoneCall className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 animate-pulse" />
        </a>

      </div>
    </div>
  );
}

