import { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import HistoricalWeather from './components/HistoricalWeather';
import MarineWeather from './components/MarineWeather';
import './App.css';

const TABS = [
  { id: 'current', label: 'Current weather' },
  { id: 'historical', label: 'Historical weather' },
  { id: 'marine', label: 'Marine weather' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('current');
  const [location, setLocation] = useState('');

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Weather</h1>
        <p className="app-subtitle">Current, historical & marine — powered by Weatherstack</p>
      </header>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'current' && (
        <CurrentWeather location={location} setLocation={setLocation} />
      )}
      {activeTab === 'historical' && (
        <HistoricalWeather location={location} setLocation={setLocation} />
      )}
      {activeTab === 'marine' && (
        <MarineWeather location={location} setLocation={setLocation} />
      )}
    </div>
  );
}
