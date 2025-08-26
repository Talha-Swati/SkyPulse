// src/utils/api.js
const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const BASE = "https://api.openweathermap.org";
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

if (!API_KEY) {
  console.warn(
    "⚠️ Missing OpenWeather API key! Please set VITE_OPENWEATHER_KEY in your .env file."
  );
}

const cache = new Map();
function key(url) {
  return url;
}
function getCached(url) {
  const hit = cache.get(key(url));
  if (!hit) return null;
  const [ts, data] = hit;
  return Date.now() - ts < CACHE_TTL ? data : null;
}
function setCached(url, data) {
  cache.set(key(url), [Date.now(), data]);
}

async function safeFetch(url, { signal } = {}) {
  const cached = getCached(url);
  if (cached) return cached;

  const res = await fetch(url, { signal });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg = body?.message || res.statusText || "Request failed";
    throw new Error(msg.charAt(0).toUpperCase() + msg.slice(1));
  }
  const data = await res.json();
  setCached(url, data);
  return data;
}

// --- Geocoding: returns array of { name, state, country, lat, lon }
export async function geoSearch(query, limit = 5, { signal } = {}) {
  const url = `${BASE}/geo/1.0/direct?q=${encodeURIComponent(
    query
  )}&limit=${limit}&appid=${API_KEY}`;
  return safeFetch(url, { signal });
}

// Reverse geocode by lat/lon
export async function reverseGeo(lat, lon, { signal } = {}) {
  const url = `${BASE}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
  return safeFetch(url, { signal });
}

// Current weather by coords
export async function fetchCurrentByCoords(
  { lat, lon },
  units = "metric",
  { signal } = {}
) {
  const url = `${BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  return safeFetch(url, { signal });
}

// 5-day / 3-hour forecast by coords
export async function fetchForecastByCoords(
  { lat, lon },
  units = "metric",
  { signal } = {}
) {
  const url = `${BASE}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
  return safeFetch(url, { signal });
}

// Air quality
export async function fetchAirQuality({ lat, lon }, { signal } = {}) {
  const url = `${BASE}/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return safeFetch(url, { signal });
}
