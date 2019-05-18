import React from 'react';
import ReactDOM from 'react-dom';

const defaultUser = { name: 'pepe' };

const getElement = (user) => {
  if (user.name) {
    return <h1>{`Hola, ${user.name}!`}</h1>;
  }
  return <h1>Hola!</h1>;
};

ReactDOM.render(
  getElement(defaultUser),
  document.getElementById('root'),
);
