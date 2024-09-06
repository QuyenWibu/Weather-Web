import React from "react";
import { useNavigate } from "react-router-dom";
import sunIcon from "../assets/sun.png";  
import rainIcon from "../assets/rain.png"; 
import cloudIcon from "../assets/cloud.png"; 
import '../display.css'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function WeatherDisplay({ weather }) {
  const navigate = useNavigate(); 

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
                <p className="text-5xl font-extrabold text-blue-500">{weather.main.temp}°C</p>
                <p className="ml-4 text-gray-500">Feels like {weather.main.feels_like}°C</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <ArrowUpwardIcon className="text-blue-500" />
                  <p className="ml-2 text-lg">{weather.main.temp_max}°C</p>
                </div>
                <div className="flex items-center">
                  <ArrowDownwardIcon className="text-blue-500" />
                  <p className="ml-2 text-lg">{weather.main.temp_min}°C</p>
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

                <button 
                  className="mt-6 w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600"
                  onClick={() => navigate('/details')}
                >
                  View Details
                </button>
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