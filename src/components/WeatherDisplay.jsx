import React, { useState } from "react";
import PropTypes from 'prop-types';
import sunIcon from "../assets/sun.png";
import rainIcon from "../assets/rain.png";
import cloudIcon from "../assets/cloud.png";
import '../display.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function WeatherDisplay({ weather }) {
  const [isCelsius, setIsCelsius] = useState(true);

  const getIconWeather = () => {
    if (!weather || !weather.weather) return null;

    const mainWeather = weather.weather[0].main.toLowerCase();

    switch (mainWeather) {
      case "rain":
        return <img src={rainIcon} alt="Rain" style={{ width: "50px" }} />;
      case "clear":
        return <img src={sunIcon} alt="Sunny" style={{ width: "50px" }} />;
      case "clouds":
        return <img src={cloudIcon} alt="clouds" style={{ width: "50px" }} />;
      default:
        return null;
    }
  }

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  }

  const formatTemperature = (temp) => {
    if (isCelsius) {
      return `${temp.toFixed(1)}°C`;
    } else {
      return `${celsiusToFahrenheit(temp).toFixed(1)}°F`;
    }
  }

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="flex justify-center items-center bg-blue-500 p-6 md:w-1/3">
          {getIconWeather()}
        </div>
        <div className="p-6 md:w-2/3">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Weather</h2>

          {weather ? (
            <div>
              <div className="flex items-center mb-4">
                <p className="text-5xl font-extrabold text-blue-500">{formatTemperature(weather.main.temp)}</p>
                <p className="ml-4 text-gray-500">Feels like {formatTemperature(weather.main.feels_like)}</p>
                <button 
                  onClick={toggleTemperatureUnit}
                  className="ml-4 px-2 py-1 bg-gray-300 rounded hover:bg-blue-500"
                >
                  {isCelsius ? '°F' : '°C'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <ArrowUpwardIcon className="text-blue-500" />
                  <p className="ml-2 text-lg">{formatTemperature(weather.main.temp_max)}</p>
                </div>
                <div className="flex items-center">
                  <ArrowDownwardIcon className="text-blue-500" />
                  <p className="ml-2 text-lg">{formatTemperature(weather.main.temp_min)}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-700">{weather.main.humidity}%</p>
                    <p className="text-sm text-gray-500">Humidity</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-700">{weather.wind.speed} m/s</p>
                    <p className="text-sm text-gray-500">Wind</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-700">{weather.main.pressure} hPa</p>
                    <p className="text-sm text-gray-500">Pressure</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-gray-500 italic">{weather.weather[0].description}</p>
            </div>
          ) : (
            <p className="text-center text-gray-500">No weather data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

WeatherDisplay.propTypes = {
  weather: PropTypes.shape({
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
