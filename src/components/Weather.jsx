import React, { useEffect , useRef, useState} from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const api_key = import.meta.env.VITE_APP_ID;
  const inputRef = useRef(null);
  const [weatherData, setweatherData] = useState(false);

  const allicons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": cloud_icon,
    "04n": cloud_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": drizzle_icon,
    "11n": drizzle_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": wind_icon,
    "50n": wind_icon,
  };
  const search = async (city) => {
    if(city === ''){
      alert('Please enter a city');
      return;
    }
    try {
      const url =
        "https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}";

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allicons[data.weather[0].icon] || clear_icon;
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {}
  };
  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img src={search_icon} alt="" onClick={()=> search(inputRef.current.value)}/>
      </div>
      {weatherData?<></> : <></>}
      <img src={clear_icon} alt="" className="weather-icon" />

      <p className="temperature">20°C</p>

      <p className="location">London</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>81%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>4.5 km/h</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
