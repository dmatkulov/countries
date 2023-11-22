import React, {useCallback, useEffect, useState} from 'react';
import {ApiBorder, ApiState} from '../../types';
import axios from 'axios';

interface Props {
  alpha3Code: string | null;
}

const CountryInfo: React.FC<Props> = ({alpha3Code}) => {
  const [country, setCountry] = useState<ApiState | null>(null);
  const [borderCountry, setBorderCountry] = useState<ApiBorder[]>([]);
  
  const fetchCountry = useCallback(async (alpha3Code: string) => {
    try {
      const countryResponse = await axios.get<ApiState>('alpha/' + `${alpha3Code}`);
      
      if (countryResponse.data.borders) {
        const promises = countryResponse.data.borders.map(async (border) => {
          const borderResponse = await axios.get('alpha/' + `${border}`);
          return {
            name: borderResponse.data.name,
            alpha3Code: borderResponse.data.alpha3Code,
          };
        });
          const newBorder = await Promise.all(promises);
          setBorderCountry(newBorder);
      }
      
      
      
      setCountry(countryResponse.data);
    } catch (error) {
      console.error('Error fetching country:', error);
    }
  }, []);
  
  useEffect(() => {
    if (alpha3Code) {
      void fetchCountry(alpha3Code);
    }
  }, [fetchCountry, alpha3Code]);
  
  return country && (
    <div style={{display: "block"}}>
      Name: {country.name}
      Native name: {country.nativeName}
      Population: {country.population}
      Capital: {country.capital}
      
      {borderCountry.length > 0 ? (
        <>
          <p>Borders:</p>
          <ul>
            {borderCountry.map((border) => (
              <li key={border.alpha3Code}>{border.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>No borders</p>
      )}
      
      <div>
        <img src={country.flags.svg} alt={country.name}/>
      </div>
    </div>
  );
};

export default CountryInfo;