import { createAction } from 'redux-actions';
import axios from 'axios';
import { routes } from '../utils';

export const changeCurrency = createAction('CURRENCY_CHANGE');
export const updateCurrencyRate = createAction('CURRENCY_RATE_UPDATE');
export const removeExchangeRate = createAction('RATE_REMOVE');
export const changeCurrencyAmount = createAction('CURRENCY_AMOUNT_CHANGE');

export const updateCurrencyRateRequest = createAction('CURRENCY_RATE_UPDATE_REQUEST');
export const updateCurrencyRateSuccess = createAction('CURRENCY_RATE_UPDATE_SUCCESS');
export const updateCurrencyRateFailure = createAction('CURRENCY_RATE_UPDATE_FAILURE');

export const getCurrencyRates = () => async (dispatch) => {
  const url = routes.currencyRatePath();
  dispatch(updateCurrencyRateRequest());
  try {
    const response = await axios.get(url);
    const data = response.data;
    dispatch(updateCurrencyRate({ data }));
    dispatch(updateCurrencyRateSuccess());
  } catch (e) {
    dispatch(updateCurrencyRateFailure());
    throw e;
  }
};
