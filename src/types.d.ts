export interface Countries {
  name: string;
  alpha3Code: string;
}

export interface ApiCountries {
  name: string;
  alpha3Code: string;
  independent: boolean;
}

export interface ApiState {
  name: string;
  nativeName: string;
  capital: string;
  population: number;
  borders: Record<number, string>;
}