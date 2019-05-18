import React from 'react';
import ReactDOM from 'react-dom';
import {
  Button, Grid,
  Row, Col,
} from 'react-bootstrap';

import Profile from './Profile';
import logo from '../../logo.svg';
import './index.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Row>
        <input className="search-input" type="text" />
        <Button>Buscar</Button>
      </Row>
    </header>
    <Grid className="App-intro">
      <br />
      <Row>
        <Col xs={3}>
          <Profile />
        </Col>
      </Row>
    </Grid>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
