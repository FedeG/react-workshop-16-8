## Refs
Las Refs nos proveen de un mecanismo para acceder a nodos del DOM o elementos React directamente.

En React, típicamente, los componentes interactuan entre sí mediante props. De esta forma, un componente `parent` interactua con un componente `child` seteando sus props, lo cual puede implicar (dependiendo la lógica del `child`) que este último se re-renderize. Este flujo en ocasiones puede no ser el ideal y para esto, React ofrece Refs.

## Cuándo user Refs
Las Refs, suelen ser utilizadas en los siguientes casos:

- Manejo de foco en nodos/componentes
- Selección de texto
- Integración con otras librerías de manejo de DOM

**Nota:** Es recomendable usar Refs solamente en aquellas situaciones donde no es posible una solución usando props.

## Creación de Refs
A partir de React 16.3, las Refs pueden ser creadas usando la API `React.createRef()` y asignadas a un nodo o elemento React mediante la prop `ref`.

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

## Uso de Refs

Cuando se pasa una `ref` a un nodo/componente, se crea una referencia a dicho nodo/componente en el atributo `current` de la `ref`.

```javascript
const node = this.myRef.current;
```

Si la `ref` se asigna a un nodo, `current` hace referencia a dicho elemento del DOM, mientras que si se asigna a un componente, `current` hace referencia a la instancia de dicho componente.

**Nota:** `ref` no debe ser usada en **function components** ya que no son instanciables.

## Ejemplo

```javascript
class CustomTextInput extends React.Component {
  textInput = React.createRef();

  focusTextInput = () => {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

### Documentación oficial:
- https://reactjs.org/docs/refs-and-the-dom.html
