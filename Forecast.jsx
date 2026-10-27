import { formatDay, getTemperatureSymbol } from '../utils/weather.js';

function Forecast({ forecast, unit }) {
  return (
    <section className="forecast">
      <div>
        <p className="eyebrow">Five-day forecast</p>
        <h2>What&apos;s ahead</h2>
      </div>
      <div className="forecast-list">
        {forecast.map((day) => {
          const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

          return (
            <article className="forecast-card" key={day.date}>
              <span>{formatDay(day.date)}</span>
              <img src={iconUrl} alt={day.description} />
              <strong>
                {Math.round(day.max)}{getTemperatureSymbol(unit)}
                <small>{Math.round(day.min)}{getTemperatureSymbol(unit)}</small>
              </strong>
              <p>{day.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Forecast;
