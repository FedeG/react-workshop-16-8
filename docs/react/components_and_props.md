## Componentes y props

Los componentes le permiten dividir la IU en piezas independientes y reutilizables, y pensar en cada pieza aisladamente.

Conceptualmente, los componentes son las funciónes de JavaScript.
Aceptan entradas arbitrarias (llamadas "props") y devuelven elementos React que describen lo que debería aparecer en la pantalla.

### Tipos de componentes
La forma más sencilla de definir un componente es escribir una función de JavaScript:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// O como arrow function de ES6
const Welcome = props => <h1>Hello, {props.name}</h1>;
```

Esta función es un componente React válido porque acepta un único argumento `props` (que significa propiedades y es un objeto) con datos y devuelve un elemento React.
Llamamos a dichos componentes `functional` porque son, literalmente, funciónes de JavaScript.


También podes usar una clase ES6 para definir un componente:

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Los dos componentes anteriores son equivalentes desde el punto de vista de React.

### Renderizar un componente
Anteriormente, solo encontrábamos elementos React que representan etiquetas del DOM (`<div>`, `<a>`, `<img>`, etc.)
Sin embargo, los componentes definidos por el usuario pueden usarse como elementos: `const element = <Welcome name="Sara" />;`

Cuando React ve un elemento que representa un componente definido por el usuario, pasa atributos JSX a este componente como un solo objeto. Llamamos a este objeto `props`.
Ejemplo:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

En el ejemplo anterior podemos ver como los atributos JSX que pasamos a la componente *Welcome* (`name='Sara'`) llegan como un objeto (`props`) con esa información (en este caso: `{name: 'Sara'}`)

*Nota*: Todas las componentes de React creadas por el usuario tienen que empezar con letra mayúscula ya que React/JSX interpreta que si empieza con mayúscula es una componente propio y que si empieza con minúscula es un tag HTML. [Mas información sobre esta nota](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized)

### Componiendo componentes
Los componentes pueden referirse a otros componentes en su salida.
Esto nos permite usar la misma abstracción de componentes para cualquier nivel de detalle (un botón, un formulario, un diálogo, una pantalla, etc).

Por ejemplo, podemos crear un componente de la aplicación que de la Bienvenida a varias personas:
```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Pepe" />
      <Welcome name="Carlos" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

Por lo general, las nuevas aplicaciones de React tienen un solo componente de aplicación en la parte superior.
Sin embargo, si integra React en una aplicación existente, puede comenzar de abajo hacia arriba con un pequeño componente como Botón y gradualmente ir hacia la parte superior.

### Extracción de componentes
No tengas miedo de dividir los componentes en componentes más pequeños, ya que estos permiten mejor entendimiento y mayor reutilizacion.
Por ejemplo, si tenemos este componente *Comment*:
```javascript
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Acepta *author* (un objeto), *text* (una cadena) y *date* (una fecha) como props, y describe un comentario en un sitio web de redes sociales.
Este componente puede ser difícil de cambiar debido a todo el anidamiento, y también es difícil reutilizar partes individuales de él.

Vamos a extraer algunos componentes de él. Ver carpeta *practice/comment*.
La extracción de componentes puede parecer un trabajo pesado al principio, pero tener una paleta de componentes reutilizables vale la pena en aplicaciones más grandes. Una buena regla general es que si una parte de su UI se usa varias veces (Button, Panel, Avatar), o es lo suficientemente compleja por sí misma (App, FeedStory, Comment), es un buen candidato para ser un componente reutilizable. .

### Las props son de solo lectura
Ya sea que declare un componente como una función o una clase, nunca debe modificar las props.

Considera esta función de suma:
```javascript
function sum(a, b) {
  return a + b;
}
```
Tales funciónes se llaman *puras* porque no intentan cambiar sus entradas, y siempre devuelven el mismo resultado para las mismas entradas.
Por el contrario, esta función es *impura* porque cambia su propia entrada:

```javascript
function withdraw(account, amount) {
  account.total -= amount;
}
```

React es bastante flexible pero tiene una sola regla estricta:
*Todos los componentes de React deben actuar como funciónes puras con respecto a las props.*
