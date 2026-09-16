import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import OrderModal from './components/OrderModal';
import CallbackModal from './components/CallbackModal';
import UserAuthModal from './components/UserAuthModal';
import WaterDropletsBackground from './components/WaterDropletsBackground';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import EventBooking from './pages/EventBooking';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import MyOrders from './pages/MyOrders';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('20 Litre Premium Water Can (Filled)');
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('customerUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse customerUser:', e);
      }
    }
  }, []);

  const handleOpenOrder = (productName = '20 Litre Premium Water Can (Filled)') => {
    if (!currentUser) {
      setIsAuthOpen(true);
    } else {
      setSelectedProduct(productName);
      setIsOrderOpen(true);
    }
  };

  const handleOpenCallback = () => {
    setIsCallbackOpen(true);
  };

  const handleUserLogout = () => {
    localStorage.removeItem('customerToken');
    localStorage.removeItem('customerUser');
    setCurrentUser(null);
    setActiveTab('home');
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
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleUserLogout}
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
        {activeTab === 'my-orders' && (
          <MyOrders 
            user={currentUser}
            onOpenOrder={handleOpenOrder}
            onRequireAuth={() => setIsAuthOpen(true)}
          />
        )}
        {activeTab === 'admin' && (
          <AdminDashboard />
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
        currentUser={currentUser}
        onRequireAuth={() => {
          setIsOrderOpen(false);
          setIsAuthOpen(true);
        }}
      />

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
      />

      <UserAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
          setIsOrderOpen(true);
        }}
      />

    </div>
  );
}
