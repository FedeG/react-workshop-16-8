# Manejo de eventos

El manejo de eventos en React es muy similar al manejo de eventos del DOM, solo hay algunas diferencias sintácticas.

## Diferencias

1- Los eventos en React se nombran usando camelCase, en lugar de minúsculas (ejemplo: `onClick` en lugar de `onclick`).
2- En JSX se usa una función como el controlador de eventos, en lugar de una cadena.

Ejemplo:

Forma tradicional:
```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

En React:
```javascript
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

3- Otra diferencia es que no puede devolver falso para evitar el comportamiento predeterminado en React. Debe llamar a `preventDefault` explícitamente.

Por ejemplo, con HTML simple, para evitar el comportamiento de enlace predeterminado de abrir una página nueva, puede escribir:
```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

En React se escribe:
```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

En el ejemplo, `e` es un *SyntheticEvent*.
React define estos *SyntheticEvents* de acuerdo con la especificación W3C, por lo que no tenemos que preocuparnos por la compatibilidad entre navegadores. Mas información sobre [SyntheticEvent](https://reactjs.org/docs/events.html)

### Detalles de manejo de eventos
Cuando utilizamos componentes definidos con clases ES6, un patrón común es que un controlador de eventos sea un método en la clase.
Por ejemplo, este componente de alternancia representa un botón que le permite al usuario alternar entre los estados "ON" y "OFF":

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
```

Hay que tener cuidado con el significado de `this` en las funciónes.
En JavaScript, los métodos de clase no están vinculados por defecto.
Si se olvida vincular `this.handleClick` y pasarlo a `onClick`, `this` no estará definido cuando realmente se llame a la función.
Esto no es un comportamiento específico de React, es una parte de cómo funcionan las funciónes en JavaScript.
En general, si se refiere a un método sin `()` después de él, como por ejemplo `onClick={this.handleClick}` se debe vincular ese método.

### Formas de vincular una función con this en React
1- Creando una nueva función que llame a la función original: `function(e){this.handleClick(e)}`
2- Usar `bind`: `this.hangleClick.bind(this)`
3- Usar *arrow functions* (esto se implementa a partir de ES6 pero ES6 por lo general se utiliza en proyectos de React).

Para el caso 3 hay dos maneras.
1- Direactemente crearla usuarla como una *arrow function*: `const handleClick = () => this.setState(prevState => ({isToggleOn: !prevState.isToggleOn}))`
2- Crearla como un método de clase directamente como *arrow function*:

```javascript
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
  }

  handleClick = () => this.setState(prevState => ({
    isToggleOn: !prevState.isToggleOn
  }));

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

### Pasar argumentos a los controladores de eventos
Dentro de un ciclo, es común querer pasar un parámetro adicional a un controlador de eventos.
Por ejemplo, si id es la identificación de la fila, cualquiera de los siguientes funcionaría:

```javascript
<button onClick = {(e) => this.deleteRow (id, e)}> Eliminar fila </ button>
<button onClick = {this.deleteRow.bind (this, id)}> Eliminar fila </ button>
```
Las dos líneas anteriores son equivalentes.

En ambos casos, el argumento `e` representa el evento React y se pasará como un segundo argumento después del `id`.

### Documentación oficial:
- https://reactjs.org/docs/handling-events.html
