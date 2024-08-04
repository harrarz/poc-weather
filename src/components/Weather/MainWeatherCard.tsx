import React from 'react';
import { FiThermometer } from 'react-icons/fi';
import { WeatherData } from './WeatherTypes';
import { getWeatherIcon } from './WeatherUtils';

interface MainWeatherCardProps {
  weatherData: WeatherData;
}

export const MainWeatherCard: React.FC<MainWeatherCardProps> = ({ weatherData }) => (
  <div className="weather-card main-card">
    <h2 className="city-name">{weatherData.name}</h2>
    <div className="weather-icon-large" style={{color: '#FFD700'}}>
      {getWeatherIcon(weatherData.weather[0].main)}
    </div>
    <p className="temperature-main">{Math.round(weatherData.main.temp)}°C</p>
    <p className="description">{weatherData.weather[0].description}</p>
    <div className="temp-range">
      <span className="temp-low">
        <FiThermometer style={{color: '#4A90E2'}} /> Low: {Math.round(weatherData.main.temp_min)}°C
      </span>
      <span className="temp-high">
        <FiThermometer style={{color: '#FF6B6B'}} /> High: {Math.round(weatherData.main.temp_max)}°C
      </span>
    </div>
  </div>
);