# Representación condicional

En React, podemos crear componentes distintos que encapsulan el comportamiento que se necesita.
Luego, podemos procesar solo algunos de ellos, dependiendo del estado de la aplicación.

La representación condicional en React funciona de la misma forma que las condiciones funcionan en JavaScript.
Vamos a utilizar operadores JavaScript como `if` o el `if` ternario (`? :`) para crear elementos que representen el estado actual, y permitan que React actualice la interfaz de usuario para que coincida con ellos.

Por ejemplo:
```javascript
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  if (props.isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

## Operador &&
Otra forma de hacer un if simple es usar el operador `&&`

```javascript
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

## If-else en JSX
Como en JSX podemos utilizar JavaScript podemos directamente usar un `if` ternario:
`If` termario: `condicion ? casoTrue : casoFalse`
```javascript
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

## Evitar que los componentes se rendericen
En casos excepcionales, es posible que esperemos que un componente se oculte a pesar de que fue procesado por otro componente.
Para hacer esto, un componente puede retornar `null` en lugar de su salida de renderizado.

En el ejemplo a continuación, el `<WarningBanner/>` se representa según el valor de la `prop` llamada `warn`. Si el valor de la `prop` es `false`, entonces el componente no se muestra:

```javascript
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      showWarning: !prevState.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

Nota: El retorno de `null` en el `render` de un componente no afecta la activación de los métodos del ciclo de vida del componente. Por ejemplo, se seguirán llamando `componentWillUpdate` y `componentDidUpdate`.

### Documentación oficial:
- https://reactjs.org/docs/conditional-rendering.html
