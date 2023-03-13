const CountryName = ({ country, buttonClickHandler }) => {
    return (
        <li>{country.name.common}<button onClick={buttonClickHandler} value={country.name.common}>show</button></li>
    )
}

export default CountryName