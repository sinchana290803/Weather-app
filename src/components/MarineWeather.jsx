import { useState } from 'react';
import { getMarineWeather } from '../services/weatherApi';
import './MarineWeather.css';

export default function MarineWeather({ location, setLocation }) {
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
      const result = await getMarineWeather(query);
      setData(result);
      setLocation(query.trim());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const marine = data?.marine;
  const loc = data?.location;
  const current = Array.isArray(marine) ? marine[0] : marine;

  return (
    <div className="marine-weather glass card-section">
      <div className="filter-section">
        <div className="filter-row">
          <input
            type="text"
            placeholder="Coordinates (e.g. 48.834,2.394) or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
          />
          <button className="btn-fetch" onClick={handleFetch} disabled={loading}>
            {loading ? 'Loading…' : 'Get marine'}
          </button>
        </div>
        <p className="hint">Use latitude,longitude (e.g. 48.834,2.394) for marine data. Standard+ plan required.</p>
      </div>

      {error && <div className="error-msg">{error}</div>}
      {loading && <p className="loading-msg">Fetching marine weather…</p>}

      {current && loc && !loading && (
        <>
          <div className="weather-hero">
            <div className="temp">{current.water_temperature ?? '—'}°C</div>
            <div className="desc">Water temperature</div>
            <div className="location">{loc.name || query} — Marine</div>
          </div>
          <div className="weather-grid">
            <div className="weather-item">
              <label>Wave height (m)</label>
              <span className="value">{current.wave_height ?? '—'}</span>
            </div>
            <div className="weather-item">
              <label>Wave period (s)</label>
              <span className="value">{current.wave_period ?? '—'}</span>
            </div>
            <div className="weather-item">
              <label>Wind speed (km/h)</label>
              <span className="value">{current.wind_speed ?? '—'}</span>
            </div>
            <div className="weather-item">
              <label>Wind degree</label>
              <span className="value">{current.wind_degree ?? '—'}°</span>
            </div>
            <div className="weather-item">
              <label>Wind direction</label>
              <span className="value">{current.wind_direction ?? '—'}</span>
            </div>
            <div className="weather-item">
              <label>Visibility</label>
              <span className="value">{current.visibility ?? '—'}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
