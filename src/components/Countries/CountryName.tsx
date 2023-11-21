import React from 'react';

interface Props {
  name: string;
}
const CountryName: React.FC<Props> = ({name}) => {
  return (
    <div>
      {name}
    </div>
  );
};

export default CountryName;