export interface cityState {
  cityName: string;
  countryName: string;
  feelTemp: number;
  humidity: number;
  temp: number;
  uv: number;
  pressure: number;
  wind: number;
  countryCode: string;
  lat: number;
  lon: number;
  weatherCode: string;
  isDay: boolean;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  daylight: number;
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

//dropdown
export interface ChangeCityParams {
  lat: number;
  lon: number;
  cityName: string;
  countryName: string;
  countryCode: string;
}

export interface InputDropdownProps {
  searchedName: string;
  changeCity: ({
    lat,
    lon,
    cityName,
    countryName,
    countryCode,
  }: ChangeCityParams) => Promise<void>;
}

export interface CityLocationData {
  id: number;
  country: string;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  country_code: string;
  admin1: string;
}

