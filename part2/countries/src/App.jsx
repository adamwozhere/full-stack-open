import { useState, useEffect } from 'react';
import Search from './components/Search';
import axios from 'axios';
import CountriesList from './components/CountriesList';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const request = axios.get(
      'https://studies.cs.helsinki.fi/restcountries/api/all'
    );
    request
      .then((response) => response.data)
      .then((data) => setCountries(data))
      .catch((error) => console.error(`fetch error: ${error}`));
  }, []);

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (!countries) return null;

  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Countries</h1>
      <Search search={search} onSearchChange={onSearchChange} />
      <pre>{JSON.stringify(countries[0], null, 2)}</pre>
      <CountriesList countries={filtered} selectCountry={setSearch} />
    </div>
  );
};

export default App;

