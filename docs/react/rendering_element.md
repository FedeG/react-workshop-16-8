## Elementos de renderizado
Los elementos son los componentes más pequeños de las aplicaciones de React.
Un elemento describe lo que quiere ver en la pantalla: `const element = <h1>Hola, mundo</h1>;`

A diferencia de los elementos del navegador, los elementos REACT son objetos simples y su creación es barata.
React DOM se encarga de actualizar el DOM para que coincida con los elementos de React.

## Presentar un elemento en el DOM
Digamos que hay un `<div>` en algún lugar de su archivo HTML: `<div id ="root"></div>`
Llamamos a esto un nodo del DOM base (nodo `root` de ahora en mas) porque todo dentro de el será administrado por React DOM.

Las aplicaciones creadas solo con React generalmente tienen un solo nodo `root` pero en aplicaciones isomórficas o aplicaciones que utilizan otras tecnologías puede existir sin ninguna complicación varios nodos `root` (una por pagina) o nodos aparte (secciones del HTML).

Para mostrar un elemento React en un elemento del DOM, se utiliza `ReactDOM.render()`
Un ejemplo:
```javascript
const element = <h1>Hola, mundo!</h1>;

// ReactDOM.render(React element, DOM element);
ReactDOM.render(element, document.getElementById('root'));
```

## Actualizar el elemento renderizado
Los elementos de React son inmutables.
Una vez que crea un elemento, no puede cambiar sus subelementos o atributos.
Un elemento es como un único fotograma en una película, es decir, representa la UI en un momento determinado.

Con lo que conocemos hasta ahora podemos para poder cambiar algo tendriamos que volver a ejecutar `ReactDOM.render()` para poder actualizar.
Ejemplo:
```javascript
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

// Llama a ReactDOM.render() cada 1000 milisegundo.
setInterval(tick, 1000);
```

En la práctica, la mayoría de las aplicaciones de React solo llaman a `ReactDOM.render()` una vez.
Luego, aprenderemos cómo dicho código se encapsula en componentes con estado o parámetros.

### Una prueba de como React solo actualiza lo que es necesario
React DOM compara el elemento y sus subelementos con el anterior, y solo aplica las actualizaciones necesarias para llevar el DOM al estado deseado.
Esto se puede ver con una extensión en el navegador: [react devtools](https://github.com/facebook/react-devtools)

En nuestro ejemplo anterior:

![clock](https://reactjs.org/granular-dom-updates-c158617ed7cc0eac8f58330e49e48224.gif)

### Documentación oficial:
- https://reactjs.org/docs/rendering-elements.html
