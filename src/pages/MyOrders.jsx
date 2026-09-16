import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Clock, Truck, CheckCircle2, AlertCircle, RefreshCw, 
  PhoneCall, ShieldCheck, MapPin, Package, Calendar
} from 'lucide-react';

export default function MyOrders({ user, onOpenOrder, onRequireAuth }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchMyOrders = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/users/my-orders?phone=${user.phone}&email=${user.email}&userId=${user.id}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        setError('Failed to load your orders.');
      }
    } catch (err) {
      setError('Connection error while fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-slate-950 text-white border-2 border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6">
          <div className="w-16 h-16 bg-slate-900 border-2 border-slate-800 rounded-2xl flex items-center justify-center text-amber-400 mx-auto shadow-xl">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Sign In to Track Your Water Deliveries</h2>
            <p className="text-sm font-bold text-slate-200 max-w-md mx-auto leading-relaxed">
              Please sign in with your phone or email to view live order progress, track delivery status, and view past invoices.
            </p>
          </div>
          <button
            onClick={onRequireAuth}
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-sm shadow-xl hover:scale-105 transition duration-200"
          >
            Sign In / Create Account
          </button>
        </div>
      </div>
    );
  }

  // Progress Steps Helper
  const getStepState = (status, stepName) => {
    const statusOrder = ['Pending', 'Confirmed', 'Out for Delivery', 'Delivered'];
    
    if (status === 'Cancelled') {
      return 'cancelled';
    }

    if (status === 'Delayed' && stepName === 'Out for Delivery') {
      return 'delayed';
    }

    const currentIndex = statusOrder.indexOf(status === 'Delayed' ? 'Out for Delivery' : status);
    const stepIndex = statusOrder.indexOf(stepName);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b-2 border-slate-300 gap-4">
        <div className="space-y-1">
          <span className="inline-block text-xs font-black text-slate-950 uppercase tracking-widest bg-amber-400 px-4 py-1.5 rounded-full border border-amber-500 shadow-sm">
            Customer Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Live Order Tracker & History
          </h1>
          <p className="text-sm font-bold text-slate-800">
            Logged in as <strong className="text-slate-950 font-black">{user.name}</strong> ({user.phone})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchMyOrders}
            className="px-4 py-3 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-2xl border-2 border-slate-800 shadow-lg transition text-xs flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 text-amber-400 ${loading ? 'animate-spin' : ''}`} />
            Refresh Status
          </button>
          <button
            onClick={() => onOpenOrder()}
            className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl text-xs shadow-lg hover:scale-105 transition"
          >
            + New Water Order
          </button>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-slate-950 text-white border-2 border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-5">
          <div className="w-16 h-16 bg-slate-900 border-2 border-slate-800 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-xl">
            <Package className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">No Orders Found Yet</h3>
            <p className="text-sm font-bold text-slate-200 max-w-md mx-auto leading-relaxed">
              You haven't placed any water can or bottle orders with this account yet.
            </p>
          </div>
          <button
            onClick={() => onOpenOrder()}
            className="px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-sm transition shadow-xl hover:scale-105"
          >
            Order Water Cans Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-slate-950 text-white border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
              
              {/* Top Bar info */}
              <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-300 font-black text-lg">{order.orderId}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-200 font-bold text-xs flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-300">
                    Branch: <strong className="text-white font-bold">Suvarna Traders (Sungam)</strong> • GSTIN: <span className="font-mono text-amber-300 font-bold">33CAHPP5553L1ZB</span>
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md border ${
                    order.status === 'Pending' ? 'bg-amber-400 text-slate-950 border-amber-500' :
                    order.status === 'Confirmed' ? 'bg-blue-600 text-white border-blue-500' :
                    order.status === 'Out for Delivery' ? 'bg-cyan-400 text-slate-950 border-cyan-500 animate-pulse' :
                    order.status === 'Delayed' ? 'bg-rose-600 text-white border-rose-500' :
                    order.status === 'Delivered' ? 'bg-emerald-400 text-slate-950 border-emerald-500' :
                    'bg-slate-800 text-slate-200 border-slate-700'
                  }`}>
                    {order.status === 'Pending' && '🟡 Pending Confirmation'}
                    {order.status === 'Confirmed' && '🔵 Order Confirmed'}
                    {order.status === 'Out for Delivery' && '🚚 Out for Delivery'}
                    {order.status === 'Delayed' && '⏳ Dispatch Delayed (En Route)'}
                    {order.status === 'Delivered' && '🟢 Delivered Successfully'}
                    {order.status === 'Cancelled' && '🔴 Order Cancelled'}
                  </span>
                </div>
              </div>

              {/* Progress Steps Visual Bar */}
              {order.status !== 'Cancelled' && (
                <div className="py-4 px-2 bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
                  <div className="relative flex items-center justify-between">
                    
                    {/* Connecting line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-slate-800 -z-0"></div>

                    {[
                      { key: 'Pending', label: 'Order Placed', icon: Clock },
                      { key: 'Confirmed', label: 'Confirmed', icon: CheckCircle2 },
                      { key: 'Out for Delivery', label: order.status === 'Delayed' ? 'Delayed (Traffic)' : 'Out for Delivery', icon: Truck },
                      { key: 'Delivered', label: 'Delivered', icon: ShieldCheck },
                    ].map((step, idx) => {
                      const StepIcon = step.icon;
                      const state = getStepState(order.status, step.key);

                      return (
                        <div key={step.key} className="relative z-10 flex flex-col items-center group">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all border-2 ${
                            state === 'completed' || state === 'active' 
                              ? (state === 'delayed' ? 'bg-rose-600 border-rose-400 text-white shadow-lg' : 'bg-amber-400 border-amber-300 text-slate-950 shadow-lg')
                              : 'bg-slate-950 border-slate-800 text-slate-500'
                          }`}>
                            <StepIcon className="w-5 h-5" />
                          </div>
                          <span className={`text-xs font-black mt-2 whitespace-nowrap ${
                            state === 'active' || state === 'completed' ? 'text-white' : 'text-slate-400'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}

                  </div>
                </div>
              )}

              {/* Order Item Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
                <div className="space-y-1">
                  <p className="text-amber-400 font-black uppercase tracking-wider text-[11px]">Water Product</p>
                  <p className="font-black text-white text-base">{order.product}</p>
                  <p className="text-cyan-300 font-bold text-xs">Quantity: {order.quantity} Cans/Cartons</p>
                </div>

                <div className="space-y-1">
                  <p className="text-amber-400 font-black uppercase tracking-wider text-[11px]">Delivery Address</p>
                  <p className="font-bold text-slate-200 text-xs sm:text-sm flex items-start gap-1">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{order.address} ({order.pincode})</span>
                  </p>
                  <p className="text-slate-300 text-xs font-semibold">Slot: {order.deliveryTimeSlot}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-amber-400 font-black uppercase tracking-wider text-[11px]">Invoice Total</p>
                  <p className="text-2xl font-black text-emerald-400 font-mono">₹{order.grandTotal}</p>
                  <p className="text-slate-300 text-xs font-bold">Payment: {order.paymentMode.toUpperCase()} (Includes 18% GST)</p>
                </div>
              </div>

              {/* Delivery Helpline Banner */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-200 gap-2">
                <span className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                  <Truck className="w-4 h-4 text-amber-400" /> Need delivery assistance? Contact Sungam Hub Executive
                </span>
                <a
                  href="tel:+919994919151"
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 font-black px-4 py-2 rounded-xl hover:text-cyan-200 transition flex items-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4" /> Call +91 99949 19151
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
