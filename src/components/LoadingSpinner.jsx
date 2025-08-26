// src/components/LoadingSpinner.jsx
import React from "react";

export default function LoadingSpinner({ size = "md" }) {
  const sizes = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className="flex justify-center items-center py-6">
      <div
        className={`${sizes[size]} border-white/40 border-t-sky-400 
                    rounded-full animate-spin`}
      />
    </div>
  );
}
