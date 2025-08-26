import React from "react";

export default function ForecastCard({ forecast, units }) {
  // shape from groupDaily → { dt, min, max, icon, description }
  const { dt, min, max, icon, description } = forecast;
  const date = new Date(dt * 1000);

  return (
    <div
      className="flex flex-col items-center p-4 rounded-2xl 
                 bg-slate-900/90 backdrop-blur-md shadow-md 
                 hover:shadow-xl hover:shadow-slate-900/90 
                 transition-transform duration-300 ease-in-out 
                 hover:-translate-y-1 hover:scale-105 
                 min-w-[120px] w-full select-none"
    >
      {/* Date */}
      <p className="text-sm text-gray-300 mb-2 select-none">
        {date.toLocaleDateString(undefined, { weekday: "short" })}
      </p>

      {/* Icon */}
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}.png`}
          alt="weather icon"
          className="w-14 h-14 mb-2 select-none"
        />
      )}

      {/* Temps */}
      <p className="text-lg font-semibold select-none">
        {min}° / {max}°{units === "imperial" ? "F" : "C"}
      </p>

      {/* Description */}
      <p className="text-xs text-gray-300 capitalize select-none">{description}</p>
    </div>
  );
}
