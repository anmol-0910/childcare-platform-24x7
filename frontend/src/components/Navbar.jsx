import React from 'react';
import { Calendar, LogOut, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onOpenAuth, onLogout, onQuickBook }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-wrap justify-between items-center gap-4">
        
        {/* Little Steps Custom Brand Logo */}
        <div
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            src="/logo.png" 
            alt="Little Steps" 
            className="h-16 w-auto object-contain group-hover:scale-105 transition" 
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] font-bold text-[#0f5a55]">
          <button
            onClick={() => setActiveTab('explore')}
            className={`hover:text-rose-500 transition ${
              activeTab === 'explore' ? 'text-rose-500 underline underline-offset-8 decoration-2' : ''
            }`}
          >
            Home
          </button>
          <a href="#facilities-section" onClick={() => setActiveTab('explore')} className="hover:text-rose-500 transition">
            Available Facilities ▾
          </a>
          <a href="#centers-section" onClick={() => setActiveTab('explore')} className="hover:text-rose-500 transition">
            24×7 Crèches ▾
          </a>
          <button
            onClick={() => setActiveTab('parent')}
            className={`hover:text-rose-500 transition ${
              activeTab === 'parent' ? 'text-rose-500 underline underline-offset-8 decoration-2' : ''
            }`}
          >
            My Bookings
          </button>
          <button
            onClick={() => setActiveTab('provider')}
            className={`hover:text-rose-500 transition ${
              activeTab === 'provider' ? 'text-rose-500 underline underline-offset-8 decoration-2' : ''
            }`}
          >
            Provider Portal
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`hover:text-rose-500 transition ${
              activeTab === 'admin' ? 'text-rose-500 underline underline-offset-8 decoration-2' : ''
            }`}
          >
            Admin KPIs
          </button>
        </nav>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="bg-teal-50 text-[#0f5a55] border border-teal-200 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> {user.name} ({user.role})
              </span>
              <button
                onClick={onLogout}
                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-xs font-extrabold text-[#0f5a55] border-2 border-[#0f5a55] px-3.5 py-2 rounded-md hover:bg-teal-50 transition"
            >
              Login / Register
            </button>
          )}

          <button
            onClick={onQuickBook}
            className="bg-[#0f5a55] hover:bg-[#0b433f] text-white px-5 py-2.5 rounded-md font-bold text-sm shadow-md hover:shadow-lg flex items-center gap-2 transition transform hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" /> Book Appointment / Slot
          </button>
        </div>
      </div>
    </header>
  );
}