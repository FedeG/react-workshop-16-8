# Verificación de tipos con React

A medida que una aplicación crece, puede tener muchos errores con la verificación de tipos o incluso no tener documentación sobre el tipo los tipos de datos.
Para algunas aplicaciones, podemos usar extensiones de JavaScript como Flow o TypeScript para tipar toda la aplicación.
Pero incluso si no los usamos, React tiene algunas capacidades incorporadas de verificación de tipo.
Para ejecutar la verificación de tipo en las `props` de un componente, podemos establear distintos tipos de datos para cada `prop` mediante el uso de `propTypes`:

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

`PropTypes` exporta una variedad de validadores que pueden utilizarse para garantizar que los datos que reciba un componente sean válidos.

## Validadores incluidos
```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Podemos declarar si una prop es requerida o no (por default, son opcionales)
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Cualquier cosa para renderizar: numero, text, elemento React, una lista de elementos o Fragmentan
  optionalNode: PropTypes.node,

  // Un elemento React.
  optionalElement: PropTypes.element,

  // Una instancia de una clase determinada
  optionalMessage: PropTypes.instanceOf(Message),

  // Un elemento de un conjunto de opciones
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // Se pueda también decir que el dato puede tener distintos tipos
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Una lista que contiene numeros
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Un objeto donde los valores son numericos
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Un objeto con determinadas claves
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // Podemos pedir que una props sea requerida
  requiredFunc: PropTypes.func.isRequired,

  // Cualquier valor pero que este definida
  requiredAny: PropTypes.any.isRequired,

  // Podemos incluso crear una función de validacion.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  }
};
```

## Valores predeterminados
Podemos definir valores predeterminados para las `props` usando `defaultProps`:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};

Greeting.defaultProps = {
  name: 'Stranger'
};

ReactDOM.render(
  <Greeting />,
  document.getElementById('root')
);
```

### Documentación oficial:
- https://reactjs.org/docs/typechecking-with-proptypes.html
