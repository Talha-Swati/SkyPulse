// src/components/SearchBar.jsx
import React, { useState, useEffect, useRef } from "react";
import { geoSearch } from "../utils/api";
import { motion } from "framer-motion";
import { Search, XCircle } from "lucide-react";

export default function SearchBar({ onPickLocation }) {
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const acRef = useRef();

  useEffect(() => {
    if (!q.trim()) { setList([]); return; }
    if (acRef.current) acRef.current.abort();
    const ac = new AbortController();
    acRef.current = ac;
    const id = setTimeout(async () => {
      try {
        const results = await geoSearch(q, 5, { signal: ac.signal });
        setList(results);
      } catch { /* ignore */ }
    }, 300);
    return () => { clearTimeout(id); ac.abort(); };
  }, [q]);

  const handleSearchClick = () => {
    if (list.length > 0) {
      onPickLocation(list[0]);
      setSelectedCity(list[0]);
      setQ("");
      setList([]);
    }
  };

  const handleSelect = (city) => {
    onPickLocation(city);
    setSelectedCity(city);
    setQ("");
    setList([]);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center items-center w-full mb-6"
    >
      <div className="relative w-full max-w-2xl">
        {/* Glassy search container */}
        <div
          className="flex items-center gap-2 rounded-3xl bg-slate-900 backdrop-blur-xl
                     border border-white/10 p-2 shadow-lg transition-all
                     hover:shadow-xl hover:drop-shadow-[0_10px_25px_rgba(56,189,248,0.35)]"
        >
          <label className="sr-only" htmlFor="city">Search city</label>
          <input  
            id="city"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search city..."
            className="flex-1 px-4 py-3 rounded-2xl bg-transparent text-white placeholder-gray-300
                       focus:outline-none focus:ring-0"
          />

          {/* Fancy search button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSearchClick}
            className="relative group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5
                       rounded-2xl font-semibold text-white
                       bg-gradient-to-r from-sky-500 to-indigo-600
                       transition-all duration-300
                       shadow-md hover:shadow-lg active:shadow
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60"
            aria-label="Search"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Search</span>

            {/* Animated underline */}
            <span
              className="pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2
                         h-[2px] w-0 bg-white/70 rounded-full
                         transition-all duration-300 ease-out
                         group-hover:w-[80%]"
            />
          </motion.button>
        </div>

        {/* Show last searched city */}
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 flex items-center justify-between px-4 py-2
                       bg-slate-900/90 text-white rounded-2xl shadow-md"
          >
            <span className="text-sm">
              📍 {selectedCity.name}{selectedCity.state ? `, ${selectedCity.state}` : ""} · {selectedCity.country}
            </span>
            <button
              onClick={() => setSelectedCity(null)}
              className="ml-3 text-white/70 hover:text-red-400 transition"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {!!list.length && (
          <motion.ul
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-full
                       bg-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden
                       border border-white/10 shadow-xl"
            role="listbox"
          >
            {list.map((p, i) => (
              <li key={`${p.lat}-${p.lon}-${i}`}>
                <button
                  onClick={() => handleSelect(p)}
                  className="w-full text-left px-4 py-2.5 text-gray-100
                             hover:bg-white/10 transition-colors
                             flex items-center justify-between"
                >
                  <span>
                    {p.name}{p.state ? `, ${p.state}` : ""} · {p.country}
                  </span>
                  <span className="text-xs text-white">Tap to select</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  );
}
