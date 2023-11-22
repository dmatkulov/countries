import CountryInfo from '../components/Countries/CountryInfo';
import {useCallback, useEffect, useState} from 'react';
import {ApiCountries, Countries} from '../types';
import axios from 'axios';
import CountryName from '../components/Countries/CountryName';

const COUNTRY_URL = 'all?fields=alpha3Code,name';

function App() {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    void fetchData();
  }, [fetchData]);
  
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto px-4 flex gap-4 py-7 justify-center items-center">
        <div className="bg-white p-6 rounded overflow-y-scroll basis-1/4" style={{maxHeight: '80vh'}}>
          {loading && (
            <h1>Loading!</h1>
          )}
          {countries.map((country) => (
            <CountryName
              key={country.alpha3Code}
              name={country.name}
              onNameClick={() => setSelectedCode(country.alpha3Code)}
            />
          ))}
        </div>
        <div className="basis-2/3">
          {selectedCode ? (
            <CountryInfo
              alpha3Code={selectedCode}
            />
          ) : (
            <div
              className="text-2xl text-gray-500 flex justify-center"
            >
              Select a country to see more information
            </div>
          )}
        </div>
      </div>
    </div>
  
  );
}

export default App;
