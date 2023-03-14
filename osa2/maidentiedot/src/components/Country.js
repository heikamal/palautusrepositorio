
import Weather from "./Weather"

const Country = ({ country} ) => {
    
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}<br/>
            area {country.area}</p>
            <h3>languages:</h3>
            {Object.keys(country.languages).map((lng) => (<li key={lng}>{country.languages[lng]}</li>))}
            <br></br>
            <img src={country.flags.png} alt={`Image of ${country.name.common}'s flag`} />
            <Weather country={country} />
        </div>
    )
}

export default Country