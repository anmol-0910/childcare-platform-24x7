import React, { useState } from 'react';

export default function ProviderDashboard({ centers, bookings, onCreateCenter, onUpdateBookingStatus }) {
  const [form, setForm] = useState({
    name: '',
    location: '',
    capacity: 25,
    hourly: 150,
    daily: 600,
    monthly: 4500,
    is24x7: true,
    ages: 'Infant, Toddler, Preschool',
    caregiverName: 'Meera Sharma (8 yrs Early Childhood Care)',
    safety: 'Police Verified Staff, CCTV Monitored, Fire Certified'
  });

  const totalCap = centers.reduce((s, c) => s + c.capacity, 0) || 1;
  const totalEnrolled = centers.reduce((s, c) => s + c.enrolled, 0);
  const utilization = Math.round((totalEnrolled / totalCap) * 100);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCenter({
      _id: 'c_' + Date.now(),
      name: form.name,
      location: form.location,
      capacity: Number(form.capacity),
      enrolled: 1,
      is24x7: form.is24x7,
      verified: true,
      rating: 4.9,
      ageGroups: form.ages.split(',').map((s) => s.trim()),
      shifts: form.is24x7 ? ['Day', 'Night', 'Emergency'] : ['Day'],
      pricing: {
        hourly: Number(form.hourly),
        daily: Number(form.daily),
        monthly: Number(form.monthly)
      },
      caregivers: [{ name: form.caregiverName, role: 'Lead Caregiver', exp: '8 yrs', cert: 'Verified' }],
      safety: form.safety.split(',').map((s) => s.trim())
    });
    setForm({ ...form, name: '', location: '' });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Listed Centers</p>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{centers.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Booking Requests</p>
          <p className="text-2xl font-extrabold text-indigo-600 mt-1">{bookings.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Facility Utilization</p>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">{utilization}%</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-semibold uppercase">Est. Monthly Revenue</p>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">
            ₹{(bookings.length * 4200 + 18500).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">Register Daycare / Crèche</h3>
          <p className="text-xs text-slate-500 mb-4">Add pricing plans, 24×7 availability & safety details.</p>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Center Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Sunshine 24×7 Crèche"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">City / Area *</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Raipur"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Capacity *</label>
                <input
                  type="number"
                  required
                  value={form.capacity}
                  onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border">
              <div>
                <label className="text-[10px] text-slate-500">Hourly (₹)</label>
                <input
                  type="number"
                  value={form.hourly}
                  onChange={(e) => setForm({ ...form, hourly: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Daily (₹)</label>
                <input
                  type="number"
                  value={form.daily}
                  onChange={(e) => setForm({ ...form, daily: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500">Monthly (₹)</label>
                <input
                  type="number"
                  value={form.monthly}
                  onChange={(e) => setForm({ ...form, monthly: e.target.value })}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>

            <label className="flex items-center justify-between bg-indigo-50 px-3 py-2 rounded-lg cursor-pointer">
              <span className="font-bold text-indigo-900">Supports 24×7 & Night Shifts?</span>
              <input
                type="checkbox"
                checked={form.is24x7}
                onChange={(e) => setForm({ ...form, is24x7: e.target.checked })}
                className="w-4 h-4"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition"
            >
              Publish Daycare Center
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">Incoming Booking Requests</h3>
          <p className="text-xs text-slate-500 mb-4">Accept or reject parent slot requests.</p>
          <div className="space-y-3">
            {bookings.length === 0 ? (
              <p className="text-xs text-slate-500">No booking requests yet.</p>
            ) : (
              bookings.map((b, idx) => (
                <div
                  key={b._id || idx}
                  className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-sm text-slate-900">
                      {b.childName} • <span className="text-indigo-600">{b.planType} ({b.shift} Shift)</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      {b.centerName} • Status: <strong>{b.status}</strong>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onUpdateBookingStatus(idx, 'Approved')}
                      className="bg-emerald-600 text-white px-3 py-1 rounded-lg text-xs font-bold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onUpdateBookingStatus(idx, 'Rejected')}
                      className="bg-rose-500 text-white px-3 py-1 rounded-lg text-xs font-bold"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}