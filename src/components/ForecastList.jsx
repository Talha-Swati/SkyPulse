import React from "react";
import ForecastCard from "./ForecastCard";

export default function ForecastList({ data, units }) {
  if (!data || data.length === 0) return null; // data is already an array

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <h3
        className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-6 text-center 
                   bg-gradient-to-r from-blue-400 via-blue-600 to-slate-500 
                   bg-clip-text text-transparent
                   transition-transform duration-300 ease-in-out
                   hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(255,200,0,0.7)]"
      >
        5-Day Forecast
      </h3>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
                   gap-4 justify-items-center"
      >
        {data.map((fc) => (
          <ForecastCard key={fc.dt} forecast={fc} units={units} />
        ))}
      </div>
    </div>
  );
}
