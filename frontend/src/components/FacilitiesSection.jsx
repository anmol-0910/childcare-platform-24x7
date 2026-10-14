import React from 'react';
import { Users, Moon, Baby, Apple, Globe, Sparkles, BookOpen } from 'lucide-react';
import { FACILITIES_LIST } from '../data/mockData';

const ICON_MAP = {
  users: Users,
  moon: Moon,
  baby: Baby,
  apple: Apple,
  globe: Globe,
  sparkles: Sparkles,
  book: BookOpen
};

export default function FacilitiesSection({ selectedFacility, onSelectFacility }) {
  return (
    <section id="facilities-section" className="py-12 px-4 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-black text-[#0f5a55] mb-2">
        Available Facilities
      </h2>
      <p className="text-slate-500 text-sm mb-10">
        Click any facility icon below to interactively filter verified 24×7 daycares & pediatric centers
      </p>

      {/* 4 on top, 3 on bottom circular teal layout matching Little Steps screenshot */}
      <div className="flex flex-wrap justify-center gap-y-10 gap-x-8 md:gap-x-14">
        {FACILITIES_LIST.map((fac) => {
          const IconComponent = ICON_MAP[fac.icon] || Users;
          const isActive = selectedFacility === fac.id;

          return (
            <button
              key={fac.id}
              onClick={() => onSelectFacility(fac.id === selectedFacility ? 'all' : fac.id)}
              className="group flex flex-col items-center w-48 sm:w-56 focus:outline-none"
            >
              <div
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  isActive
                    ? 'bg-rose-500 text-white scale-110 ring-4 ring-rose-200'
                    : 'bg-[#0f5a55] text-white group-hover:bg-[#157a73] group-hover:scale-110 group-hover:shadow-xl'
                }`}
              >
                <IconComponent className="w-12 h-12 stroke-[1.75]" />
              </div>

              <h3
                className={`mt-4 font-extrabold text-base leading-snug transition ${
                  isActive ? 'text-rose-600' : 'text-[#0f5a55] group-hover:text-rose-500'
                }`}
              >
                {fac.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{fac.subtitle}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}