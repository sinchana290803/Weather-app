import { useState } from 'react';
import { getCurrentWeather } from '../services/weatherApi';
import './CurrentWeather.css';

export default function CurrentWeather({ location, setLocation }) {
  const [query, setQuery] = useState(location || '');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFetch() {
    if (!query.trim()) return;
    setError(null);
    setLoading(true);
    setData(null);
    try {
      const result = await getCurrentWeather(query);
      setData(result);
      setLocation(query.trim());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const current = data?.current;
  const loc = data?.location;

  return (
    <div className="current-weather glass card-section">
      <div className="filter-section">
        <div className="filter-row">
          <input
            type="text"
            placeholder="City or location (e.g. London, New York)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
          />
          <button className="btn-fetch" onClick={handleFetch} disabled={loading}>
            {loading ? 'Loading…' : 'Get weather'}
          </button>
        </div>
        <p className="hint">Enter a city name, region, or ZIP code.</p>
      </div>

      {error && <div className="error-msg">{error}</div>}
      {loading && <p className="loading-msg">Fetching current weather…</p>}

      {current && loc && !loading && (
        <>
          <div className="weather-hero">
            <div className="temp">{current.temperature}°{current.observation_time?.includes('UTC') ? 'C' : 'C'}</div>
            <div className="desc">{current.weather_descriptions?.[0] || '—'}</div>
            <div className="location">{loc.name}{loc.region ? `, ${loc.region}` : ''} {loc.country}</div>
          </div>
          <div className="weather-grid">
            <div className="weather-item">
              <label>Feels like</label>
              <span className="value">{current.feelslike}°C</span>
            </div>
            <div className="weather-item">
              <label>Humidity</label>
              <span className="value">{current.humidity}%</span>
            </div>
            <div className="weather-item">
              <label>Wind</label>
              <span className="value">{current.wind_speed} km/h</span>
            </div>
            <div className="weather-item">
              <label>Pressure</label>
              <span className="value">{current.pressure} mb</span>
            </div>
            <div className="weather-item">
              <label>UV Index</label>
              <span className="value">{current.uv_index ?? '—'}</span>
            </div>
            <div className="weather-item">
              <label>Visibility</label>
              <span className="value">{current.visibility} km</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
