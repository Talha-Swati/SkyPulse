// src/components/HourlyChart.jsx
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function HourlyChart({ data }) {
  if (!data) return null;

  // Map only first 12 hours
  const chartData = data.slice(0, 12).map((item) => ({
    time: new Date(item.dt * 1000).getHours() + ":00",
    temp: item.main.temp,
  }));

  return (
    <div className="mt-10">
      {/* Heading outside the card */}
      <h2
        className="text-2xl sm:text-3xl md:text-4xl  font-extrabold text-center mb-6 
                   text-sky-400 hover:text-sky-300 transition-colors duration-300"
      >
        Hourly Forecast
      </h2>

      {/* Chart container */}
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-600 backdrop-blur-xl p-6 rounded-2xl shadow-xl 
                   transition-transform duration-300 hover:scale-[1.02] 
                   hover:shadow-2xl"
      >
        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="4 4" stroke="#475569" />
              <XAxis dataKey="time" stroke="#e2e8f0" tick={{ fontSize: 12 }} />
              <YAxis stroke="#e2e8f0" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: "12px",
                  border: "none",
                  color: "#fff",
                }}
                labelStyle={{ color: "#38bdf8" }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={{
                  r: 5,
                  strokeWidth: 2,
                  fill: "#38bdf8",
                  stroke: "#0f172a",
                }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
