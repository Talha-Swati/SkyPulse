// src/components/UnitToggle.jsx
import React from "react";

export default function UnitToggle({ value, onChange }) {
  return (
    <div className="inline-flex w-full max-w-[200px] rounded-2xl overflow-hidden shadow-md border border-white/10">
      {["metric", "imperial"].map((u) => (
        <button
          key={u}
          onClick={() => onChange(u)}
          className={`
            flex-1 px-4 py-2 sm:px-6 sm:py-3 
            text-sm sm:text-base font-semibold transition-all duration-300
            ${value === u 
              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg" 
              : "bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white"}
          `}
          aria-pressed={value === u}
        >
          {u === "metric" ? "°C" : "°F"}
        </button>
      ))}
    </div>
  );
}
