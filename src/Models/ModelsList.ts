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

export interface forecastState {
  forecastData: {
    maxTemp: number[];
    minTemp: number[];
    weatherCode: number[];
  };
}

export interface worldCityState {
  cityName: string;
  countryName: string;
  feelTemp: number;
  lat: number;
  lon: number;
  countryCode: string;
}
