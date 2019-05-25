# Formularios
Los elementos de formulario HTML funcionan de forma un diferente de otros elementos DOM en React, porque los elementos de forma mantienen naturalmente un cierto estado interno.

Por ejemplo, este formulario en HTML simple acepta un solo nombre:
```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

Este formulario tiene el comportamiento HTML predeterminado de una nueva página cuando el usuario envía el formulario.
Si quieres este comportamiento en React, usar direactamente ese HTML funciona pero en la mayoría de los casos, es conveniente tener una función de JavaScript que maneje el envío del formulario y tenga acceso a los datos que el usuario ingresó en el formulario.
La forma estándar de lograr esto es con una técnica llamada `controlled components`.

## Controlled components
En HTML, los elementos de formulario como `<input>`, `<textarea>` y `<select>` suelen mantener su propio estado y actualizarlo en función de la entrada del usuario. En React, el estado mutable generalmente se mantiene en una propiedad del `state` del componente, y solo se actualiza con `setState()`.

Podemos combinar los dos haciendo que el estado de React sea la "única fuente de la verdad".
Luego, el componente React que representa un formulario también controla lo que sucede en ese formulario en la posterior entrada del usuario.

Por ejemplo, si queremos hacer que el ejemplo anterior registre el nombre cuando se envía, podemos escribir el formulario como un `controlled components`:
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('A name was submitted: ' + this.state.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
En el ejemplo de puede ver el uso de una función para controlar el `onChange`, esta función se va a ejecutar por cada tecla que presione el usuario.
Esto nos permite tener el control del formulario completamente desde React, ademas nos permite hacer validaciones e incluso alteraciones en los valores (por ejemplo se podria poner en mayúscula las letras)

### Distintos inputs similares a `<input>` de tipo texto

#### `<textarea>`
```javascript
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please write an essay about your favorite DOM element.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

#### `<select>`
```javascript
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

Nota: también se puede usar un select multiple: `<select multiple={true} value={['B', 'C']}>`

## Input de archivos
El `<input type='file'/>` como su valor es de solo lectura, es un componente no controlado en React.

## Utilizar un mismo método para los onChange
Para lograr esto podemos agregar un campo `name` al input y en la función `onChange` que usemos actualizar el `state` con el valor de `name`.
Ejemplo (este es un ejemplo que ademas es valido para inputs de tipo checkbox):
```
handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  this.setState({
    [name]: value
  });
}
```

### Documentación oficial:
- https://reactjs.org/docs/forms.html
