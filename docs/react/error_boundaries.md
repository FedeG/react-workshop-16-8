## Error Boundaries
A partir de React 16 se introdujo el concepto de **Error Boundaries**, que no es más que una API declarativa que nos permite capturar errores en los componentes hijos de un Error Boundary (ya sea dentro de su método `render`, en sus métodos de ciclo de vida o en su constructor) y para, por ejemplo, mostrar una UI de error en lugar de dejar que la aplicación crashee completamente.

---
**Nota:**

Los Error Boundaries **no** capturan los siguientes errores:

- Errores en handlers de eventos
- Errores en código asincrónico
- Errores en rendering en el lado del servidor
- Errores del propio Error Boundary

---

## Como crear un componente para que sea un Error Boundary

Un componente se puede transforma en un Error Boundary si define al menos uno de los siguientes métodos: `static getDerivedStateFromError()` y/o `componentDidCatch()`.

Ejemplo de un Error Boundary:
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
```

Uso de nuestro Error Boundary:
```javascript
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Básicamente, un Error Boundary actua como el bloque `catch` de JavaScript, pero para componentes. Debe notarse también que solamente los class components pueden ser utilizados como Error Boundaries.

### Documentación oficial:
- https://reactjs.org/docs/error-boundaries.html
