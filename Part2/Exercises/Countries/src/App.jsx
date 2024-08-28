import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import countriesService from "./services/countries"
import weatherService from "./services/weather"

const CountrySearch = ({countryFilter: countryFilter, setCountryFilter: setCountryFilter}) => {
  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <div>
      Find Countries <input value={countryFilter} onChange={handleFilterChange}/>
    </div>
  )
}

const CountryDisplay = ({country: country}) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    weatherService.getWeather(country.capital[0]).then((data) => {
      setWeatherData(data.data)
  })
  }, [])
  

  console.log(weatherData)

  let weatherJSX = <></>

  if (weatherData !== null) {
    weatherJSX = 
    <>
      <h2>{country.capital[0]}</h2>
      Temperature {weatherData.current.temp_c} celsius
      <br />
      <br />
      <div style={{textAlign: "left"}}>
        <img src={weatherData.current.condition.icon} alt="" />
      </div>
      Wind {weatherData.current.wind_kph} km/h
    </>
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} km²</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map((language) => {return (<li key={language}>{language}</li>)})}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weatherJSX}
    </>
  )
}

const CountryList = ({allCountries: countries, countryFilter: countryFilter, setCountryFilter: setCountryFilter}) => {

  let filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (filteredCountries.length === 0) {
    return (
      <p>No matches</p>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <CountryDisplay country={filteredCountries[0]}/>
    )
  } else {
    return (
      <>
        {filteredCountries.map((country) => { return (
          <div key={country.name.common}>
            {country.name.common} <button onClick={() => setCountryFilter(country.name.common)}>show</button>
          </div>
        )
        })}
      </>
    )
  }
}

function App() {
  const [countryFilter, setCountryFilter] = useState("")
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    countriesService.getAllCountries().then( countries =>
      setAllCountries(countries)
    ) 
  }, [])


  return (
    <>
      <CountrySearch countryFilter={countryFilter} setCountryFilter={setCountryFilter}/>
      <CountryList allCountries={allCountries} countryFilter={countryFilter} setCountryFilter={setCountryFilter}/>
    </>
  )
}

export default App
