import CountryInfo from '../components/Countries/CountryInfo';
import {useCallback, useEffect, useState} from 'react';
import {ApiCountries, Countries} from '../types';
import axios from 'axios';
import CountryName from '../components/Countries/CountryName';

const COUNTRY_URL = 'all?fields=alpha3Code,name';

function App() {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  
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
    <div style={{display: 'flex'}}>
    <div>
      {countries.map((country) => (
        <CountryName
          key={country.alpha3Code}
          name={country.name}
          onNameClick={() => setSelectedCode(country.alpha3Code)}
        />
      ))}
    </div>
      <div>
        <CountryInfo
          alpha3Code={selectedCode}
        />
      </div>
    </div>
  );
}

export default App;
