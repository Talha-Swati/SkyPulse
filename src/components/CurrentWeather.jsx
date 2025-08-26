import React from "react";
import { motion } from "framer-motion";

export default function CurrentWeather({ data: weather, units }) {
  if (!weather) {
    return (
      <div className="text-center text-gray-400 mt-10">
        No weather data available
      </div>
    );
  }

  const { name, main, weather: weatherDetails } = weather;
  const temperature = Math.round(main.temp);
  const condition = weatherDetails[0].main; // e.g. "Clouds", "Rain", "Clear"
  const icon = weatherDetails[0].icon;
  const unitSymbol = units === "imperial" ? "°F" : "°C";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -6, boxShadow: "0px 12px 28px rgba(0,0,0,0.25)" }}
      className="bg-gradient-to-br from-blue-500/90 to-indigo-600/90 
                 text-white rounded-2xl p-6 sm:p-8 
                 shadow-2xl max-w-sm sm:max-w-md w-full mx-auto mt-6
                 transition-all duration-300"
    >
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold drop-shadow-md">
            {name}
          </h2>
          <p className="text-base sm:text-lg text-gray-200">{condition}</p>
        </div>
        <motion.img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={condition}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      </div>

      {/* Temperature Section */}
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
          {temperature}{unitSymbol}
        </p>
        <p className="mt-2 text-sm sm:text-base text-gray-200">
          Feels like {Math.round(main.feels_like)}{unitSymbol} | Humidity {main.humidity}%
        </p>
      </div>
    </motion.div>
  );
}
