import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import countriesService from "./services/countries"
import countries from './services/countries'

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

  console.log(Object.values(country.languages))

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
    </>
  )
}

const CountryList = ({allCountries: countries, countryFilter: countryFilter }) => {

  let filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(countryFilter))

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
          <p key={country.name.common}>{country.name.common}</p>
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
      <CountryList allCountries={allCountries} countryFilter={countryFilter}/>
    </>
  )
}

export default App
