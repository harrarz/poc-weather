import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSpring, animated } from 'react-spring';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { FiMapPin } from 'react-icons/fi';

const API_KEY = "c6dea39f86ea31dc114f0a4f0eec8fa9"; // bad practice, should be stored in .env file, but okay for this example for simplicity 

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  name: string;
  wind: {
    speed: number;
  };
}

const getWeatherIcon = (main: string) => {
  switch (main.toLowerCase()) {
    case 'clear': return <WiDaySunny />;
    case 'clouds': return <WiCloudy />;
    case 'rain': return <WiRain />;
    case 'snow': return <WiSnow />;
    case 'thunderstorm': return <WiThunderstorm />;
    case 'mist': case 'fog': return <WiFog />;
    default: return <WiDaySunny />;
  }
};

const getBackgroundColor = (main: string) => {
  switch (main.toLowerCase()) {
    case 'clear': return '#87CEEB';
    case 'clouds': return '#708090';
    case 'rain': return '#4682B4';
    case 'snow': return '#F0F8FF';
    case 'thunderstorm': return '#4B0082';
    case 'mist': case 'fog': return '#D3D3D3';
    default: return '#87CEEB';
  }
};

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
    <div style={{
      background: `linear-gradient(135deg, ${backgroundColor}, #ffffff)`,
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <animated.div style={fadeIn} className="weather-card">
        <h2>{weatherData.name}</h2>
        <div className="weather-icon">
          {getWeatherIcon(weatherData.weather[0].main)}
        </div>
        <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
        <p className="description">{weatherData.weather[0].description}</p>
        <div className="weather-details">
          <p><strong>Feels like:</strong> {Math.round(weatherData.main.feels_like)}°C</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind speed:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
        </div>
      </animated.div>
    </div>
  );
};