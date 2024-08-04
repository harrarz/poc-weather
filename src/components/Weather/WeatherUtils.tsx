import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

export const getWeatherIcon = (main: string) => {
  switch (main.toLowerCase()) {
    case 'clear': return <WiDaySunny className="weather-icon" style={{color: '#FFD700'}} />;
    case 'clouds': return <WiCloudy className="weather-icon" style={{color: '#A9A9A9'}} />;
    case 'rain': return <WiRain className="weather-icon" style={{color: '#4682B4'}} />;
    case 'snow': return <WiSnow className="weather-icon" style={{color: '#FFFAFA'}} />;
    case 'thunderstorm': return <WiThunderstorm className="weather-icon" style={{color: '#4B0082'}} />;
    case 'mist': case 'fog': return <WiFog className="weather-icon" style={{color: '#D3D3D3'}} />;
    default: return <WiDaySunny className="weather-icon" style={{color: '#FFD700'}} />;
  }
};

export const getBackgroundColor = (main: string) => {
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

export const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};