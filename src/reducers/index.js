import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const defaultState = {
  byId: {
    form1: {
      1: {
        currency: 'RUB',
        value: '',
      },
      2: {
        currency: 'USD',
        value: '',
      },
    },
  },
  allIds: ['form1'],
};

const exchangeRates = handleActions({
  [actions.changeCurrencyName](state, { payload: { value, field, id } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [id]: { ...byId[id], [field]: { ...byId[id][field], currency: value } } },
      allIds,
    };
  },
  [actions.changeCurrencyValue](state, { payload: { value, field, id } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [id]: { ...byId[id], [field]: { ...byId[id][field], value } } },
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
      ...state, state: 'requested',
    };
  },
  [actions.updateCurrencyRateSuccess](state) {
    return {
      ...state, state: 'success',
    };
  },
  [actions.updateCurrencyRateFailure](state) {
    return {
      ...state, state: 'failure',
    };
  },
}, { state: 'init' });

export default combineReducers({
  exchangeData,
  exchangeRates,
});
