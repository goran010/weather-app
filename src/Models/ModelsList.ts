export interface cityState {
  cityName: string;
  countryName: string;
  feelTemp: number;
  humidity: number;
  temp: number;
  uv: number;
  pressure: number;
  wind: number;
  text: string;
  countryCode: string;
  lat: number;
  lon: number;
  weatherCode: string;
  isDay: boolean;
}

export interface forecastCityState {
  cityName: string;
  countryName: string;
  feelTemp: number;
  humidity: number;
  temp: number;
  uv: number;
  pressure: number;
  wind: number;
  text: string;
  countryCode: string;
  lat: number;
  lon: number;
  weatherCode: string;
  isDay: boolean;
  forecastData: {
    maxTemp: number[];
    minTemp: number[];
    maxWind: number[];
    weatherCode: number[];
  };
}

export interface forecastState {
  forecastData: {
    maxTemp: number[];
    minTemp: number[];
    maxWind: number[];
    weatherCode: number[];
  };
}

export interface worldCityState {
  cityName: string;
  countryName: string;
  temperature: number;
  lat: number;
  lon: number;
  countryCode: string;
  weatherCode: number;
  isDay: boolean;
}

export interface weatherIconsData {
  [key: string]: {
    day: {
      description: string;
      image: string;
    };
    night: {
      description: string;
      image: string;
    };
  };
}
