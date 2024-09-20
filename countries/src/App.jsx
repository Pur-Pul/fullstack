import { useState } from 'react'
import { useEffect } from 'react'
import countryService from './services/countries'

import './App.css'

const Filter = (props) => {
  return (
    <form>
      <div>find countries: <input value={props.filter} onChange={props.handler}/></div>
    </form>
  )
}

const CountryExpanded = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
  )
}

const CountryList = (props) => {
  if (props.selected == null) {
    if (props.countries.length > 10) {
      return (<p>Too many matches, specify another filter</p>)
    } 
    return (
      <div>
        {props.countries.map(country => <p key={country.name.official}>{country.name.common}</p>)}
      </div>
    )
  } else {
    return (<CountryExpanded country={props.selected}/>)
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('')
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        const data = response.data
        setCountries(data)
      })
      .catch(error => {
        console.log(`Couldn't fetch countries from server`);
      })
  }, [])

  useEffect(() => {
    if (countriesToShow.length == 1) {
      const country_name = countriesToShow[0].name.common
      console.log("fetching data");
      countryService
        .get(country_name)
        .then(response => {
          const data = response.data
          setSelected(data)
        })
        .catch(error => {
          console.log(`Country ${country_name} not found server`);
        })
    } else {
      console.log("not fetching")
      setSelected(null)
    }
  }, [filter])

  return (
    <div>
      <Filter filter = {filter} handler = {handleFilterChange}/>
      <CountryList countries = {countriesToShow} selected={selected}/>
    </div>
  )
}

export default App
