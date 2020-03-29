import React from 'react';
import { connect } from 'react-redux';
import { Row, Container, Spinner } from 'react-bootstrap';
import * as actions from '../actions';
import ExchangeRate from './ExchangeRate';

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

    if (exchangeDataState !== 'success') {
      return <Spinner animation="border" />;
    }
    return (
      <Container>
        <Container fluid className="border border-grey rounded-bottom p-3">
          {allIds.map(item => <Row as={ExchangeRate} formId={item} key={item} className="justify-content-md-center" />)}
        </Container>
      </Container>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(App);
