import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('parent');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthSuccess({
      name: name || email.split('@')[0],
      email,
      password,
      role,
      mode
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <div className="flex gap-4">
            <button
              onClick={() => setMode('login')}
              className={`pb-2 text-sm font-bold ${
                mode === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`pb-2 text-sm font-bold ${
                mode === 'register' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'
              }`}
            >
              Register
            </button>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-bold uppercase text-slate-600 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border rounded-xl px-3.5 py-2"
              />
            </div>
          )}

          <div>
            <label className="block font-bold uppercase text-slate-600 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border rounded-xl px-3.5 py-2"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-600 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border rounded-xl px-3.5 py-2"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-600 mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-xl px-3.5 py-2 bg-white"
            >
              <option value="parent">Parent (Search & Book)</option>
              <option value="provider">Childcare Provider (Manage Center)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition"
          >
            {mode === 'login' ? 'Login to Account' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}