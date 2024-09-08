import React from "react";
import sunIcon from "../assets/sun.png";
import rainIcon from "../assets/rain.png";
import cloudIcon from "../assets/cloud.png";
import '../display.css';

export default function Forecast({ forecast }) {
  const getIconWeather = (weatherMain) => {
    if (!weatherMain) return null;
    const mainWeather = weatherMain.toLowerCase();
    
    switch (mainWeather) {
      case "rain":
        return <img src={rainIcon} alt="Rain" className="w-12 h-12" />;
      case "clear":
        return <img src={sunIcon} alt="Sunny" className="w-12 h-12" />;
      case "clouds":
        return <img src={cloudIcon} alt="Clouds" className="w-12 h-12" />;
      default:
        return null;
    }
  };

  if (!forecast || !forecast.list) {
    return <p className="text-center text-gray-500">No forecast data available</p>;
  }

  const filteredForecast = forecast.list.filter((item, index, array) => {
    const currentDate = new Date(item.dt_txt).getDate();
    const previousDate = index > 0 ? new Date(array[index - 1].dt_txt).getDate() : null;
    return currentDate !== previousDate;
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {filteredForecast.slice(0, 7).map((item, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center transition-transform hover:scale-105">
            <h3 className="week_forecast text-lg font-semibold text-gray-700 mb-2">
              {new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: 'short' })}
            </h3>
            <div className=" mb-2">{getIconWeather(item.weather[0].main)}</div>
            <p className="text-3xl font-bold text-blue-600">{Math.round(item.main.temp)}°C</p>
            <p className="text-sm text-gray-500 mt-1">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}



