import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, MapPin, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function UserAuthModal({ isOpen, onClose, onSuccess, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    pincode: '641045'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const fillDemoUser = () => {
    setMode('login');
    setFormData({
      ...formData,
      email: 'customer@gmail.com',
      password: 'password123'
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/api/users/login' : '/api/users/register';
      const bodyPayload = mode === 'login' 
        ? { emailOrPhone: formData.email || formData.phone, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        localStorage.setItem('customerToken', data.token);
        localStorage.setItem('customerUser', JSON.stringify(data.user));
        if (onSuccess) onSuccess(data.user);
        onClose();
      } else {
        setError(data.message || (mode === 'login' ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.'));
      }
    } catch (err) {
      setError('Connection error. Could not connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-slate-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-tr from-cyanGlow-500 to-sapphire-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyanGlow-500/20">
            <User className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' 
              ? 'Sign in to order water cans & track live delivery' 
              : 'Register to place instant orders & get doorstep delivery'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Priya Sundaram"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              {mode === 'login' ? 'Email or Phone Number *' : 'Email Address *'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type={mode === 'login' ? 'text' : 'email'}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={mode === 'login' ? 'Enter email or 10-digit phone' : 'name@example.com'}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Phone Number (Coimbatore Delivery) *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Password *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter account password"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none"
                required
              />
            </div>
          </div>

          {mode === 'register' && (
            <>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Delivery Address *</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House/Flat No, Street Name, Area"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2.5 pl-9 pr-3 text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="641045"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2.5 px-3 text-white outline-none font-mono"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyanGlow-500 to-sapphire-600 hover:from-cyanGlow-400 hover:to-sapphire-500 text-white font-bold py-3 rounded-xl transition text-sm shadow-glow-cyan flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Sign In & Continue' : 'Create Account & Order')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
          <span className="text-slate-400">
            {mode === 'login' ? "Don't have an account?" : "Already registered?"}
          </span>
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'register' : 'login');
              setError('');
            }}
            className="text-cyanGlow-300 font-bold hover:underline"
          >
            {mode === 'login' ? 'Create New Account' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
