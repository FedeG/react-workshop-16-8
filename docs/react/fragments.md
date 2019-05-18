## Fragmentos
Un patrón común en React es que un componente devuelva múltiples elementos. Los fragmentos le permiten agrupar una lista de elementos sin agregar nodos adicionales al DOM.

Ejemplo:
```javascript
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

## Porque existe Fragment
El motivo principal es generar mayor flexibilidad a la hora de generar componentes y evitar nodos de mas en el DOM que sean creados simplemente para que el JSX fuera valido.

Por ejemplo podemos tener una componente que nos retorne parte de una tabla sin tener que agrupar sus elementos:
```javascript
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

## Sintaxis abreviada
Hay una sintaxis nueva y más corta que puede usar para declarar fragmentos.
Podemos usar `<> </>` de la misma manera que usaría cualquier otro elemento, excepto que no admite claves o `props`.
Algunas herramientas todavía no lo admiten, por ende es recomendable usar `<React.Fragment>` sin abreviar.

Nota: Si usamos la versión no abreviada se puede usar `key` pero no `props`.

### Documentación oficial:
- https://5abc31d8be40f1556f06c4be--reactjs.netlify.com/docs/fragments.html
