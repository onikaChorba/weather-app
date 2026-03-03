import React, { useEffect, useState } from "react";
import { WeatherCard } from "../../components";
import { type WeatherData } from "../../types/weather";

const WeatherPage: React.FC = () => {

  const [city, setCity] = useState("Ужгород");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (targetCity: string) => {
    if (!targetCity.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&units=metric&lang=uk&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )

      if (!res.ok) {
        throw new Error("Місто не знайдено")
      }

      const data = await res.json();

      setWeather(data);
      setCity(targetCity);
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div>
      <main>
        <div>WW</div>
        {
          weather &&
          <div>
            <h1>
              {Math.round(weather.main.temp)}°
            </h1>
            <div>
              <h2>{weather.name}</h2>
            </div>
          </div>
        }
      </main>

      {
        weather && <WeatherCard data={weather} onSearch={fetchWeather} />
      }
    </div>
  )
}

export { WeatherPage }