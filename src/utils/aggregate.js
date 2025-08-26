// src/utils/aggregate.js
export function groupDaily(list) {
  if (!list || list.length === 0) return [];

  const byDay = new Map();

  list.forEach(item => {
    const d = new Date(item.dt * 1000);
    const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
    const arr = byDay.get(key) || [];
    arr.push(item);
    byDay.set(key, arr);
  });

  return Array.from(byDay.entries()).map(([date, items]) => {
    const temps = items.map(i => i.main.temp);
    const min = Math.round(Math.min(...temps));
    const max = Math.round(Math.max(...temps));

    // pick middle entry for icon/desc
    const mid = items[Math.floor(items.length / 2)];
    const icon = mid.weather[0].icon;
    const description = mid.weather[0].description;

    return {
      dt: items[0].dt,   // use first timestamp (valid UNIX)
      min,
      max,
      icon,
      description,
    };
  });
}
