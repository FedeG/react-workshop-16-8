# JSX

JSX es una extensión de la sintaxis de javascript, recomendada para utilizar en react para describir como debería ser la interfaz de usuario.
JSX produce react elements.

Un ejemplo de JSX: `const element = <h1>Hello, world!</h1>;`

## Por qué JSX?
React adopta el hecho de que la lógica de renderizado está inherentemente acoplada con otra lógica de UI: cómo se manejan los eventos, cómo cambia el estado a lo largo del tiempo y cómo se preparan los datos para su visualización.
En lugar de separar las tecnologías al poner la template y lógica en archivos separados, React separa utiliza componentes que contienen ambos.
React no requiere el uso de JSX, pero la mayoría de las personas lo encuentran útil como ayuda visual cuando se trabaja con la IU dentro del código JavaScript.

## Uso de JSX

#### Código javascript dentro de JSX
Dentro de JSX se puede utilizar código javascript mediante `{}`

Ejemplo:
```javascript
const user = {
  name: 'example name'
}

const element = (
  <h1>
    Hello, {user.name}!
  </h1>
);
```

#### código JSX dentro de código JavaScript
JSX genere elementos que podemos utilizar directamente en javascript
Ejemplo:
```javascript
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {user.name}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

#### Especificación de atributos con JSX
Puede usar comillas para especificar cadena como atributos: `const element = <div tabIndex='0'></div>;`
También puede usar llaves para insertar una expresión de JavaScript en un atributo: `const element = <img src={user.name}></img>;`
Se utilizan comillas (para cadenas) o llaves (para expresiones), pero no ambas en el mismo atributo.
Dado que JSX está más cerca de JavaScript que de HTML, React DOM utiliza la convención de nombres de propiedad camelCase en lugar de nombres de atributos HTML.
Por ejemplo, `class` se convierte en `className` en JSX y `tabindex` se convierte en `tabIndex`.

#### Utilizar elementos dentro de JSX
Si el elemento tiene un solo tag, podes cerrarlo directamente con `/>`.
Ejemplo: `const element = <img src={user.avatarUrl} />;`

Si tenes mas de un elemento en JSX:
```javascript
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

#### JSX previene los ataques de inyección
Es seguro insertar la información del usuario en JSX:
```javascript
const title = response.potentiallyMaliciousInput;
// Esto es seguro:
const element = <h1>{title}</h1>;
```

De forma predeterminada, React DOM escapa cualquier valor incrustado en JSX antes de representarlos.
Por lo tanto, garantiza que nunca podrá inyectar nada que no esté escrito explícitamente en su aplicación.
Todo se convierte en una cadena antes de ser renderizado.
Esto ayuda a prevenir ataques XSS (cross-site-scripting).

### Documentación oficial:
- https://5abc31d8be40f1556f06c4be--reactjs.netlify.com/docs/introducing-jsx.html
- https://5abc31d8be40f1556f06c4be--reactjs.netlify.com/docs/jsx-in-depth.html
