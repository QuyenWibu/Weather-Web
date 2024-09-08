import React, { useState, createContext,useMemo  } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css";
import "./display.css";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";
import WeatherDetails from './components/WeatherDetails';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { BrowserRouter as Router } from 'react-router-dom'; 
import ErrorComponent from './components/ErrorComponent';
import { useWeatherSearch } from './hooks/useWeatherSearch';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  
  const [mode, setMode] = useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  const { search, setSearch, weather, forecast, searchWeather, error, setError, loading } = useWeatherSearch();
  const displaySearch = useMemo(() => {
    return search === "Ho Chi Minh" ? "Sài Gòn" : search;
  }, [search]);
  const handleSearch = () => {
    searchWeather(search);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className={`app ${mode}`}>
            <div className="flex items-center justify-between my-4 px-4">
              <div className="flex items-center space-x-2">
                <WbSunnyIcon className="text-yellow-500 text-4xl" />
                <h1 className="text-3xl font-bold uppercase">Weather App</h1>
              </div>
              <button onClick={colorMode.toggleColorMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />}
              </button>
            </div>

            <div className="max-w-md mx-auto mt-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={displaySearch}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setSearch(newValue === "Sài Gòn" ? "Ho Chi Minh" : newValue);
                  }}
                  placeholder="Enter city name..."
                  className="w-full px-4 py-2 text-gray-700 bg-white border rounded-l-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center mt-4">
                <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              </div>
            ) : ( 
              <>
              <div className="flex flex-col">
                <WeatherDisplay weather={weather}/>
                <WeatherDetails forecast={forecast}/>
                </div>
                <Forecast forecast={forecast}/>
              </>
            )}

            <ErrorComponent error={error} onClose={() => setError(null)} />
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
