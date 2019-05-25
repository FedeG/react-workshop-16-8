# Componentes de orden superior
Un componente de orden superior (HOC) es una técnica avanzada en React para reutilizar la lógica de los componentes.
Los HOC no son parte de la API React, en si. Son un patrón que surge de la naturaleza compositiva de React.

Concretamente, un componente de orden superior es una función que toma un componente y devuelve un nuevo componente.

`const EnhancedComponent = higherOrderComponent(WrappedComponent);`

Mientras que un componente transforma `props` en UI, un componente de orden superior transforma un componente en otro componente.
Los HOC son comunes en las bibliotecas de React de terceros, como Redux's `connect` y Relay's `createFragmentContainer`.

## Usar HOC para Cross-Cutting Concerns
Nota: anteriormente React recomendaba usar mixins para estos casos pero con el tiempo quedo verificado que usar mixins generaba mas problemas que soluciones. Si queres las notas oficiales del react sobre el tema: [Mas información](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)

Los componentes de React buscan ser reutilizables y hacer que la logica sea independiente en cada componente, pero hay casos donde esa estructura genera repeticiones de código entre componentes.

Por ejemplo podemos tener dos componentes que lean información desde la misma fuente de datos:
```javascript
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```
A simple vista vemos como estas dos componentes tiene una logica muy similar.
En estos casos, usualmente usariamos herencia pero en este modelo vamos a usar composición para que el código sea mas ordenado y podamos trabajar evitando futuros problemas. Si queres detalles de porque se usa composición en lugar de herencia, en la documentación oficial tenes un apartado sobre el tema: [composition vs inheritance](https://reactjs.org/docs/composition-vs-inheritance.html)

Para aislar esa logica vamos a usar una HOC:
```javascript
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```
Un HOC no modifica el componente de entrada, ni utiliza la herencia para copiar su comportamiento.
Un HOC compone el componente original envolviéndolo en un componente contenedor y siempre un HOC es una función pura con cero efectos secundarios.

## No lo uses para modificar el componente original. Usa la composición
Si bien hablamos que los HOC son composición y no tiene efecto de lado, esto depende de como lo implementemos.
Es importante respetar la premisa de la compocion.
Por ejemplo, si no respetamos eso podemos llegar a modificar el comportamiento del componente:

```javascript
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
```

En este caso modificamos el componente, esto trae muchos problemas:
- El HOC elimina el `componentWillReceiveProps` original
- Si ese HOC se usa junto con otro igual, uno va a cancelar el método del otro
- La componente no se va a poder reutilizar sin este HOC
- Para usar este HOC si o si tendriamos que ver su código y tenerlo en cuenta con sumo detalle

Si se quiere hacer eso pero de forma correcta se puede hacer con composición:
```javascript
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

## Convenciones

### Evitar cambiar la firma de un componente
Con convension un HOC no tiene que alterar mucho los `props` que requiere un componente.
Siempre los `props` tenemos que mandarlos a la componente que estamos trabajando y a lo sumo agregarle mas `props` en el HOC.

### Mejorar la composision
No todos los HOC tienen el mismo aspecto. Algunas veces aceptan solo un único argumento, el componente envuelto: `const NavbarWithRouter = withRouter(Navbar)`
Por lo general, los HOC aceptan argumentos adicionales. En este ejemplo de Relay, un objeto config se usa para especificar las dependencias de datos de un componente: `const CommentWithRelay = Relay.createContainer(Comment, config);`
La firma más común para HOC se ve así: `const ConnectedComment = connect(commentSelector, commentActions)(CommentList);`
En otras palabras para que se entienda mejor:
```javascript
// connect es una función que devuelve otra función
const enhance = connect (commentListSelector, commentListActions);
// La función devuelta es un HOC, que devuelve un componente que está conectado Redux
const ConnectedComment = enhance (CommentList);
```
En otras palabras, connect es una función de orden superior que devuelve un componente de orden superior.

Esta forma puede parecer confusa o innecesaria, pero tiene una propiedad útil.
Los HOC de argumento único como el que devuelve la función de conexión tienen la firma `Componente => Componente`. Las funciónes cuyo tipo de salida es el mismo que su tipo de entrada son mas fáciles de componer juntas.

### Usar un displayName para facilitar el debugging
El `displayName` es utilizado por los plugins de debug para mostrar los componentes, en el caso de los HOC es recomendable mostrar un nombre que refleje la composición realizada.

```javascript
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

## Advertencias
Los componentes de orden superior vienen con algunas advertencias que no son inmediatamente obvias si eres nuevo en React.

### No uses el HOC dentro del método render
Nunca hagas esto:
```javascript
render() {
  // A new versión of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```

### Los métodos estáticos hay que copiarlos
Cuando usamos HOC los métodos static que esten en el componente original no van a estar en el componente final, por ende, tenemos que copiarlos.

```javascript
// Creamos un método static
WrappedComponent.staticMethod = function() {/*...*/}
// Usamos un HOC
const EnhancedComponent = enhance(WrappedComponent);

// El método no va a existir en la componente final
typeof EnhancedComponent.staticMethod === 'undefined' // true

// Una solución a esto es copiar el método manualmente

function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}

// Pero para copiar manualmente tenemos que conocer todos los métodos static que tiene la componente original
// Para evitar tener que conocerlos, podemos usar un modulo que copia todos los métodos static automáticamente: hoist-non-react-statics

import hoistNonReactStatic from 'hoist-non-react-statics';

function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

### Los refs no funcionan igual
El uso de `refs` en este caso hace que la referencia siempre quede en el componente de mas afuera es decir en el HOC mas exterior.
La solución a esto es evitar el uso de `ref`, solo en casos muy específicos se puede modificar el ref pero para esto hay que desde el HOC conocer que se utiliza un `ref` hacia el.

### Documentación oficial:
- https://reactjs.org/docs/higher-order-components.html
