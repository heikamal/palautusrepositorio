import axios from 'axios'
import { useState, useEffect } from "react"

const WeatherDisplay = ({ weather, capital }) => {
  let tempInCelsius = parseFloat(weather.main.temp - 273.15).toFixed(2)
  let iconURL = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  let windSpd = weather.wind.speed

  return (
    <div>
        <h2>Weather in {capital}</h2>

        <p>
          temperature {tempInCelsius} Celsius<br/>
          <img src={iconURL} alt={weather.weather[0].description} /><br/>
          wind {windSpd} m/s
        </p>
        
    </div>
  )
}

const Weather = ({ country }) => {
    const APIKey = process.env.REACT_APP_API_KEY
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${APIKey}`
    const [weather, setWeather] = useState(null)

    useEffect(() => {
      axios
        .get(baseURL)
        .then(response => {
          setWeather(response.data)
        }).catch(error => {console.error(error)})
    }, [])
    
    if (weather !== null){
      return (
        <WeatherDisplay weather={weather} capital={country.capital} />
      )
    }
}

export default Weather