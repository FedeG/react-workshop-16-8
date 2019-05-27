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

```javascript
class Clock extends React.Component {
  ...

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2- Agregaremos un constructor a la clase que asigne el estado inicial al `state` e inicializa el super con las `props`.

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  ...

}
```

### Uso correcto del State
Hay tres cosas importantes a tener en cuenta a la hora de usar `state`:

#### 1: No se modicica directamente el `this.state`
Para cambiar el `state` siempre hay que usat `this.setState()` ya que si no usamos este método el componente no se va a actualizar: `this.setState({comment: 'Hello'});`

#### 2: El cambio de un estado al igual que de una prop puede ser asincrono
Para optimizar los cambios en el DOM, React puede agrupar llamados de `this.setState()`.
Para los casos donde se require tener una props en el momento en el que se actualiza un estado, se puede usar una función de actualizacion:
```javascript
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

#### 3: El objeto enviado a this.setState se fusiona con el state actual

## Ciclo de Vida (lifecycle)
El ciclo de vida de un componente consta de un conjunto de métodos que tiene un orden especifico y cambian el comportamiento del componente.

Ciclo de vida de react 16.8:
![ciclo 16.8](https://cdn-images-1.medium.com/max/2000/1*cEWErpe-oY-_S1dOaT1NtA.jpeg)

Nota: versiones anteriores a 16.3 tienen otro ciclo: [16.2 o anteiores](https://cdn-images-1.medium.com/max/1000/1*sn-ftowp0_VVRbeUAFECMA.png)

### Mount
Estos métodos se llaman cuando se crea una instancia de un componente y se inserta en el DOM:
- `constructor()`: se ejecuta para crear la instancia de la component.
- `static getDerivedStateFromProps(props, state)`: se ejecuta cada vez que se renderiza un componente y se usa para cuando un estado depende de alguna props. No es recomendado usarlo ([link](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)) ya que son pocos los casos donde es correcto usarlo. En cuando a funcionamiento, si retorna un objeto ese objeto se manda al `this.setState` y si se retorna `null` no se ejecuta ningun cambio.
- `render()`: es el único método obligatorio para una *class component* y retornar el JSX a mostrar en la pantalla.
- `componentDidMount()`: se ejecuta inmediatamente después de que el componente se haya montado. Por ejemplo, lo que podríamos hacer en este método es una llamada a una API.

Nota: El siguiente metodo está considerados legacy (deprecados) y debes evitarlo en código nuevo: `UNSAFE_componentWillMount()`

### Update
Una actualización puede ser causada por cambios en los props o el estado.
Estos métodos se llaman en el siguiente orden cuando un componente se vuelve a renderizar:
- `static getDerivedStateFromProps(props, state)`: ya explicado en *Mount*.
- `shouldComponentUpdate(nextProps, nextState)`: este método nos permite retornar un booleano que indique si la componente tiene que actualizarse o no ante un determinado cambio. Por lo general se usa para optimizar el componente generando menos renders innecesarios.
- `render()`
- `getSnapshotBeforeUpdate(prevProps, prevState)`: se ejecuta inmediatamente antes de que el DOM se actualice y nos permite acceder a cierta información del DOM antes de que se hagan los cambios. El valor que se devuelva será pasado a través del parámetro snapshot a `componentDidUpdate`.
- `componentDidUpdate(prevProps, prevState, snapshot)`: se ejecuta inmediatamente después de que ocurra una actualización en el componente.

Nota: Estos métodos están considerados legacy (deprecados) y debes evitarlos en código nuevo:
  - `UNSAFE_componentWillUpdate()`
  - `UNSAFE_componentWillReceiveProps()`

### Unmount
Este método es llamado cuando un componente se elimina del DOM:
- `componentWillUnmount()`: se ejecuta inmediatamente después de que un componente se haya desmontado y eliminado.


Link con documentación sobre cada método: [react life cycle](https://reactjs.org/docs/react-component.html#reference)

### Practica: *practice/clock*

### Documentación oficial:
- https://reactjs.org/docs/state-and-lifecycle.html
- https://reactjs.org/docs/react-component.html
