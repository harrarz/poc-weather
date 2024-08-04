import React from 'react';
import { WiStrongWind, WiHumidity, WiSunrise, WiSunset } from 'react-icons/wi';
import { FiDroplet } from 'react-icons/fi';
import { WeatherData } from './WeatherTypes';
import { formatTime } from './WeatherUtils';

interface WeatherDetailsCardProps {
  weatherData: WeatherData;
}

export const WeatherDetailsCard: React.FC<WeatherDetailsCardProps> = ({ weatherData }) => (
  <div className="weather-card details-card">
    <h3 className="details-title">Weather Details</h3>
    <div className="weather-details">
      <div className="detail-item">
        <WiStrongWind className="detail-icon" style={{color: '#4A90E2'}} />
        <span className="detail-label">Feels like</span>
        <span className="detail-value" style={{color: '#4A90E2'}}>{Math.round(weatherData.main.feels_like)}°C</span>
      </div>
      <div className="detail-item">
        <WiHumidity className="detail-icon" style={{color: '#50E3C2'}} />
        <span className="detail-label">Humidity</span>
        <span className="detail-value" style={{color: '#50E3C2'}}>{weatherData.main.humidity}%</span>
      </div>
      <div className="detail-item">
        <WiStrongWind className="detail-icon" style={{color: '#9013FE'}} />
        <span className="detail-label">Wind</span>
        <span className="detail-value" style={{color: '#9013FE'}}>{weatherData.wind.speed} m/s</span>
      </div>
      <div className="detail-item">
        <FiDroplet className="detail-icon" style={{color: '#4A4A4A'}} />
        <span className="detail-label">Pressure</span>
        <span className="detail-value" style={{color: '#4A4A4A'}}>{weatherData.main.pressure} hPa</span>
      </div>
      <div className="detail-item">
        <WiSunrise className="detail-icon" style={{color: '#F5A623'}} />
        <span className="detail-label">Sunrise</span>
        <span className="detail-value" style={{color: '#F5A623'}}>{formatTime(weatherData.sys.sunrise)}</span>
      </div>
      <div className="detail-item">
        <WiSunset className="detail-icon" style={{color: '#FF6B6B'}} />
        <span className="detail-label">Sunset</span>
        <span className="detail-value" style={{color: '#FF6B6B'}}>{formatTime(weatherData.sys.sunset)}</span>
      </div>
    </div>
  </div>
);