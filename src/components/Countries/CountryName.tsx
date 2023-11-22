import React from 'react';

interface Props {
  name: string;
  onNameClick: React.MouseEventHandler;
}

const CountryName: React.FC<Props> = React.memo(function CountryName({name, onNameClick}) {
  return (
    <p
      className="
        px-3
        py-2
        mb-1
        hover:bg-amber-500
        rounded-full
        hover:text-white
        cursor-pointer"
      onClick={onNameClick}>
      {name}
    </p>
  );
}, (prevProps, nextProps) => {
  return prevProps.name === nextProps.name;
});

export default CountryName;