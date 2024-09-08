// src/hooks/useWeatherSearch.js
import { useState, useEffect } from "react";
import api from "../api/config";

export function useWeatherSearch() {
  const [search, setSearch] = useState("Ho Chi Minh");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY; 

  const searchWeather = (query) => {
    setSearch(query);
    setLoading(true);
    setError(null);

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === 200) {
          setWeather(result);
          setError(null);
        } else {
          setError("Invalid city name. Please try again.");
        }
      })
      .finally(() => setLoading(false));

    fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod === "200") {
          setForecast(result);
        }
      });
  };

  useEffect(() => {
    searchWeather(search);
  }, []);

  return { search, setSearch, weather, forecast, searchWeather, error, setError, loading };
}
