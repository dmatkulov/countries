import React from 'react';
import {ApiBorder} from '../../types';

interface Props {
  borders: ApiBorder[];
}

const CountryBorders: React.FC<Props> = ({borders}) => {
  return (
    <div>
      {borders.map((border) => (
        <div
          className="flex items-center mb-2"
          key={border.alpha3Code}
        >
          <div className="basis-8 me-2">
            <img src={border.flag} alt={border.name}/>
          </div>
          {border.name}
        </div>
      ))}
    </div>
  );
};

export default CountryBorders;