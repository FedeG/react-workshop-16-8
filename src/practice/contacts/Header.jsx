import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import Form from './Form';

import logo from '../../logo.svg';

const Header = ({ handleSubmit }) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <Row>
      <Form handleSubmit={handleSubmit} />
    </Row>
  </header>
);

Header.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Header;
