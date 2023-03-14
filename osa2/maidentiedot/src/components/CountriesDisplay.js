import Country from "./Country"

const CountryName = ({ country, buttonClickHandler }) => {
    return (
        <li>{country.name.common}<button onClick={buttonClickHandler} value={country.name.common}>show</button></li>
    )
}

const CountriesDisplay = (props) => {
    const countries = props.countries
    if (countries.length === 1){
        return (
            <Country country={countries[0]} />
        )
    }

    if (countries.length > 10){
        return (
            <div>
                <p>Too many matches, specify another filter</p>
            </div>
        )
    }
    return (
        <div>
            <ul>
                {countries.map(country => <CountryName key={country.name.common} country={country} buttonClickHandler={props.buttonClickHandler} />)}
            </ul>
        </div>
    )
}

export default CountriesDisplay