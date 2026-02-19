const BASE_URL = 'https://api.weatherstack.com';
const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY || '';

function buildParams(params) {
  const search = new URLSearchParams({ access_key: API_KEY, ...params });
  return search.toString();
}

export async function getCurrentWeather(query) {
  const qs = buildParams({ query: query.trim() });
  const res = await fetch(`${BASE_URL}/current?${qs}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.info || data.error.type || 'Current weather request failed');
  return data;
}

export async function getHistoricalWeather(query, historicalDate) {
  const qs = buildParams({ query: query.trim(), historical_date: historicalDate });
  const res = await fetch(`${BASE_URL}/historical?${qs}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.info || data.error.type || 'Historical weather request failed');
  return data;
}

export async function getMarineWeather(query) {
  const qs = buildParams({ query: query.trim() });
  const res = await fetch(`${BASE_URL}/marine?${qs}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.info || data.error.type || 'Marine weather request failed');
  return data;
}
