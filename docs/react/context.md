# Contexto
Con React, es fácil rastrear el flujo de datos a través de sus componentes.
Al ver un componente, podemos ver que `props` se están pasando, lo que hace que las aplicaciones sean fáciles de entender.

En algunos casos, deseamos pasar datos a través del árbol de componentes sin tener que pasar la `prop` de forma manual por todos los niveles. Podemos hacerlo directamente en React con la poderosa *API de contexto*.
Si bien tiene una funcionalidad interesante, no es recomendado utilizarla, a continuaciones veremos en que casos si y en que casos no hay que usarla.

Nota: En react 16.3 la api de contexto cambio completamente.

## Por qué no usar el contexto
- La gran mayoría de las aplicaciones no necesitan usar contexto.
- Si queres que tu aplicación sea estable, no uses contexto. Es una API experimental y es probable que se rompa en versiones futuras de React.
- Si no está familiarizado con las bibliotecas de administración de estados como Redux o MobX, no use el contexto. Para muchas aplicaciones prácticas, estas bibliotecas y sus bindings a React son una buena opción para administrar el estado que es relevante para muchos componentes. Es mucho más probable que Redux sea la solución correcta para su problema que contexto.
- Si todavía estás aprendiendo React, no uses contexto. Por lo general, hay una mejor manera de implementar la funcionalidad simplemente usando `props` o `state`.
- Si insiste en usar el contexto a pesar de estas advertencias, intente aislar su uso en un área pequeña y evite usar la API contextual directamente cuando sea posible para que sea más fácil actualizar cuando la API cambie.

## Cómo usar el contexto
Supongamos que tenemos esta estructura:
```javascript
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.props.color}}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button color={this.props.color}>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const color = "purple";
    const children = this.props.messages.map((message) =>
      <Message text={message.text} color={color} />
    );
    return <div>{children}</div>;
  }
}
```
En este ejemplo pasamos la `prop` color entre las tres componentes.
Con contexto podemos pasarlo directamente.

```javascript
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }

  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
};
```

Al agregar `childContextTypes` y `getChildContext` a `MessageList` (el proveedor de contexto), React transfiere la información automáticamente y cualquier componente en el subárbol (en este caso, `Button`) puede acceder definiendo `contextTypes`.
Si `contextTypes` no está definido, el contexto será un objeto vacío.

## Acoplamiento entre padres e hijos
El contexto también nos permite crear una API donde los padres y los hijos se comunican.
Por ejemplo, una biblioteca que funciona de esta manera es React Router V4.

## Uso de contexto en el ciclo de vida
Si el componente tiene `contextTypes` definido a varios métodos del ciclo de vida les llega un parametro adicional:
- `constructor(props, context)`
- `componentWillReceiveProps(nextProps, nextContext)`
- `shouldComponentUpdate(nextProps, nextState, nextContext)`
- `componentWillUpdate(nextProps, nextState, nextContext)`

## Actualizando el contexto
No lo hagas
React tiene una API para actualizar el contexto, pero está fundamentalmente rota y no deberías usarla.
Mas información sobre esto: [updating context](https://5abc31d8be40f1556f06c4be--reactjs.netlify.com/docs/context.html#updating-context)

### Documentación oficial:
- https://5abc31d8be40f1556f06c4be--reactjs.netlify.com/docs/context.html
