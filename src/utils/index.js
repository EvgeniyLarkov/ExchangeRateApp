import { round } from 'mathjs';

export const currencies = ['RUS', 'ENG'];

export const routes = {
  currencyRatePath: () => 'https://api.exchangeratesapi.io/latest',
};

export const calculateValue = (value, rate1, rate2) => {
  const result = value * (rate1 / rate2);
  return round(result, 2);
};
