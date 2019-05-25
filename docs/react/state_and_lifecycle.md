## Estado (state)

Hasta ahora solo hemos aprendido una forma de actualizar la UI.
Llamamos a `ReactDOM.render()` para cambiar el resultado representado.

En esta sección, aprenderemos a hacer que el componente Clock (visto anteriormente) sea realmente reutilizable y encapsulado.
Configurará su propio temporizador y se actualizará cada segundo.
Idealmente, queremos escribir esto una vez y tener la actualización del reloj automáticamente:

```javascript
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

Para implementar esto, necesitamos agregar *state* al componente *Clock*.

State es similar a las props, pero es privado y está completamente controlado por el componente.

Anteriormente mencionamos que los componentes definidos como clases tienen algunas características adicionales.
El state local es una de esas característica (una característica disponible solo para los componentes definidos como clases)

### Convirtiendo un componente función en un componente clase
Puede convertir un componente funcional como Clock en un componente clase en cinco pasos:

1- Cree una clase ES6, con el mismo nombre y que extienda `React.Component`.
2- Agregue un solo método vacío llamado `render()`.
3- Mueva el cuerpo de la función al método `render()`.
4- Reemplace las `props` con `this.props` en el cuerpo de la función `render()`.
5- Borre la declaración de la función vacía restante.

### Agregando state a Clock
1- En lugar de usar `this.props` usaremos `this.state`.
2- Agregaremos un constructor a la clase que asigne el estado inicial al `state` e inicializa el super con las `props`.

### Uso correcto del State
Hay tres cosas importantes a tener en cuenta a la hora de usar `state`:

#### No se modicica directamente el `this.state`
Para cambiar el `state` siempre hay que usat `this.setState()` ya que si no usamos este método el componente no se va a actualizar: `this.setState({comment: 'Hello'});`

#### El cambio de un estado al igual que de una prop puede ser asincrono
Para optimizar los cambios en el DOM, React puede agrupar llamados de `this.setState()`.
Para los casos donde se require tener una props en el momento en el que se actualiza un estado, se puede usar una función de actualizacion:
```javascript
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

#### El objeto enviado a this.setState se fusiona con el state actual

## Ciclo de Vida (lifecycle)
El ciclo de vida de un componente consta de un conjunto de métodos que tiene un orden especifico y cambian el comportamiento del componente.

Ciclo de vida de react 16.8:

![ciclo 16.8](https://cdn-images-1.medium.com/max/1000/1*sn-ftowp0_VVRbeUAFECMA.png)

Ciclo de vida de react 16.3:

![ciclo 16.3](https://cdn-images-1.medium.com/max/2000/1*cEWErpe-oY-_S1dOaT1NtA.jpeg)

### Funciones del ciclo de vida de react 16.8
Link con documentación sobre cada método: [react indepth life cycle](https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/introduction.html)

- Props y state
  - `componentWillReceiveProps(nextProps)`: este método se ejecuta cuando se actualiza una `prop` de la componente
  - `shouldComponentUpdate(nextProps, nextState)`: este método nos permite retornar un booleano que indique si la componente tiene que actualizarse o no ante un determinado cambio. Por lo general se usa para optimizar el componente generando menos renders innecesarios.
  - `componentWillUpdate(nextProps, nextState)`: este método se ejecuta antes de hacer re-render.
  - `componentDidUpdate(prevProps, prevState)`: este método se ejecuta una vez que se ejecuto el render y esta actualizado el DOM.
- Mounting
  - `componentWillMount()`: este método se ejecuta antes de renderizar la componente y se llama solo la primera vez que se va a renderizar.
  - `render()`: el método render que ya vimos antes.
  - `componentDidMount()`: este método se llama una vez que la componente esta montada en el DOM y se ejecuta una única vez.
- Unmounting
  - `componentWillUnmount()`: este método se llama en el momento que la componente de deja de mostrar en el DOM.

### Practica: *practice/clock*

### Documentación oficial:
  - https://reactjs.org/docs/state-and-lifecycle.html
