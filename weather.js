export function getTemperatureSymbol(unit) {
  return unit === 'metric' ? '°C' : '°F';
}

export function getSpeedUnit(unit) {
  return unit === 'metric' ? 'm/s' : 'mph';
}

export function formatDay(date) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
}

export function formatTime(timestamp, timezoneOffset) {
  const localTime = new Date((timestamp + timezoneOffset) * 1000);

  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
  }).format(localTime);
}

export function getBackgroundClass(condition = '') {
  const normalized = condition.toLowerCase();

  if (normalized.includes('rain') || normalized.includes('drizzle')) {
    return 'app--rain';
  }

  if (normalized.includes('snow')) {
    return 'app--snow';
  }

  if (normalized.includes('cloud')) {
    return 'app--clouds';
  }

  if (normalized.includes('thunder')) {
    return 'app--storm';
  }

  return 'app--clear';
}
