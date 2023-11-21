import React from 'react';
import CountryName from './CountryName';
import {Countries} from '../../types';

interface Props {
  countries: Countries[];
}
const CountriesList: React.FC<Props> = ({countries}) => {
  return (
    <>
      {countries.map((country) => (
      <CountryName
        key={country.alpha3Code}
        name={country.name}
      />
      ))}
    </>
  );
};

export default CountriesList;