import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {WiDegrees} from "react-icons/wi"


function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [cityTime, setCityTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const apiUrl = "http://api.weatherapi.com/v1/current.json";
  const apiKey = "11ad2b6063ab4d7797e171314231010";

  const getWeatherData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          key: apiKey,
          q: city,
        },
      });
      setWeather(response.data);
      setCityTime(response.data.location.localtime);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}: ${minutes}`);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="App">
      <div className="altApp">
      <header>
        <h1>About Weather</h1>
        <p>Now hours: {currentTime}</p>
        {cityTime && (
          <p>
            {city} O'clock: {cityTime}
          </p>
        )}
      </header>
      <div className="container">
        <div className="search_box">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter the city"
          />
          <button onClick={getWeatherData}>Bring the information</button>
        </div>
        {weather && (
          <div className="weather_container">
            <h2>
              {weather.location.name}, {weather.location.country}
            </h2>
            <p>Temperature: {weather.current.temp_c}<WiDegrees />C</p>
            <p>Weather: {weather.current.condition.text}</p>
            <img src={weather.current.condition.icon} alt="weather_img" />
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default App;
