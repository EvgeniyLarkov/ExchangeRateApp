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
  changeCurrencyName: actions.changeCurrencyName,
  changeCurrencyValue: actions.changeCurrencyValue,
};

class ExchangeRateForm extends React.Component {
  handleCurrencyValueChange(field, value) {
    const { formData, ratesById } = this.props;

    const target = (field === 1) ? 2 : 1;
    const targetName = formData[field].currency;
    const currentName = formData[target].currency;

    const targetValue = calculateValue(value, ratesById[currentName], ratesById[targetName]);

    this.changeCurrencyValue(field, value);
    this.changeCurrencyValue(target, targetValue);
  }

  handleCurrencyNameChange(field, value) {
    const { changeCurrencyName, formId } = this.props;
    changeCurrencyName({ field, value, id: formId });
  }

  changeCurrencyValue(field, value) {
    const { changeCurrencyValue, formId } = this.props;
    changeCurrencyValue({ field, value, id: formId });
  }

  renderForm(id) {
    const { formData, ratesById } = this.props;
    const currencies = Object.keys(ratesById);

    return (
      <div className="flex_inline" key={id}>
        <input
          value={formData[id].value}
          onChange={({ target: { value } }) => {
            this.handleCurrencyValueChange(id, value);
          }}
        />
        <div>
          <Combobox
            data={currencies}
            value={formData[id].currency}
            onChange={value => this.handleCurrencyNameChange(id, value)}
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
