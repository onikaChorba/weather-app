import './WeatherCard.css';
import React, { useState } from "react";
import { type WeatherData } from "../../types/weather";

interface Props {
  data: WeatherData | null,
  error: string,
  loading: boolean,
  onSearch: (city: string) => void;
}

const WeatherCard: React.FC<Props> = ({ data, error, loading, onSearch }) => {

  const [inputValue, setInputValue] = useState('');

  const handleSearchClick = () => {
    onSearch(inputValue);
    setInputValue("");
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearchClick();
  }

  return (
    <aside className="glass-panel">
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          className="glass-input"
          onKeyDown={handleKeyPress}
          placeholder="Введіть локацію..."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSearchClick} className="search-button">{loading ? "..." : "Показати погоду"}</button>
      </div>

      {
        !loading && !error && data && (
          <div className="weather-details">
            <p className="section-label">Погодні деталі...</p>
            <p className="condition-highlight">{data.weather[0].description}</p>

            <div className="stats-list">
              <div className="stats-row">
                <span> Максимальна температура</span>
                <span>{Math.round(data.main.temp_max)}°</span>
              </div>
              <div className="stats-row">
                <span> Мінімальна температура</span>
                <span>{Math.round(data.main.temp_min)}°</span>
              </div>
              <div className="stats-row">
                <span> Вологість</span>
                <span>{data.main.humidity} %</span>
              </div>
              <div className="stats-row">
                <span> Хмарність</span>
                <span>{data.clouds.all}</span>
              </div>
              <div className="stats-row">
                <span> Вітер</span>
                <span>{data.wind.speed} km/h</span>
              </div>
            </div>
          </div>
        )
      }

      {error && !loading && (
        <div className='weather-details'>
          <p className='condition-hightlight'>
            Інформація не доступна
          </p>
        </div>
      )}
    </aside>
  )
}

export { WeatherCard };