# Componentes de orden superior
Un componente de orden superior (HOC) es una técnica avanzada en React para reutilizar la lógica de los componentes.
Los HOC no son parte de la API React, en si. Son un patrón que surge de la naturaleza compositiva de React.

Concretamente, un componente de orden superior es una función que toma un componente y devuelve un nuevo componente.

`const EnhancedComponent = higherOrderComponent(WrappedComponent);`

Mientras que un componente transforma `props` en UI, un componente de orden superior transforma un componente en otro componente.
Los HOC son comunes en las bibliotecas de React de terceros, como Redux's `connect` y Relay's `createFragmentContainer`.

## HOC para reutilización de código
Los componentes de React buscan ser reutilizables y hacer que la logica sea independiente en cada componente, pero hay casos donde esa estructura genera repeticiones de código entre componentes.

Por ejemplo podemos tener dos componentes que lean información desde la misma fuente de datos:
```javascript
class CommentList extends React.Component {
  state = {
    // "DataSource" is some global data source
    comments: DataSource.getComments()
  };

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  // Update component state whenever the data source changes
  handleChange = () => this.setState({
    comments: DataSource.getComments()
  });

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
  state = {
    blogPost: DataSource.getBlogPost(props.id)
  };

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange = () => this.setState({
    blogPost: DataSource.getBlogPost(this.props.id)
  });

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
    state = {
      data: selectData(DataSource, props)
    };

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange = () => this.setState({
      data: selectData(DataSource, this.props)
    });

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
Un HOC compone el componente original envolviéndolo en un componente contenedor y siempre un HOC es una función pura sin efectos secundarios.

---
**Nota:**

Es importante notar la separación de responsabilidades que se tiene usando HoC; El HoC desconoce el porqué y el cómo las props que pasa al componente wrappeado son usadas y el componente wrappeado desconoce cómo estas props fueron generadas.

---

## Convenciones

### Evitar pasar props específicas del HoC al componente wrappeado
Es siempre recomendable filtrar las props que corresponden al HoC y evitar pasarlas al componente wrappeado.

```javascript
render() {
  // Filter out extra props that are specific to this HOC and shouldn't be passed through
  const { extraProp, ...passThroughProps } = this.props;

  // Inject props into the wrapped component. These are usually state values or instance methods.
  const injectedProp = someStateOrInstanceMethod;

  // Pass props to wrapped component
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

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
Debido al algoritmo que React utiliza para actualizar los componentes (**reconciliation**), crear un HoC dentro del método `render` de un componente implica montar y desmontar este componente cada vez que el método render se ejecuta:
```javascript
render() {
  // A new versión of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```

### Los métodos estáticos deben ser copiados
Cuando usamos HOC los métodos o atributos estáticos que esten en el componente original no "pasan" al componente final, por ende, tenemos que copiarlos. Podemos copiarlos manualmente o haciendo uso de `hoistNonReactStatic` del paquete `hoist-non-react-statics`.

### Los refs no funcionan
El uso de `refs` en este caso hace que la referencia quede en el componente "exterior" es decir, en el HOC.
Para estos casos, pueden utilizarse la API `React.forwardRef`.

### Documentación oficial:
- https://reactjs.org/docs/higher-order-components.html
