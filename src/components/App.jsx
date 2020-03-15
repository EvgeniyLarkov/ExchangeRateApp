import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ExchangeRate from './ExchangeRate';
// import ExchangeRateResult from './ExchangeRateResult';

const mapStateToProps = state => ({
  allIds: state.exchangeRates.allIds,
  exchangeDataState: state.exchangeData.state,
});

const actionCreators = {
  getCurrencyRates: actions.getCurrencyRates,
};

class App extends React.Component {
  componentDidMount() {
    const { getCurrencyRates } = this.props;
    getCurrencyRates();
  }

  render() {
    const { allIds, exchangeDataState } = this.props;

    if (exchangeDataState !== 'fulfilled') {
      return <div><h2>Loading...</h2></div>;
    }
    return (
      <div className="main">
        {allIds.map(item => <ExchangeRate key={item} formId={item} />)}
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);
