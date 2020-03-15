import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const defaultState = {
  byId: {
    form1: {
      currencyName1: 'RUB',
      currencyName2: 'USD',
      currencyValue1: '',
      currencyValue2: '',
    },
  },
  allIds: ['form1'],
};

const exchangeRates = handleActions({
  [actions.changeCurrency](state, { payload: { value, fieldName, id } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [id]: { ...byId[id], [fieldName]: value } },
      allIds,
    };
  },
  [actions.changeCurrencyAmount](state, { payload: { value, fieldName, id } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [id]: { ...byId[id], [fieldName]: value } },
      allIds,
    };
  },
  [actions.removeExchangeRate](state, { payload: { id } }) {
    const { byId, allIds } = state;
    return {
      byId: _.omit(byId, id),
      allIds: _.without(allIds, id),
    };
  },
}, defaultState);

const exchangeData = handleActions({
  [actions.updateCurrencyRate](state, { payload: { data } }) {
    return {
      ...state, ...data,
    };
  },
  [actions.updateCurrencyRateRequest](state) {
    return {
      ...state, state: 'pending',
    };
  },
  [actions.updateCurrencyRateSuccess](state) {
    return {
      ...state, state: 'fulfilled',
    };
  },
  [actions.updateCurrencyRateFailure](state) {
    return {
      ...state, state: 'rejected',
    };
  },
}, { state: 'init' });

export default combineReducers({
  exchangeData,
  exchangeRates,
});
