import { useState } from 'react';
import { getHistoricalWeather } from '../services/weatherApi';
import './HistoricalWeather.css';

export default function HistoricalWeather({ location, setLocation }) {
  const [query, setQuery] = useState(location || '');
  const [historicalDate, setHistoricalDate] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().slice(0, 10);
  });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFetch() {
    if (!query.trim()) return;
    setError(null);
    setLoading(true);
    setData(null);
    try {
      const result = await getHistoricalWeather(query, historicalDate);
      setData(result);
      setLocation(query.trim());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const historical = data?.historical?.[historicalDate];
  const loc = data?.location;

  return (
    <div className="historical-weather glass card-section">
      <div className="filter-section">
        <div className="filter-row">
          <input
            type="text"
            placeholder="City or location"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
          />
          <input
            type="date"
            value={historicalDate}
            onChange={(e) => setHistoricalDate(e.target.value)}
          />
          <button className="btn-fetch" onClick={handleFetch} disabled={loading}>
            {loading ? 'Loading…' : 'Get historical'}
          </button>
        </div>
        <p className="hint">Historical data may require a Standard or higher plan.</p>
      </div>

      {error && <div className="error-msg">{error}</div>}
      {loading && <p className="loading-msg">Fetching historical weather…</p>}

      {historical && loc && !loading && (
        <>
          <div className="weather-hero">
            <div className="temp">{historical.temperature}°C</div>
            <div className="desc">{historical.weather_descriptions?.[0] || '—'}</div>
            <div className="location">{loc.name}{loc.region ? `, ${loc.region}` : ''} — {historicalDate}</div>
          </div>
          <div className="weather-grid">
            <div className="weather-item">
              <label>Max</label>
              <span className="value">{historical.temp_high ?? '—'}°C</span>
            </div>
            <div className="weather-item">
              <label>Min</label>
              <span className="value">{historical.temp_low ?? '—'}°C</span>
            </div>
            <div className="weather-item">
              <label>Precipitation</label>
              <span className="value">{historical.precip ?? 0} mm</span>
            </div>
            <div className="weather-item">
              <label>Humidity</label>
              <span className="value">{historical.humidity ?? '—'}%</span>
            </div>
            <div className="weather-item">
              <label>Wind speed</label>
              <span className="value">{historical.wind_speed ?? '—'} km/h</span>
            </div>
            <div className="weather-item">
              <label>Pressure</label>
              <span className="value">{historical.pressure ?? '—'} mb</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
