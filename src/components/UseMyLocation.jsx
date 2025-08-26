// src/components/UseMyLocation.jsx
import React from "react";

export default function UseMyLocation({ onCoords }) {
  const getLoc = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        onCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => alert(err.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <button
      onClick={getLoc}
      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 
                 rounded-xl font-semibold text-white 
                 bg-gradient-to-r from-blue-500 to-indigo-600
                 hover:from-blue-600 hover:to-indigo-700
                 shadow-md hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)]
                 active:scale-95 transition-all duration-300"
    >
      Use my location
    </button>
  );
}
