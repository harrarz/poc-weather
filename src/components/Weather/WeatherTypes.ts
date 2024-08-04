export interface WeatherData {
    main: {
      temp: number;
      humidity: number;
      feels_like: number;
      pressure: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
      main: string;
    }>;
    name: string;
    wind: {
      speed: number;
      deg: number;
    };
    sys: {
      sunrise: number;
      sunset: number;
    };
    visibility: number;
  }