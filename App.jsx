import { useMemo, useState } from 'react';
import Forecast from './components/Forecast.jsx';
import SearchBar from './components/SearchBar.jsx';
import UnitToggle from './components/UnitToggle.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import WeatherHighlights from './components/WeatherHighlights.jsx';
import { fetchWeatherBundle } from './services/weatherApi.js';
import { getBackgroundClass } from './utils/weather.js';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [unit, setUnit] = useState('metric');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const appClassName = useMemo(
    () => `app ${getBackgroundClass(weather?.weather?.[0]?.main)}`,
    [weather],
  );

  const loadWeather = async (location, selectedUnit = unit) => {
    if (!API_KEY || API_KEY === 'your_openweathermap_api_key_here') {
      setError('Add your OpenWeatherMap API key to a .env file, then restart the dev server.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const data = await fetchWeatherBundle({ location, unit: selectedUnit, apiKey: API_KEY });
      setWeather(data.current);
      setForecast(data.forecast);
      setQuery(data.current.name);
      setStatus('success');
    } catch (requestError) {
      setStatus('error');
      setError(requestError.message);
    }
  };

  const handleSearch = (location) => {
    const trimmedLocation = location.trim();

    if (!trimmedLocation) {
      setError('Please enter a city name before searching.');
      setStatus('error');
      return;
    }

    loadWeather(trimmedLocation);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setError('Geolocation is not available in this browser. Try searching by city instead.');
      return;
    }

    setStatus('loading');
    setError('');

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        loadWeather({ lat: coords.latitude, lon: coords.longitude });
      },
      () => {
        setStatus('error');
        setError('Location access was blocked. You can still search by city name.');
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const handleUnitChange = (nextUnit) => {
    setUnit(nextUnit);

    if (weather) {
      loadWeather({ lat: weather.coord.lat, lon: weather.coord.lon }, nextUnit);
    }
  };

  return (
    <main className={appClassName}>
      <section className="dashboard" aria-live="polite">
        <div className="masthead">
          <div>
            <p className="eyebrow">OpenWeatherMap forecast</p>
            <h1>Weather that moves with your day</h1>
          </div>
          <UnitToggle unit={unit} onChange={handleUnitChange} />
        </div>

        <SearchBar
          defaultValue={query}
          isLoading={status === 'loading'}
          onSearch={handleSearch}
          onUseLocation={handleUseLocation}
        />

        {error && <p className="alert">{error}</p>}

        {status === 'idle' && (
          <section className="empty-state">
            <span className="empty-state__icon" aria-hidden="true">☀</span>
            <div>
              <h2>Search for a city to begin</h2>
              <p>See current conditions, comfort details, and a five-day outlook in one view.</p>
            </div>
          </section>
        )}

        {status === 'loading' && (
          <section className="loading-panel">
            <span className="loader" />
            <p>Gathering the latest sky report...</p>
          </section>
        )}

        {weather && status !== 'loading' && (
          <div className="content-grid">
            <WeatherCard weather={weather} unit={unit} />
            <WeatherHighlights weather={weather} unit={unit} />
            <Forecast forecast={forecast} unit={unit} />
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
