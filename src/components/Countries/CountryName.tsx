import React from 'react';

interface Props {
  name: string;
  onNameClick: React.MouseEventHandler;
}
const CountryName: React.FC<Props> = React.memo(function CountryName({name, onNameClick}) {
  return (
    <div>
      <p onClick={onNameClick}>
        {name}
      </p>
    </div>
  );
},(prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});

export default CountryName;