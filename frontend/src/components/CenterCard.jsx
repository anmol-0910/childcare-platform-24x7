import React from 'react';
import { MapPin, ShieldCheck, Clock, Star, Phone, Eye, Scale } from 'lucide-react';

export default function CenterCard({ center, onSelect, onCompareToggle, isCompared }) {
  const slotsLeft = Math.max(0, center.capacity - center.enrolled);
  const utilization = Math.min(100, Math.round((center.enrolled / center.capacity) * 100));

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl border border-slate-100 overflow-hidden flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 group">
      <div>
        {/* Center Photo Header with Overlays */}
        <div className="relative h-52 overflow-hidden bg-slate-200">
          <img
            src={center.image || 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80'}
            alt={center.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {center.is24x7 && (
              <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow flex items-center gap-1">
                <Clock className="w-3 h-3" /> 24×7 & NIGHT CARE
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <span className="bg-emerald-500 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          </div>

          {/* Bottom Title Overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h3 className="font-extrabold text-lg leading-tight drop-shadow">{center.name}</h3>
            <div className="flex items-center justify-between text-xs text-slate-200 mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-300" /> {center.location}
              </span>
              <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full font-bold text-amber-300 flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300" /> {center.rating} ({center.reviewsCount || 85})
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Shift & Age Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {center.shifts.map((s) => (
              <span key={s} className="bg-teal-50 text-[#0f5a55] border border-teal-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {s} Shift
              </span>
            ))}
            {center.ageGroups.map((a) => (
              <span key={a} className="bg-rose-50 text-rose-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {a}
              </span>
            ))}
          </div>

          {/* Interactive Pricing Boxes */}
          <div className="grid grid-cols-3 gap-2 bg-[#f3faf9] p-3 rounded-2xl border border-teal-100 text-center mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Hourly</p>
              <p className="text-sm font-black text-slate-800">₹{center.pricing.hourly}</p>
            </div>
            <div className="border-x border-teal-200">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Daily</p>
              <p className="text-sm font-black text-slate-800">₹{center.pricing.daily}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-teal-700 uppercase">Monthly</p>
              <p className="text-sm font-black text-[#0f5a55]">₹{center.pricing.monthly}</p>
            </div>
          </div>

          {/* Live Slot Capacity Bar */}
          <div className="flex justify-between text-xs font-extrabold text-slate-600 mb-1.5">
            <span>Real-Time Slot Availability</span>
            <span className={slotsLeft > 5 ? 'text-emerald-600' : 'text-rose-600'}>
              {slotsLeft} / {center.capacity} Slots Open
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
            <div
              className="bg-gradient-to-r from-[#0f5a55] to-teal-400 h-full transition-all duration-500"
              style={{ width: `${utilization}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 pb-5 pt-0 flex gap-2">
        <button
          onClick={() => onCompareToggle(center)}
          className={`px-3 py-2.5 rounded-xl text-xs font-extrabold border transition flex items-center gap-1 ${
            isCompared
              ? 'bg-amber-100 border-amber-400 text-amber-900'
              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
          title="Compare Center"
        >
          <Scale className="w-4 h-4" /> {isCompared ? 'Comparing' : 'Compare'}
        </button>

        <button
          onClick={() => onSelect(center)}
          className="flex-1 bg-[#0f5a55] hover:bg-[#0a413d] text-white font-extrabold py-2.5 rounded-xl text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 transition"
        >
          <Eye className="w-4 h-4" /> View Gallery & Book Slot
        </button>
      </div>
    </div>
  );
}