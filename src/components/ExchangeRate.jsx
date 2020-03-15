import React from 'react';
import { connect } from 'react-redux';
import Combobox from 'react-widgets/lib/Combobox';
import * as actions from '../actions';
import { calculateValue } from '../utils';

const mapStateToProps = (state, ownProps) => {
  const { formId } = ownProps;
  const { rates, base } = state.exchangeData;
  return {
    ratesById: { ...rates, [base]: 1 },
    exchangeData: state.exchangeData,
    formData: state.exchangeRates.byId[formId],
    formId,
  };
};

const actionCreators = {
  changeCurrencyName: actions.changeCurrency,
  changeCurrencyAmount: actions.changeCurrencyAmount,
};

class ExchangeRateForm extends React.Component {
  handleCurrencyAmountChange(fieldName, value) {
    const { formData, ratesById } = this.props;

    const targetName = (fieldName === 'currencyName1') ? 'currencyName2' : 'currencyName1';
    const currentValueName = (fieldName === 'currencyName1') ? 'currencyValue1' : 'currencyValue2';
    const targetValueName = (fieldName === 'currencyName1') ? 'currencyValue2' : 'currencyValue1';
    const target = formData[targetName];
    const current = formData[fieldName];

    const result = calculateValue(value, ratesById[target], ratesById[current]);

    this.changeCurrencyAmount(targetValueName, result);
    this.changeCurrencyAmount(currentValueName, value);
  }

  handleCurrencyNameChange(fieldName, value) {
    const { changeCurrencyName, formId } = this.props;
    changeCurrencyName({ fieldName, value, id: formId });
  }

  changeCurrencyAmount(fieldName, value) {
    const { changeCurrencyAmount, formId } = this.props;
    changeCurrencyAmount({ fieldName, value, id: formId });
  }

  renderForm(id) {
    const { formData, ratesById } = this.props;
    const fieldName1 = `currencyValue${id}`;
    const fieldName2 = `currencyName${id}`;
    const currencies = Object.keys(ratesById);

    return (
      <div className="flex_inline" key={id}>
        <input
          value={formData[fieldName1]}
          onChange={({ target: { value } }) => {
            this.handleCurrencyAmountChange(fieldName2, value);
          }}
        />
        <div>
          <Combobox
            data={currencies}
            value={formData[fieldName2]}
            onChange={value => this.handleCurrencyNameChange(fieldName2, value)}
            filter="contains"
          />
        </div>
      </div>
    );
  }

  render() {
    const { formId } = this.props;
    return (
      <form id={formId}>
        {this.renderForm(1)}
        {this.renderForm(2)}
      </form>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ExchangeRateForm);
