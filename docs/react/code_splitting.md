## Code splitting
La mayoría de las aplicaciones de React tendrán sus archivos "bundled" utilizando herramientas como Webpack o Browserify.
Bundling es el proceso de seguir los archivos importados y fusionarlos en un solo archivo: un "bundle".
Este paquete se puede incluir en una página web para cargar una aplicación completa a la vez.

El bundling es excelente, pero a medida que su aplicación crezca, su paquete crecerá también.
Especialmente si incluye grandes bibliotecas de terceros. Debes estar atento al código que incluyes en tu paquete para que no lo hagas tan grande que tu aplicación tarde demasiado en cargarse.

Para evitar terminar con un paquete grande, es bueno adelantarse al problema y comenzar a "dividir" el paquete.
Code-Splitting es una característica soportada por bundlers como Webpack y Browserify (a través de factor-bundle) que puede crear múltiples paquetes que pueden ser cargados dinámicamente en tiempo de ejecución.

La división de código de su aplicación puede ayudarlo a "cargar de forma lenta" solo las cosas que el usuario necesita actualmente, lo que puede mejorar drásticamente el rendimiento de su aplicación. Si bien no ha reducido la cantidad total de código en su aplicación, ha evitado cargar código que el usuario puede no necesitar y ha reducido la cantidad de código necesario durante la carga inicial.

## Import
La mejor forma de introducir la división de código en su aplicación es mediante la sintaxis dinámica de `import()`
Antes:
```javascript
import { add } from './math';

console.log(add(16, 26));
```

Ahora:
```javascript
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

Nota: la sintaxis dinámica de `import()` es una propuesta de ECMAScript que actualmente no forma parte del estándar de javascript. Se espera que sea aceptado en el futuro cercano.

Cuando Webpack encuentra esta sintaxis, inicia automáticamente la división de código de tu aplicación.
Si está utilizando la aplicación Create React, esto ya está configurado para usted y puede comenzar a usarlo inmediatamente.
También se admite de forma predeterminada en Next.js.

### Nombrar el archivo autogenerado
Se puede nombrar el archivo autogenerado agregando un comentario al import: `import(/* webpackChunkName: "name" */'<path>')`.

## React.lazy
React ofrece `React.lazy`, que nos permite renderizar un `import` dinámico como si fuese un componente regular.

Antes:
```javascript
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

Con React.lazy:
```javascript
const OtherComponent = React.lazy(() => import(/* webpackChunkName: "OtherComponent" */'./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

`React.lazy` toma como parámetro una function que debe llamar un `import` dinámico. Esto retorna una `Promise` que debe resolver a un módulo cuyo `default export` sea un componente de React.

## Suspense

Para renderizar algún contenido por defecto mientras se espera a que `React.lazy` retorne el componente importado dinámicamente (como puede ser un spinner), React nos ofrece **Suspense**:

```javascript
const OtherComponent = React.lazy(() => import(/* webpackChunkName: "OtherComponent" */'./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

La prop `fallback` acepta cualquier element React y será el que se renderize durante el proceso de carga.

**Nota:** Se pueden wrappear múltiples componentes dentro de un único Suspense.

---
**Nota:**

`React.lazy` y Suspense no tienen soporte aún para server-side rendering. Para esto, se puede hacer uso, por ejemplo, de librería como **React Loadable**.

---

## React Loadable
Esta librería nos permite hacer ese tipo de import dinámico de una forma amigable:

Antes:
```javascript
import OtherComponent from './OtherComponent';

const MyComponent = () => (
  <OtherComponent/>
);
```

Con React Loadable:
```javascript
import Loadable from 'react-loadable';

const LoadableOtherComponent = Loadable({
  loader: () => import(/* webpackChunkName: "OtherComponent" */'./OtherComponent'),
  loading: () => <div>Loading...</div>,
});

const MyComponent = () => (
  <LoadableOtherComponent/>
);
```
React Loadable lo ayuda a crear estados de carga, estados de error, tiempos de espera, precarga y más. Incluso puede ayudarlo a renderizar una aplicación en el servidor con gran cantidad de código dividido.

<!---
TODO: Se debe agregar una sección sobre handle de errores en lazy load con Error Boundaries.
      Dado que al momento de realizar esta sección no se cuenta con una sección sobre
      Error Boundaries en el curso, se decidió no agregar el apartado aquí por el momento.
-->

### Documentación oficial:
- https://reactjs.org/docs/code-splitting.html
