import React, { useState } from "react";
import "./App.css";
import "./display.css";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";
import WeatherDetails from './components/WeatherDetails';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Route, Routes } from 'react-router-dom';  // Không sử dụng thêm <Router> ở đây

const api = {
  key: '98186f772fb5b1a7bc971857c463ec2d',
  base: 'https://api.openweathermap.org/data/2.5/'
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null); 

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log("Weather: ", result);
      });

    fetch(`${api.base}forecast?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setForecast(result);
        console.log("Forecast: ", result);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center space-x-2 my-4">
        <WbSunnyIcon className="text-yellow-500 text-4xl" />
        <h1 className="text-3xl font-bold uppercase">Weather App</h1>
      </div>

      <div className="max-w-md mx-auto mt-8">
        <div className="relative flex items-center">
          <input 
            type="text"
            placeholder="Enter city name..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-lg focus:outline-none focus:border-blue-500"
          />
          <button 
            onClick={searchPressed}
            className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Tìm kiếm
          </button>
        </div>
      </div>

      <Routes>
      
        <Route path="/" element={<WeatherDisplay weather={weather} />} />
        
        <Route path="/details" element={<WeatherDetails weather={weather} />} />
      </Routes>

      <div>
        <Forecast forecast={forecast} />
      </div>
    </div>
  );
}

export default App;
