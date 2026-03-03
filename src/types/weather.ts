export interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  }

  weather: Array<{
    description: string;
    icon: string;
  }>

  wind: {
    speed: number
  };
  clouds: {
    all: number
  }
}