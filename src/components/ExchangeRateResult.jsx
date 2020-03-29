import React from 'react';
import { Col } from 'react-bootstrap';

const exchangeRateResult = (currency1, currency2) => (
  <Col as="span" className="text-center mt-3">
    {currency1.value}
    {' '}
    {currency1.currency}
    {' '}
    is equal
    {' '}
    {currency2.value}
    {' '}
    {currency2.currency}
  </Col>
);

export default exchangeRateResult;
