import { formatTime, getTemperatureSymbol } from '../utils/weather.js';

function WeatherCard({ weather, unit }) {
  const condition = weather.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${condition.icon}@4x.png`;

  return (
    <section className="weather-card">
      <div className="weather-card__topline">
        <div>
          <p className="eyebrow">Current weather</p>
          <h2>{weather.name}, {weather.sys.country}</h2>
        </div>
        <img src={iconUrl} alt={condition.description} />
      </div>

      <div className="temperature-row">
        <strong>{Math.round(weather.main.temp)}{getTemperatureSymbol(unit)}</strong>
        <span>{condition.description}</span>
      </div>

      <p className="summary">
        Feels like {Math.round(weather.main.feels_like)}{getTemperatureSymbol(unit)} with
        {' '}{weather.clouds.all}% cloud cover.
      </p>

      <div className="sun-times">
        <span>Sunrise {formatTime(weather.sys.sunrise, weather.timezone)}</span>
        <span>Sunset {formatTime(weather.sys.sunset, weather.timezone)}</span>
      </div>
    </section>
  );
}

export default WeatherCard;
