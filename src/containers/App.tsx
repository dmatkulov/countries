import CountriesList from '../components/Countries/CountriesList';
import CountryInfo from '../components/Countries/CountryInfo';
import {useCallback, useEffect, useState} from 'react';
import {ApiCountries, Countries} from '../types';
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v2/';
const COUNTRY_URL = BASE_URL + 'all?fields=alpha3Code,name';

function App() {
  const [countries, setCountries] = useState<Countries[]>([]);
  
  const fetchData = useCallback(async () => {
    try {
    const countriesResponse = await axios.get<ApiCountries[]>(COUNTRY_URL);
    
    const promises = countriesResponse.data.map((country) => {
      return {
        name: country.name,
        alpha3Code: country.alpha3Code,
      };
    });
    
    const countries = await Promise.all(promises);
    setCountries(countries);
    } finally {
      console.log('create country list');
    }
  }, []);
  
  useEffect(() => {
    void fetchData();
  }, [fetchData]);
  
  return (
    <>
    <div>
      <CountriesList
        countries={countries}
      />
    </div>
      <div>
        <CountryInfo/>
      </div>
    </>
  );
}

export default App;
