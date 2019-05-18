import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import Header from './Header';
import Profile from './Profile';

import './index.css';

class App extends React.PureComponent {
  handleSubmit = (value) => {
    console.log(value);
  };

  render() {
    return (
      <div className="App">
        <Header handleSubmit={this.handleSubmit} />
        <Grid className="App-intro">
          <br />
          <Row>
            <Col xs={3}>
              <Profile
                name="Federico Gonzalez"
                date={new Date().toDateString()}
                text="Texto bla"
                comment="esto es un comentario"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
