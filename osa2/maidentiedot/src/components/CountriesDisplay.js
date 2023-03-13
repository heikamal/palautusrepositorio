import CountryName from "./CountryName"
import Country from "./Country"

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