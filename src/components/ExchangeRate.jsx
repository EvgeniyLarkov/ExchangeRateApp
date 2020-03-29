import React from 'react';
import { connect } from 'react-redux';
import {
  Col, Row, DropdownButton, Dropdown, InputGroup, FormControl,
} from 'react-bootstrap';
import * as actions from '../actions';
import { calculateValue } from '../utils';
import ExchangeRateResult from './ExchangeRateResult';

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
      <InputGroup>
        <FormControl
          aria-label="Currency"
          value={formData[id].value}
          onChange={({ target: { value } }) => {
            this.handleCurrencyValueChange(id, value);
          }}
        />

        <DropdownButton
          as={InputGroup.Append}
          variant="outline-secondary"
          title={formData[id].currency}
        >
          {currencies.map(item => (
            <Dropdown.Item
              as="button"
              key={item}
              onClick={(e) => {
                e.preventDefault();
                this.handleCurrencyNameChange(id, item);
              }}
            >
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </InputGroup>
    );
  }

  render() {
    const { formId, formData } = this.props;
    return (
      <>
        <Row as="form" id={formId}>
          <Col>
            {this.renderForm(1)}
          </Col>
          <Col>
            {this.renderForm(2)}
          </Col>
        </Row>
        <Row>
          {ExchangeRateResult(formData[1], formData[2])}
        </Row>
      </>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(ExchangeRateForm);
