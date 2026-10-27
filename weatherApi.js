const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function requestWeather(endpoint, params) {
  const url = new URL(`${BASE_URL}/${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url);
  const payload = await response.json();

  if (!response.ok) {
    const fallbackMessage = response.status === 404
      ? 'We could not find that location. Check the spelling and try again.'
      : 'Weather data is unavailable right now. Please try again in a moment.';

    throw new Error(payload.message ? capitalize(payload.message) : fallbackMessage);
  }

  return payload;
}

export async function fetchWeatherBundle({ location, unit, apiKey }) {
  const sharedParams = {
    appid: apiKey,
    units: unit,
  };

  const locationParams = typeof location === 'string'
    ? { q: location }
    : { lat: location.lat, lon: location.lon };

  const [current, rawForecast] = await Promise.all([
    requestWeather('weather', { ...sharedParams, ...locationParams }),
    requestWeather('forecast', { ...sharedParams, ...locationParams }),
  ]);

  return {
    current,
    forecast: summarizeForecast(rawForecast.list),
  };
}

function summarizeForecast(items) {
  const daily = new Map();

  items.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];

    if (!daily.has(date)) {
      daily.set(date, {
        date,
        min: item.main.temp_min,
        max: item.main.temp_max,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        readings: [],
      });
    }

    const day = daily.get(date);
    day.min = Math.min(day.min, item.main.temp_min);
    day.max = Math.max(day.max, item.main.temp_max);
    day.readings.push(item);

    if (item.dt_txt.includes('12:00:00')) {
      day.icon = item.weather[0].icon;
      day.description = item.weather[0].description;
    }
  });

  return Array.from(daily.values()).slice(0, 5);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
