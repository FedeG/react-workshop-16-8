import React from 'react';
import { Alert } from 'react-bootstrap';

import logo from './logo.svg';

import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">React 16.8</h1>
    </header>
    <div className="App-intro">
      <Alert variant="warning">
        Para comenzar con el curso, podes ir a la documentación oficial del mismo
      </Alert>
      <a href="https://fedeg.github.io/react-workshop-16-8/#/">Documentación del curso</a>
    </div>
  </div>
);

export default App;
