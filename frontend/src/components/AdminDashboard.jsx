import React from 'react';

export default function AdminDashboard({ centers, onToggleVerify }) {
  const verifiedCount = centers.filter((c) => c.verified).length;
  const totalCap = centers.reduce((s, c) => s + c.capacity, 0) || 1;
  const totalEnrolled = centers.reduce((s, c) => s + c.enrolled, 0);
  const utilization = Math.round((totalEnrolled / totalCap) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-extrabold">Admin Governance & KPI Dashboard</h2>
        <p className="text-xs text-slate-300 mt-1">
          Verify childcare provider documents, safety compliance, and monitor platform KPIs.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          <div className="bg-white/10 p-3.5 rounded-xl">
            <p className="text-[11px] text-slate-300">Registered Users</p>
            <p className="text-xl font-extrabold mt-1">42</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-xl">
            <p className="text-[11px] text-slate-300">Verified Providers</p>
            <p className="text-xl font-extrabold text-emerald-400 mt-1">{verifiedCount}</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-xl">
            <p className="text-[11px] text-slate-300">Booking Conversion</p>
            <p className="text-xl font-extrabold text-amber-300 mt-1">78%</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-xl">
            <p className="text-[11px] text-slate-300">Subscription Rate</p>
            <p className="text-xl font-extrabold text-indigo-300 mt-1">64%</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-xl">
            <p className="text-[11px] text-slate-300">Avg Utilization</p>
            <p className="text-xl font-extrabold text-cyan-300 mt-1">{utilization}%</p>
          </div>
          <div className="bg-white/10 p-3.5 rounded-xl">
            <p className="text-[11px] text-slate-300">Satisfaction Score</p>
            <p className="text-xl font-extrabold text-pink-300 mt-1">4.8 ★</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-lg font-extrabold text-slate-900">Provider Document & Safety Verification</h3>
        {centers.map((c, idx) => (
          <div
            key={c._id}
            className="p-4 rounded-xl border border-slate-200 flex justify-between items-center bg-slate-50"
          >
            <div>
              <p className="font-bold text-sm text-slate-900">{c.name}</p>
              <p className="text-xs text-slate-500">📍 {c.location}</p>
            </div>
            <button
              onClick={() => onToggleVerify(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold text-white ${
                c.verified ? 'bg-amber-500' : 'bg-emerald-600'
              }`}
            >
              {c.verified ? 'Revoke Badge' : 'Approve & Verify'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}