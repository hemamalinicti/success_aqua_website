import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md sm:max-w-lg w-full p-4 sm:p-6 text-slate-100 shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-3 shrink-0">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyanGlow-500 to-sapphire-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md shadow-cyanGlow-500/20">
            <User className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {mode === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {mode === 'login' 
              ? 'Sign in to order water cans & track live delivery' 
              : 'Register to place instant orders & get doorstep delivery'}
          </p>
        </div>

        {error && (
          <div className="mb-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2 shrink-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
            {mode === 'register' ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Full Name *</label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Priya Sundaram"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2 pl-8 pr-2.5 text-xs text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2 pl-8 pr-2.5 text-xs text-white outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2 pl-8 pr-2.5 text-xs text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Password *</label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Set account password"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2 pl-8 pr-2.5 text-xs text-white outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Delivery Address *</label>
                    <div className="relative">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House/Flat No, Street Name, Area"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2 pl-8 pr-2.5 text-xs text-white outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block font-semibold text-slate-300 mb-1 text-[11px]">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="641045"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2 px-2.5 text-xs text-white outline-none font-mono"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email or Phone Number *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email or 10-digit phone"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white outline-none"
                      required
                    />
                  </div>
                </div>

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
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyanGlow-500 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white outline-none"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyanGlow-500 to-sapphire-600 hover:from-cyanGlow-400 hover:to-sapphire-500 text-white font-bold py-2.5 rounded-xl transition text-xs sm:text-sm shadow-glow-cyan flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {loading ? 'Processing...' : (mode === 'login' ? 'Sign In & Continue' : 'Create Account & Order')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs shrink-0">
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
