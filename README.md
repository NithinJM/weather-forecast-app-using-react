# Weather Forecasting App

A dynamic React weather app that uses the OpenWeatherMap API to show current conditions, weather highlights, geolocation search, Celsius/Fahrenheit toggling, and a five-day forecast.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```bash
   VITE_OPENWEATHER_API_KEY=your_openweathermap_api_key_here
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown in the terminal.

## OpenWeatherMap API Key

Register at [OpenWeatherMap](https://openweathermap.org/api), create an API key, and place it in `.env`. Vite exposes variables that start with `VITE_` to the browser app.

## Features

- City search and browser geolocation lookup
- Current temperature, condition, feels-like temperature, cloud cover, sunrise, and sunset
- Humidity, wind speed, pressure, and visibility highlights
- Five-day forecast from the OpenWeatherMap forecast endpoint
- Celsius and Fahrenheit toggle
- Responsive layout with animated loading, hover states, and weather-aware backgrounds
- Friendly error messages for missing API keys, invalid locations, location permission issues, and failed requests

## Project Structure

```text
src/
  components/        Reusable UI sections such as search, current weather, highlights, and forecast
  services/          OpenWeatherMap request and forecast summarizing logic
  utils/             Formatting helpers for units, dates, times, and theme selection
  App.jsx            State management and app orchestration
  main.jsx           React entry point
  styles.css         Responsive visual design
```

## Libraries Used

- React for component-based UI
- Vite for local development and production builds
- OpenWeatherMap API for weather and forecast data
- ESLint for JavaScript quality checks
