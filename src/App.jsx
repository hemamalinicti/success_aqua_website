import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import OrderModal from './components/OrderModal';
import CallbackModal from './components/CallbackModal';
import WaterDropletsBackground from './components/WaterDropletsBackground';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import EventBooking from './pages/EventBooking';
import Contact from './pages/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('20 Litre Premium Water Can (Filled)');
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  const handleOpenOrder = (productName = '20 Litre Premium Water Can (Filled)') => {
    setSelectedProduct(productName);
    setIsOrderOpen(true);
  };

  const handleOpenCallback = () => {
    setIsCallbackOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-50/90 via-cyan-50/70 to-blue-50/80 text-slate-800 selection:bg-cyan-500 selection:text-white relative">
      {/* Falling Water Droplets Animation */}
      <WaterDropletsBackground />
      
      {/* Persistent Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenOrder={handleOpenOrder}
        onOpenCallback={handleOpenCallback}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 relative z-20">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab} 
            onOpenOrder={handleOpenOrder} 
            onOpenCallback={handleOpenCallback} 
          />
        )}
        {activeTab === 'about' && (
          <About 
            onOpenOrder={handleOpenOrder} 
            onOpenCallback={handleOpenCallback} 
          />
        )}
        {activeTab === 'products' && (
          <Products 
            onOpenOrder={handleOpenOrder} 
            onOpenCallback={handleOpenCallback} 
          />
        )}
        {activeTab === 'event-booking' && (
          <EventBooking 
            onOpenOrder={handleOpenOrder} 
            onOpenCallback={handleOpenCallback} 
          />
        )}
        {activeTab === 'contact' && (
          <Contact 
            onOpenOrder={handleOpenOrder} 
            onOpenCallback={handleOpenCallback} 
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenOrder={handleOpenOrder}
        onOpenCallback={handleOpenCallback}
      />

      {/* Floating Action Buttons */}
      <FloatingWidgets 
        onOpenOrder={handleOpenOrder} 
      />

      {/* Popup Modals */}
      <OrderModal 
        isOpen={isOrderOpen} 
        onClose={() => setIsOrderOpen(false)} 
        selectedProductDefault={selectedProduct}
      />

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
      />

    </div>
  );
}
