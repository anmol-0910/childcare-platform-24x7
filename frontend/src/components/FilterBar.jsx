import React from 'react';
import { Search, RotateCcw, Clock } from 'lucide-react';

export default function FilterBar({ filters, setFilters, onReset }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Filter Daycare & Crèche Centers
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-indigo-600 hover:underline font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Search Name or City</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Raipur, Little Steps..."
              className="w-full border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Age Group</label>
          <select
            value={filters.ageGroup}
            onChange={(e) => setFilters({ ...filters, ageGroup: e.target.value })}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="all">All Age Groups</option>
            <option value="Infant">Infant (0 - 1.5 yrs)</option>
            <option value="Toddler">Toddler (1.5 - 3 yrs)</option>
            <option value="Preschool">Preschool (3 - 6 yrs)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Shift Timing</label>
          <select
            value={filters.shift}
            onChange={(e) => setFilters({ ...filters, shift: e.target.value })}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="all">Any Shift Timing</option>
            <option value="Day">☀️ Day Shift</option>
            <option value="Night">🌙 Night Shift</option>
            <option value="Emergency">🚨 Emergency Care</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Max Monthly Plan</label>
          <select
            value={filters.maxBudget}
            onChange={(e) => setFilters({ ...filters, maxBudget: Number(e.target.value) })}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value={999999}>Any Budget</option>
            <option value={3500}>Under ₹3,500 / mo</option>
            <option value={5000}>Under ₹5,000 / mo</option>
            <option value={8000}>Under ₹8,000 / mo</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center space-x-2.5 bg-indigo-50 border border-indigo-200 rounded-lg px-3.5 py-2 w-full cursor-pointer">
            <input
              type="checkbox"
              checked={filters.only24x7}
              onChange={(e) => setFilters({ ...filters, only24x7: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 24×7 Open Only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}