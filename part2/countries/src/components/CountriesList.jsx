const CountriesList = ({ countries, selectCountry }) => {
  if (countries.length === 1) {
    return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <p>capital: {countries[0].capital[0]}</p>
        <p>area: {countries[0].area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(countries[0].languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={countries[0].flags.png} alt={countries[0].flags.alt} />
        <h3>Weather in {countries[0].capital[0]}</h3>
        <p>temperature </p>
      </div>
    );
  } else if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => selectCountry(country.name.common)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  }
};
export default CountriesList;

