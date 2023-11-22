import React, {useCallback, useEffect, useState} from 'react';
import {ApiBorder, ApiState} from '../../types';
import axios from 'axios';
import CountryBorders from './CountryBorders';

interface Props {
  alpha3Code: string | null;
}

const CountryInfo: React.FC<Props> = ({alpha3Code}) => {
  const [country, setCountry] = useState<ApiState | null>(null);
  const [borderCountry, setBorderCountry] = useState<ApiBorder[]>([]);
  
  const fetchCountry = useCallback(async (alpha3Code: string) => {
    try {
      const countryResponse = await axios.get<ApiState>('alpha/' + `${alpha3Code}`);
      
      if (countryResponse.data.borders && countryResponse.data.borders.length > 0) {
        const promises = countryResponse.data.borders.map(async (border) => {
          const borderResponse = await axios.get('alpha/' + `${border}`);
          return {
            name: borderResponse.data.name,
            alpha3Code: borderResponse.data.alpha3Code,
            flag: borderResponse.data.flag,
          };
        });
        const newBorder = await Promise.all(promises);
        setBorderCountry(newBorder);
      } else {
        setBorderCountry([]);
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
    <>
      <div
        className="bg-white p-7 rounded grow"
        style={{height: '80vh'}}
      >
        <div className="mb-4">
          <p className="text-xl font-bold  text-blue-700"
          >
            {country.name}
          </p>
        </div>
        
        <div className="flex justify-between pb-12 mb-12 border-b">
          <div>
            <div className="mb-4">
              Native name: <strong>{country.nativeName}</strong>
            </div>
            <div className="mb-4">
              Population: <strong>{country.population}</strong>
            </div>
            <div className="mb-4">
              Capital: <strong>{country.capital}</strong>
            </div>
          </div>
          <div>
            <img
              className="w-40 border"
              src={country.flag}
              alt={country.name}
            />
          </div>
        </div>
        
        {borderCountry.length > 0 ? (
          <div>
            <h4 className="my-6">Borders:</h4>
            <CountryBorders
              borders={borderCountry}
            />
          </div>
        ) : (
          <p className="text-2xl text-gray-200">No borders</p>
        )}
      </div>
    </>
  );
};

export default CountryInfo;