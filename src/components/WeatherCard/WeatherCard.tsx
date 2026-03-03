import type React from "react";
import { type WeatherData } from "../../types/weather";
import { useState } from "react";

interface Props {
  data: WeatherData,
  onSearch: (city: string) => void;
}

const WeatherCard: React.FC<Props> = ({ data, onSearch }) => {

  const [inputValue, setInputValue] = useState('');

  const handleSearchClick = () => {
    onSearch(inputValue);
    setInputValue("");
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearchClick();
  }

  return (
    <aside>
      <div>
        <input
          type="text"
          placeholder="Введіть локацію..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress} />
        <button onClick={handleSearchClick}>Показати</button>
      </div>

      <div>
        <p>Погодні деталі </p>
        <p>{data.weather[0].description}</p>
      </div>
    </aside>
  )
}

export { WeatherCard };