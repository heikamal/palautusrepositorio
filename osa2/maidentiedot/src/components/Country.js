const Country = ({ country} ) => {
    
    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            {Object.keys(country.languages).map((lng) => (<li key={lng}>{country.languages[lng]}</li>))}
            <br></br>
            <img src={country.flags.png} alt={`Image of ${country.name.common}'s flag`} />
        </div>
    )
}

export default Country