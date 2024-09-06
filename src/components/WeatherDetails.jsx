import React from "react";

export default function WeatherDetails({ weather }) {
  if (!weather) {
    return <p>No weather data available for details.</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Weather Details</h2>
      <p>City: {weather.name}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Feels Like: {weather.main.feels_like}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
      <p>Description: {weather.weather[0].description}</p>
    </div>
  );
}
