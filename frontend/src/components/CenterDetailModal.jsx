import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck } from 'lucide-react';

export default function CenterDetailModal({ center, onClose, onBook }) {
  const [childName, setChildName] = useState('');
  const [phone, setPhone] = useState(''); 
  const [ageGroup, setAgeGroup] = useState(center?.ageGroups?.[0] || 'Toddler');
  const [planType, setPlanType] = useState('Monthly');
  const [shift, setShift] = useState(center?.shifts?.[0] || 'Day');

  if (!center) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onBook({
      centerId: center._id,
      centerName: center.name,
      childName,
      phone,
      ageGroup,
      planType,
      shift,
      status: 'Confirmed'
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold text-slate-900">{center.name}</h3>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              📍 {center.location} • {center.is24x7 ? '24×7 Day & Night Facility' : 'Standard Day Hours'}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <p className="font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-indigo-600" /> Verified Caregiver Profiles
            </p>
            {Array.isArray(center.caregivers) ? (
              center.caregivers.map((cg, idx) => (
                <div key={idx} className="bg-white p-2 rounded-lg border border-slate-200">
                  <p className="font-bold text-slate-900">{cg.name} ({cg.exp})</p>
                  <p className="text-slate-500">{cg.role} • <span className="text-emerald-700 font-semibold">{cg.cert}</span></p>
                </div>
              ))
            ) : (
              <p className="text-slate-600">{center.caregivers}</p>
            )}
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
            <p className="font-bold text-slate-800 uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Safety & Certifications
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Array.isArray(center.safety) ? center.safety : [center.safety]).map((item, idx) => (
                <span key={idx} className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-medium">
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* NEW CODE: Maps & Location API Integration */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <p className="font-bold text-slate-800 text-xs uppercase mb-2 pl-1 flex items-center gap-1.5">
            📍 Center Location Map
          </p>
          <iframe
            title="Center Location"
            width="100%"
            height="180"
            className="rounded-lg border border-slate-200 shadow-sm"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(center.name + ' ' + center.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        </div>
        {/* END NEW CODE */}

        <form onSubmit={handleSubmit} className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 space-y-4">
          <h4 className="font-extrabold text-sm text-indigo-950">Book a Childcare Slot or Subscription Plan</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Child's Name *</label>
              <input
                type="text"
                required
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="e.g. Aarav"
                className="w-full border rounded-lg px-3 py-2 bg-white"
              />
            </div>
            
            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 9876543210"
                className="w-full border rounded-lg px-3 py-2 bg-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Age Group *</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="Infant">Infant (0 - 1.5 yrs)</option>
                <option value="Toddler">Toddler (1.5 - 3 yrs)</option>
                <option value="Preschool">Preschool (3 - 6 yrs)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Plan / Subscription Type *</label>
              <select
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="Hourly">Hourly Flex Pass (₹{center.pricing?.hourly}/hr)</option>
                <option value="Daily">Daily Drop-In Plan (₹{center.pricing?.daily}/day)</option>
                <option value="Monthly">Monthly Subscription (₹{center.pricing?.monthly}/mo)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Shift Timing *</label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 bg-white"
              >
                <option value="Day">☀️ Day Shift (8 AM - 6 PM)</option>
                <option value="Night">🌙 Night Shift (8 PM - 6 AM)</option>
                <option value="Emergency">🚨 24×7 Emergency Care</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-xs font-bold shadow"
            >
              Confirm Booking Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}