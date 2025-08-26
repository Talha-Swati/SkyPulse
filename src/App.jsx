import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import ForecastList from "./components/ForecastList.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import UnitToggle from "./components/UnitToggle.jsx";
import UseMyLocation from "./components/UseMyLocation.jsx";
import HourlyChart from "./components/HourlyChart.jsx";
import Footer from "./components/Footer.jsx";
import { fetchCurrentByCoords, fetchForecastByCoords, reverseGeo } from "./utils/api";
import { groupDaily } from "./utils/aggregate";
import { motion, AnimatePresence } from "framer-motion";

// 🔹 Map OpenWeather "main" -> your animated classes from globals.css
const BG_MAP = {
  Clear: "bg-sunny",
  Clouds: "bg-cloudy",
  Rain: "bg-rainy",
  Drizzle: "bg-rainy",
  Snow: "bg-snowy",
  Thunderstorm: "bg-thunder",
  Mist: "bg-mist",
  Fog: "bg-mist",
  Haze: "bg-mist",
  Smoke: "bg-mist",
  Dust: "bg-mist",
  Sand: "bg-mist",
};

export default function App() {
  const [units, setUnits] = useState(localStorage.getItem("units") || "metric");
  const [place, setPlace] = useState({ name: "Islamabad", lat: 33.6844, lon: 73.0479 });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const acRef = useRef();

  useEffect(() => {
    localStorage.setItem("units", units);
  }, [units]);

  async function loadByCoords(coords) {
    if (acRef.current) acRef.current.abort();
    const ac = new AbortController();
    acRef.current = ac;
    try {
      setLoading(true);
      setError("");
      const [cw, fc] = await Promise.all([
        fetchCurrentByCoords(coords, units, { signal: ac.signal }),
        fetchForecastByCoords(coords, units, { signal: ac.signal }),
      ]);
      const [nameObj] = await reverseGeo(coords.lat, coords.lon, { signal: ac.signal }).catch(() => []);
      setPlace({
        name: nameObj ? `${nameObj.name}${nameObj.state ? ", " + nameObj.state : ""}` : cw.name,
        ...coords,
      });
      setWeather(cw);
      setForecast(fc);
      setDaily(groupDaily(fc.list).slice(0, 5));
    } catch (e) {
      if (e.name !== "AbortError") setError(e.message || "Failed to load weather");
    } finally {
      setLoading(false);
    }
  }

  // initial load (Islamabad)
  useEffect(() => {
    loadByCoords({ lat: 33.6844, lon: 73.0479 });
  }, [units]);

  const onPickLocation = (geo) => {
    loadByCoords({ lat: geo.lat, lon: geo.lon });
  };

  // 🔹 Decide background class based on current weather condition
  const currentMain = weather?.weather?.[0]?.main; // e.g. "Clouds", "Clear"
  const bgClass = BG_MAP[currentMain] || "bg-sunny";

  return (
    // ❗ Removed the fixed Tailwind gradient and replaced with dynamic class
    <div className={`min-h-screen flex flex-col ${bgClass} text-white transition-all`}>
      <div className="container mx-auto px-4 py-6 space-y-4 flex-grow">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <SearchBar onPickLocation={onPickLocation} />
          <div className="flex gap-2">
            <UseMyLocation onCoords={loadByCoords} />
            <UnitToggle value={units} onChange={setUnits} />
          </div>
        </div>

        {loading && <LoadingSpinner size="lg" />}
        <p className="text-red-400 text-center" aria-live="polite">
          {error}
        </p>

        <AnimatePresence mode="popLayout">
          {!loading && !error && weather && (
            <motion.div
              key={place.name + units}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <CurrentWeather data={weather} units={units} />

              {forecast?.list && <HourlyChart data={forecast.list} />}

              <ForecastList data={daily} units={units} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
