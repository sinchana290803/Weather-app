# Weather App

A React frontend application that fetches weather data from Weatherstack API, featuring current weather, historical weather, and marine weather with location filters. Built with a beautiful glassmorphism design theme.

## Features

- **Current Weather**: Real-time weather data for any location
- **Historical Weather**: Past weather data for specific dates
- **Marine Weather**: Marine-specific weather data by coordinates
- **Location Filters**: Search by city name, region, ZIP code, or coordinates
- **Glassmorphism UI**: Modern, beautiful glass-effect design

## Setup

1. Install dependencies:
```bash
npm install
```

2. The API key is already configured in `.env` file.

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (usually `http://localhost:5173`)

## Troubleshooting

If you encounter module resolution errors:

1. Stop the dev server (Ctrl+C)
2. Clear Vite cache:
```bash
# Windows PowerShell
.\cleanup.ps1

# Or manually:
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue
```

3. Restart the dev server:
```bash
npm run dev
```

## API Notes

- **Current Weather**: Available on Free plan
- **Historical Weather**: Requires Standard plan or higher
- **Marine Weather**: Requires Standard plan or higher

If you get errors for Historical or Marine endpoints, you may need to upgrade your Weatherstack plan.

## Project Structure

```
src/
├── components/
│   ├── CurrentWeather.jsx
│   ├── HistoricalWeather.jsx
│   └── MarineWeather.jsx
├── services/
│   └── weatherApi.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```
