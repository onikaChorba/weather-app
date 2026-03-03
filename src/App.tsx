import { useState } from 'react'
import './App.css';

type WeatherData = {
  name: string;
  temp: number;
  icon: string;
  description: string;
}

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=uk&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )

      if (!res.ok) {
        throw new Error("Місто не знайдено")
      }

      const data = await res.json();

      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        icon: data.weather[0].description,
        description: data.weather[0].description
      })
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  console.log(import.meta.env.VITE_WEATHER_API_KEY)

  return (
    <div className='app'>
      <h1>Погода</h1>
      <div className='search'>
        <input
          placeholder='Введіть місто'
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Показати</button>
      </div>

      {
        loading && <div className='loader'>
          Завантаження ....
        </div>
      }
      {
        error && <p>{error}</p>
      }

      {
        weather && (
          <div>
            <h2>{weather.name}</h2>
            <p>{weather.temp}</p>
            <p>{weather.description}</p>
          </div>
        )
      }
    </div>
  )
}

export default App
