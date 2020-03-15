import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { currency1, currency2 } = state.exchangeRates.byId;
  const props = { currency1, currency2 };
  return props;
};

class ExchangeRateResult extends React.Component {
  render() {
    const { currency1, currency2 } = this.props;
    return (
      <div className="container inline-flex">
        <div>{currency1.currency || '?'}</div>
        <div>{'=>'}</div>
        <div>{currency2.currency || '?'}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExchangeRateResult);
