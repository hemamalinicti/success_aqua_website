import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, User, LogOut, Package, ShoppingBag, PhoneCall, 
  PartyPopper, Mail, Plus, Edit2, Trash2, CheckCircle2, Clock, 
  AlertCircle, DollarSign, TrendingUp, RefreshCw, Eye, Search, Sparkles, Building2, Check, X
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  
  // Login Form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Tab: 'orders' | 'callbacks' | 'events' | 'contact' | 'products'
  const [activeTab, setActiveTab] = useState('orders');

  // Overview Stats
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalRevenue: 0,
    pendingCallbacks: 0,
    totalEventBookings: 0,
    totalEnquiries: 0,
    totalProducts: 0
  });

  // Data Arrays
  const [orders, setOrders] = useState([]);
  const [callbacks, setCallbacks] = useState([]);
  const [events, setEvents] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [products, setProducts] = useState([]);

  // General Loading & Filter
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState(null); // null | product object | { isNew: true }
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Purified Water',
    unitPrice: 80,
    price: '₹80',
    gstNote: '+ 18% GST',
    subscriptionPrice: '',
    ideal: 'Residences & Offices',
    image: '/images/can-20l.png',
    popular: false,
    inStock: true
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const storedUser = localStorage.getItem('adminUser');
    if (token) {
      setIsAuthenticated(true);
      if (storedUser) setAdminUser(JSON.parse(storedUser));
      fetchDashboardData();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.admin));
        setIsAuthenticated(true);
        setAdminUser(data.admin);
        fetchDashboardData();
      } else {
        setLoginError(data.message || 'Login failed. Invalid username or password.');
      }
    } catch (err) {
      setLoginError('Server error. Could not connect to backend API.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch Stats
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      // Fetch Orders
      const ordersRes = await fetch('/api/orders');
      const ordersData = await ordersRes.json();
      if (ordersData.success) setOrders(ordersData.data);

      // Fetch Callbacks
      const callbacksRes = await fetch('/api/callbacks');
      const callbacksData = await callbacksRes.json();
      if (callbacksData.success) setCallbacks(callbacksData.data);

      // Fetch Events
      const eventsRes = await fetch('/api/events');
      const eventsData = await eventsRes.json();
      if (eventsData.success) setEvents(eventsData.data);

      // Fetch Enquiries
      const enquiriesRes = await fetch('/api/contact');
      const enquiriesData = await enquiriesRes.json();
      if (enquiriesData.success) setEnquiries(enquiriesData.data);

      // Fetch Products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();
      if (productsData.success) setProducts(productsData.data);

    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Status Updaters
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map(o => o._id === orderId ? { ...o, status } : o));
        fetchDashboardData();
      }
    } catch (e) {
      alert('Failed to update status.');
    }
  };

  const updateCallbackStatus = async (callbackId, status) => {
    try {
      const res = await fetch(`/api/admin/callbacks/${callbackId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setCallbacks(callbacks.map(c => c._id === callbackId ? { ...c, status } : c));
        fetchDashboardData();
      }
    } catch (e) {
      alert('Failed to update callback status.');
    }
  };

  const updateEventStatus = async (eventId, status) => {
    try {
      const res = await fetch(`/api/admin/events/${eventId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setEvents(events.map(ev => ev._id === eventId ? { ...ev, status } : ev));
        fetchDashboardData();
      }
    } catch (e) {
      alert('Failed to update event status.');
    }
  };

  // Product CRUD Handlers
  const handleOpenProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        category: product.category || 'Purified Water',
        unitPrice: product.unitPrice || 80,
        price: product.price || `₹${product.unitPrice}`,
        gstNote: product.gstNote || '+ 18% GST',
        subscriptionPrice: product.subscriptionPrice || '',
        ideal: product.ideal || 'Residences & Offices',
        image: product.image || '/images/can-20l.png',
        popular: product.popular || false,
        inStock: product.inStock !== undefined ? product.inStock : true
      });
    } else {
      setEditingProduct({ isNew: true });
      setProductForm({
        name: '',
        category: 'Purified Water',
        unitPrice: 80,
        price: '₹80',
        gstNote: '+ 18% GST (₹94.40 Total)',
        subscriptionPrice: '',
        ideal: 'Residences & Offices',
        image: '/images/can-20l.png',
        popular: false,
        inStock: true
      });
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || productForm.unitPrice === '') {
      alert('Please provide Product Name and Unit Price.');
      return;
    }

    const payload = {
      ...productForm,
      unitPrice: Number(productForm.unitPrice),
      price: `₹${productForm.unitPrice}`
    };

    try {
      if (editingProduct && editingProduct._id) {
        // Update
        const res = await fetch(`/api/products/${editingProduct._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setEditingProduct(null);
          fetchDashboardData();
        }
      } else {
        // Create
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          setEditingProduct(null);
          fetchDashboardData();
        }
      }
    } catch (e) {
      alert('Error saving product.');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product from the inventory?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchDashboardData();
    } catch (e) {
      alert('Failed to delete product.');
    }
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyanGlow-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sapphire-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyanGlow-500 to-sapphire-600 p-0.5 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyanGlow-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-cyanGlow-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">SUCCESS AQUA GREEN</h1>
            <p className="text-xs text-cyanGlow-400 font-bold uppercase tracking-wider mt-1">Suvarna Traders Admin Portal</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Admin Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-3 pl-10 pr-4 text-white text-sm outline-none transition"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-cyanGlow-500 to-sapphire-600 hover:from-cyanGlow-400 hover:to-sapphire-500 text-white font-bold py-3.5 rounded-xl transition text-sm shadow-glow-cyan flex items-center justify-center gap-2 cursor-pointer"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Dashboard Main View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-cyanGlow-500/10 border border-cyanGlow-500/30 text-cyanGlow-300 rounded-full text-xs font-bold uppercase tracking-wider">
              Suvarna Traders Control Panel
            </span>
            <span className="text-xs text-slate-500">GSTIN: 33CAHPP5553L1ZB</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1">Backend Management & Admin Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl transition flex items-center gap-2 text-xs font-medium"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyanGlow-400' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-xl transition flex items-center gap-2 text-xs font-bold"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8">
        
        {/* Metric Cards Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">₹{stats.totalRevenue.toLocaleString('en-IN')}</p>
            <p className="text-[11px] text-emerald-400 mt-1 font-semibold">Live Calculated Sales</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>Water Can Orders</span>
              <ShoppingBag className="w-4 h-4 text-cyanGlow-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{stats.totalOrders}</p>
            <p className="text-[11px] text-cyanGlow-400 mt-1 font-semibold">{stats.pendingOrders} Pending Dispatch</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>Callback Requests</span>
              <PhoneCall className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{stats.pendingCallbacks}</p>
            <p className="text-[11px] text-amber-400 mt-1 font-semibold">Requires Action</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
              <span>Event Bookings</span>
              <PartyPopper className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-2">{stats.totalEventBookings}</p>
            <p className="text-[11px] text-purple-400 mt-1 font-semibold">Wedding & Bulk Functions</p>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex border-b border-slate-800 mb-6 gap-2 overflow-x-auto pb-2">
          {[
            { id: 'orders', label: `Water Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'products', label: `Products & Prices (${products.length})`, icon: Package },
            { id: 'callbacks', label: `Callbacks (${callbacks.length})`, icon: PhoneCall },
            { id: 'events', label: `Event Bookings (${events.length})`, icon: PartyPopper },
            { id: 'contact', label: `Enquiries (${enquiries.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-xs transition shrink-0 ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyanGlow-500 to-sapphire-600 text-white shadow-glow-cyan' 
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders Management */}
        {activeTab === 'orders' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-cyanGlow-400" /> Water Can & Bottle Orders
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Order ID & Date</th>
                    <th className="py-3.5 px-4">Customer Details</th>
                    <th className="py-3.5 px-4">Product & Qty</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Slot</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                        No orders registered yet. New customer orders will appear here automatically.
                      </td>
                    </tr>
                  ) : (
                    orders.map((o) => (
                      <tr key={o._id} className="hover:bg-slate-800/40 transition">
                        <td className="py-4 px-4 font-mono">
                          <span className="font-bold text-cyanGlow-300 block">{o.orderId}</span>
                          <span className="text-[10px] text-slate-500">{new Date(o.createdAt).toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-white">{o.name}</p>
                          <p className="text-slate-400 font-mono">{o.phone}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{o.address} ({o.pincode})</p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-200">{o.product}</span>
                          <span className="text-cyanGlow-400 font-bold block">Qty: {o.quantity} Cans/Cartons</span>
                        </td>
                        <td className="py-4 px-4 font-mono">
                          <span className="font-bold text-emerald-400 text-sm">₹{o.grandTotal}</span>
                          <span className="text-[10px] text-slate-500 block">({o.paymentMode.toUpperCase()})</span>
                        </td>
                        <td className="py-4 px-4 text-slate-400">
                          {o.deliveryTimeSlot}
                        </td>
                        <td className="py-4 px-4">
                          <select
                            value={o.status || 'Pending'}
                            onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:border-cyanGlow-400 outline-none"
                          >
                            <option value="Pending">🟡 Pending</option>
                            <option value="Confirmed">🔵 Confirmed</option>
                            <option value="Out for Delivery">🚚 Out for Delivery</option>
                            <option value="Delivered">🟢 Delivered</option>
                            <option value="Cancelled">🔴 Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Products & Price Manager */}
        {activeTab === 'products' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-cyanGlow-400" /> Inventory & Price Manager
                </h2>
                <p className="text-xs text-slate-400 mt-1">Update prices, stock status, or add new water bottle/can items directly to the live store.</p>
              </div>
              <button
                onClick={() => handleOpenProductModal()}
                className="px-4 py-2.5 bg-cyanGlow-500 hover:bg-cyanGlow-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 transition shadow-glow-cyan"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p._id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-cyanGlow-500/50 transition">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-[10px] font-bold text-cyanGlow-400 uppercase tracking-widest px-2 py-0.5 bg-cyanGlow-500/10 rounded-full">
                        {p.category}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.inStock ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{p.name}</h3>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-emerald-400">₹{p.unitPrice}</span>
                      <span className="text-xs text-slate-500 font-mono">/ Unit Price</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{p.gstNote}</p>
                    <p className="text-xs text-slate-500 italic mb-4">Target: {p.ideal}</p>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleOpenProductModal(p)}
                      className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyanGlow-300 font-bold py-2 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5" /> Edit Price & Info
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p._id)}
                      className="px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-xs transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Callbacks */}
        {activeTab === 'callbacks' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PhoneCall className="w-5 h-5 text-amber-400" /> Quick Callback Requests
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Date & Time</th>
                    <th className="py-3.5 px-4">Customer Name</th>
                    <th className="py-3.5 px-4">Phone Number</th>
                    <th className="py-3.5 px-4">Preferred Slot</th>
                    <th className="py-3.5 px-4">Action & Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {callbacks.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-slate-500 text-sm">
                        No callback requests registered.
                      </td>
                    </tr>
                  ) : (
                    callbacks.map((c) => (
                      <tr key={c._id} className="hover:bg-slate-800/40 transition">
                        <td className="py-4 px-4 text-slate-500 font-mono">
                          {new Date(c.createdAt).toLocaleString()}
                        </td>
                        <td className="py-4 px-4 font-bold text-white">{c.name}</td>
                        <td className="py-4 px-4 font-mono font-bold text-amber-400">{c.phone}</td>
                        <td className="py-4 px-4 text-slate-300">{c.preferredTime}</td>
                        <td className="py-4 px-4">
                          <select
                            value={c.status || 'Pending'}
                            onChange={(e) => updateCallbackStatus(c._id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:border-amber-400 outline-none"
                          >
                            <option value="Pending">🟡 Pending Call</option>
                            <option value="Contacted">🔵 Contacted Customer</option>
                            <option value="Closed">🟢 Closed / Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Event Bookings */}
        {activeTab === 'events' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-purple-400" /> Mass Function & Wedding Bookings
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Booking ID</th>
                    <th className="py-3.5 px-4">Organizer Details</th>
                    <th className="py-3.5 px-4">Event Type & Date</th>
                    <th className="py-3.5 px-4">Guests & Items</th>
                    <th className="py-3.5 px-4">Grand Total</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-8 text-center text-slate-500 text-sm">
                        No mass event bookings registered yet.
                      </td>
                    </tr>
                  ) : (
                    events.map((ev) => (
                      <tr key={ev._id} className="hover:bg-slate-800/40 transition">
                        <td className="py-4 px-4 font-mono font-bold text-purple-300">{ev.bookingId}</td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-white">{ev.name}</p>
                          <p className="text-slate-400 font-mono">{ev.phone}</p>
                          <p className="text-[11px] text-slate-400">{ev.location}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-white">{ev.eventType}</p>
                          <p className="text-xs text-cyanGlow-300 font-semibold">{ev.eventDate}</p>
                        </td>
                        <td className="py-4 px-4">
                          <p className="text-purple-300 font-bold">{ev.guestCount} Guests</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{(ev.neededItems || []).join(', ')}</p>
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-emerald-400 text-sm">₹{ev.grandTotal}</td>
                        <td className="py-4 px-4">
                          <select
                            value={ev.status || 'Confirmed'}
                            onChange={(e) => updateEventStatus(ev._id, e.target.value)}
                            className="bg-slate-950 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:border-purple-400 outline-none"
                          >
                            <option value="Pending">🟡 Pending</option>
                            <option value="Confirmed">🔵 Confirmed</option>
                            <option value="Dispatched">🚚 Dispatched</option>
                            <option value="Completed">🟢 Completed</option>
                            <option value="Cancelled">🔴 Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Contact Enquiries */}
        {activeTab === 'contact' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" /> General Support Enquiries
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4">Sender Info</th>
                    <th className="py-3.5 px-4">Subject & Type</th>
                    <th className="py-3.5 px-4">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-500 text-sm">
                        No support messages or enquiries received.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((enq) => (
                      <tr key={enq._id} className="hover:bg-slate-800/40 transition">
                        <td className="py-4 px-4 text-slate-500 font-mono">
                          {new Date(enq.createdAt).toLocaleString()}
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-white">{enq.name}</p>
                          <p className="text-slate-400 font-mono">{enq.phone}</p>
                          {enq.email && <p className="text-[11px] text-slate-400">{enq.email}</p>}
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-cyanGlow-300 font-bold block">{enq.enquiryType}</span>
                          <span className="text-slate-300">{enq.subject || 'N/A'}</span>
                        </td>
                        <td className="py-4 px-4 text-slate-300 leading-relaxed max-w-md">
                          {enq.message}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Product Edit / Create Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-slate-200 shadow-2xl relative">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-cyanGlow-400" />
                {editingProduct.isNew ? 'Add New Product to Inventory' : 'Edit Product & Price'}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-white p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl p-3 text-white text-sm outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Unit Price (₹)</label>
                  <input
                    type="number"
                    value={productForm.unitPrice}
                    onChange={(e) => setProductForm({ ...productForm, unitPrice: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl p-3 text-white text-sm outline-none font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl p-3 text-white text-sm outline-none"
                  >
                    <option value="Purified Water Cans">Purified Water Cans</option>
                    <option value="Packaged Water Bottles">Packaged Water Bottles</option>
                    <option value="Empty Can Manufacturing">Empty Can Manufacturing</option>
                    <option value="Empty Bottle Manufacturing">Empty Bottle Manufacturing</option>
                    <option value="Accessories & Fittings">Accessories & Fittings</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">GST & Tax Note</label>
                <input
                  type="text"
                  value={productForm.gstNote}
                  onChange={(e) => setProductForm({ ...productForm, gstNote: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Usage / Ideal For</label>
                <input
                  type="text"
                  value={productForm.ideal}
                  onChange={(e) => setProductForm({ ...productForm, ideal: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl p-3 text-white outline-none"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="w-4 h-4 accent-cyanGlow-500 rounded"
                  />
                  <span className="text-white font-medium">In Stock</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.popular}
                    onChange={(e) => setProductForm({ ...productForm, popular: e.target.checked })}
                    className="w-4 h-4 accent-cyanGlow-500 rounded"
                  />
                  <span className="text-white font-medium">Featured / Popular Tag</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-cyanGlow-500 to-sapphire-600 hover:from-cyanGlow-400 hover:to-sapphire-500 text-white font-bold py-3 rounded-xl transition shadow-glow-cyan"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
