import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { WiDaySunny } from 'react-icons/wi';
import { FiMapPin } from 'react-icons/fi';
import { WeatherData } from './WeatherTypes';
import { getBackgroundColor } from './WeatherUtils';
import { MainWeatherCard } from './MainWeatherCard';
import { WeatherDetailsCard } from './WeatherDetailsCard';
import './Weather.css';

const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY || '';

if (!API_KEY) {
  console.error('API key missing. Check env variables');
}

export const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fadeIn = useSpring({
    opacity: loading ? 0 : 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const loadingAnimation = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: '#ffaaee' },
      { opacity: 0.5, color: '#4db8ff' },
    ],
    from: { opacity: 0.5, color: '#4db8ff' },
    config: { duration: 2000 },
  });

  const getWeather = async (lat: number, lon: number) => {
    const cacheKey = `weather_${lat}_${lon}`;
    const cacheExpiry = 10 * 60 * 1000;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < cacheExpiry) {
        setWeatherData(data);
        setLoading(false);
        return;
      }
    }
    try {
      const response = await axios.get<WeatherData>('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
        }
      });
      setWeatherData(response.data);
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data: response.data }));
      setLoading(false);
    } catch (err) {
      setError('Error fetching weather data');
      setLoading(false);
    }
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        getWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <animated.div style={loadingAnimation} className="loading-content">
          <WiDaySunny size={100} />
          <h1>Loading Weather Data</h1>
          <p>Please wait while we fetch the latest weather information.</p>
          <div className="location-message">
            <FiMapPin size={24} />
            <p>If prompted, please allow location access for accurate weather data.</p>
          </div>
        </animated.div>
      </div>
    );
  }

  if (error) return (
    <div className="error-container">
      <div className="error-content">
        <h1>Oops! Something went wrong</h1>
        <p>{error}</p>
        <p>Please check your internet connection and location settings, then try again.</p>
      </div>
    </div>
  );

  if (!weatherData) return null;

  const backgroundColor = getBackgroundColor(weatherData.weather[0].main);

  return (
    <div className="weather-container" style={{
      background: `linear-gradient(135deg, ${backgroundColor}, #ffffff)`,
    }}>
      <animated.div style={fadeIn} className="weather-content">
        <MainWeatherCard weatherData={weatherData} />
        <WeatherDetailsCard weatherData={weatherData} />
      </animated.div>
    </div>
  );
};