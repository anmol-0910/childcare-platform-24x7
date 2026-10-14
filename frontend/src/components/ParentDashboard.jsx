import React from 'react';
import { CalendarCheck, PlusCircle } from 'lucide-react';

export default function ParentDashboard({ bookings, onExplore }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-6 h-6 text-indigo-600" /> My Bookings & Subscriptions
          </h2>
          <p className="text-sm text-slate-500">
            Track real-time confirmation status and manage recurring childcare subscriptions.
          </p>
        </div>
        <button
          onClick={onExplore}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" /> Book Another Slot
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border text-center text-slate-500 text-sm">
          You have no active bookings or subscriptions yet. Explore a verified crèche to book a slot!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((b, i) => (
            <div
              key={b._id || i}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center"
            >
              <div className="space-y-1">
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  {b.planType || 'Monthly'} Plan • {b.shift || 'Day'} Shift
                </span>
                <h4 className="font-extrabold text-slate-900 text-base">
                  Child: {b.childName} ({b.ageGroup || 'Toddler'})
                </h4>
                <p className="text-xs text-slate-500">🏫 {b.centerName || 'Verified Crèche Center'}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  b.status === 'Rejected'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {b.status || 'Confirmed'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}