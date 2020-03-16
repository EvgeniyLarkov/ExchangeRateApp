import { createAction } from 'redux-actions';
import axios from 'axios';
import { routes } from '../utils';

export const changeCurrencyName = createAction('CURRENCY_NAME_CHANGE');
export const changeCurrencyValue = createAction('CURRENCY_VALUE_CHANGE');
export const updateCurrencyRate = createAction('CURRENCY_RATE_UPDATE');
export const removeExchangeRate = createAction('RATE_REMOVE');


export const updateCurrencyRateRequest = createAction('CURRENCY_RATE_UPDATE_REQUEST');
export const updateCurrencyRateSuccess = createAction('CURRENCY_RATE_UPDATE_SUCCESS');
export const updateCurrencyRateFailure = createAction('CURRENCY_RATE_UPDATE_FAILURE');

export const getCurrencyRates = () => async (dispatch) => {
  const url = routes.currencyRatePath();
  dispatch(updateCurrencyRateRequest());
  try {
    const response = await axios.get(url);
    const { data } = response;
    dispatch(updateCurrencyRate({ data }));
    dispatch(updateCurrencyRateSuccess());
  } catch (e) {
    dispatch(updateCurrencyRateFailure());
    throw e;
  }
};
