import axios from 'axios'
import { useState, useEffect } from 'react';
import CountriesDisplay from './components/CountriesDisplay'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [showCountries, setShowCountries] = useState([])

  // hae kaikki taulukkoon
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('suoritettu!')
        setCountries(response.data)
        setShowCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setSearchCountry(event.target.value)
    setShowCountries(countries.filter(country => country.name.common.includes(searchCountry)))
  }

  const handleCountryShow = (event) => {
    setShowCountries(countries.filter(country => country.name.common === event.target.value))
  }

  return (
    <div>
      <p>find countries <input value={searchCountry} onChange={handleCountryChange} /></p>
      <CountriesDisplay countries={showCountries} buttonClickHandler={handleCountryShow} />
    </div>
  )
}

export default App;
