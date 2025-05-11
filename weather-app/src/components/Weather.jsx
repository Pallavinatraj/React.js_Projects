import React, {useEffect, useRef, useState} from 'react'
import './Weather.css';
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import rain from '../assets/rain.png'




const Weather = () => {
  const inputRef = useRef();
  let [WeatherData, setWeatherData] = useState(false);

  const allIcons = {
  "01d": clear,
  "01n": clear,
  "02d": cloud,
  "02n": cloud,
  "03d": cloud,
  "03n": cloud,
  "04d": drizzle,
  "04n": drizzle,
  "09d": rain,
  "09n": rain,
  "10d": rain,
  "10n": rain,
  "13d": snow,
  "13n": snow,
   };
   
  const search = async (city)=>{
    if(city===""){
      alert("Enter City Name");
      return;
    }
    try {
      const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      let res = await fetch(url);
      let data = await res.json();

      if(!res.ok){
        alert(data.message);
        return;
      }
      
      console.log(data);
      const iconCode = data.weather?.[0]?.icon;
      const icon = allIcons[iconCode] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        icon: icon
      });
    } catch (error) {
      setWeatherData(false);
      console.log("Error in fetch weathe data");
    }
  }

  useEffect (()=>{
     search("Hassan");
  },[])

  return (
  <div className='weather'>
    <div className="search-bar">
    <input type="text" placeholder='Search' ref={inputRef} />
    <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)}/>
     </div>

    {WeatherData ?<>
      <img src={WeatherData.icon} alt="weather icon" className='weather_icon' />
      <p className="temperature">{WeatherData.temperature}°C</p>
      <p className='location'>{WeatherData.location}</p>
      <div className="weather_data">
        <div className="col">
          <img src={humidity} alt="humidity" />
          <div>
            <p>{WeatherData.humidity} % </p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="wind" />
          <div>
            <p>{WeatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </> :<></>}
    </div>
  )

}

export default Weather
