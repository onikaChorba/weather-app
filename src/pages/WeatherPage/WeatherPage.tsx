import "./WeatherPage.css";
import logo from "../../assets/icons/logo.svg";
import React, { useEffect, useState } from "react";
import { Loader, WeatherCard } from "../../components";
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
    <div className="weather-page-layout">
      <main className="hero-section">
        <div className="logo"><img src={logo} alt="logo" /></div>

        <div className="main-display">
          {
            loading ? (
              <div className="loader-wrapper"><Loader /></div>
            ) : error ?
              (
                <div className="location-details error-state">
                  <div className="hero-content">
                    <h1 className="hero-temp">--°</h1>
                    <div>
                      <h2 className="hero-city">{error}</h2>
                      <p className="hero-date">Спробуйте іншу назву</p>
                    </div>
                  </div>
                </div>
              ) : weather && (<div className="location-details">
                <div className="hero-content">
                  <h1 className="hero-temp">
                    {Math.round(weather.main.temp)}°
                  </h1>
                  <div>
                    <h2 className="hero-city">{weather.name}</h2>
                    <p className="hero-date">
                      {new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })} -
                      {" "}{new Date().toLocaleDateString('uk-UA', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                        year: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" className="weather-status-icon" />
              </div>)
          }
        </div>
      </main>

      {
        weather && <WeatherCard data={weather} error={error} loading={loading} onSearch={fetchWeather} />
      }
    </div>
  )
}

export { WeatherPage }