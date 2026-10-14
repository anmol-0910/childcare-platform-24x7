import React, { useState } from 'react';
import { X, ShieldAlert, Key } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In production, this sends credentials to your secure /api/admin/login endpoint
    // For demo purposes, we will authenticate the admin directly
    if (email === 'admin@littlesteps.com' && password === 'admin123') {
      onAuthSuccess({
        name: 'System Administrator',
        email: email,
        role: 'admin',
        mode: 'login'
      });
    } else {
      alert('Invalid admin credentials. (Try: admin@littlesteps.com / admin123)');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-5">
          <div className="flex items-center gap-2 text-rose-500">
            <ShieldAlert className="w-5 h-5" />
            <span className="font-black tracking-wide uppercase text-sm">Secure Admin Portal</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-400 mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@littlesteps.com"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-400 mb-1">Passcode</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3 rounded-xl flex items-center justify-center gap-2 transition"
          >
            <Key className="w-4 h-4" /> Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}