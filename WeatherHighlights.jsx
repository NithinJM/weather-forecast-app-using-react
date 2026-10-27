import { getSpeedUnit } from '../utils/weather.js';

function WeatherHighlights({ weather, unit }) {
  const details = [
    { label: 'Humidity', value: `${weather.main.humidity}%` },
    { label: 'Wind', value: `${Math.round(weather.wind.speed)} ${getSpeedUnit(unit)}` },
    { label: 'Pressure', value: `${weather.main.pressure} hPa` },
    { label: 'Visibility', value: `${Math.round(weather.visibility / 1000)} km` },
  ];

  return (
    <section className="highlights">
      <div>
        <p className="eyebrow">Details</p>
        <h2>Today&apos;s comfort snapshot</h2>
      </div>
      <div className="highlight-grid">
        {details.map((detail) => (
          <article className="metric" key={detail.label}>
            <span>{detail.label}</span>
            <strong>{detail.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export default WeatherHighlights;
