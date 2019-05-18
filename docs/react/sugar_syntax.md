# ES6, reglas del linter y mejoras de código

## ES6
ECMAScript v6 (abreviado como ES6 o ES2015) es el estándar que seguirá JavaScript a partir de Junio de este año (2015).
Hasta el momento la versión de JS que estamos usando en nuestros navegadores y Node.js, es la v5.
En nuestro caso para poder usar funcionalidades de ES6 (e incluso superiores si lo configuramos) vamos a traspilar el código mediante *Babel*

### Nuevas mejoras en ES6
Vamos a ver algunas mejoras útiles, si queres ver todas las novedades de ES6: [es6 features](http://es6-features.org)

#### let
Ahora podes declarar las variables con `let` en lugar de `var` para que las variables solo sean accesibles dentro de un entorno determinado.
```javascript
if(true) {
  var x = 'var';
  let y = 'let';
}

// Como usamos var la variable x sigue existiendo
console.log(x);

// Como usamos let la variable y no exista en esta parte, solo existe dentro del bloque del if
console.log(y);
```

#### const
Para variables que ademas de usar `let`, queremos que sean solo lectura podemos usar `const`
```javascript
const x = 'var';
let y = 'let';

// Como la variable y esta definida con let podemos modificarle el valor
y = 'otro valor';
console.log(y);

// Al querer cambiarle el valor a la constante x vamos a ver un error: 'TypeError: Assignment to constant variable.'
x = 'otro valor';
// El valor va a seguir siendo 'var'
console.log(x);
```

#### Template strings
Esto nos permite combinar variables con strings
```javascript
//ES6
let nombre1 = "ES6";
let nombre2 = "awesome";
// console.log(\`Sólo quiero decir que ${nombre1} is ${nombre2}\`);
```

#### Arrow function
Funciones anonimas y que ademas genera un `bind` con el `this`

```javascript
// ES5
const miFuncion = function(num) {
	return num + num;
}

// ES6
const miFuncion = (num) => num + num;
```

#### Clases
Ya vimos ejemplo de esta mejora pero es interesante saber que en la mayoría de las implementaciones actuales de JavaScript no lo soportan.

```javascript
class Ejemplo extends ClaseBase {
	constructor(atributos) {
    super(atributos);
    this.capitulos = [];
    this.precio = "";
    // ...
  }

  método() {
  	// ...
  }
}
```

#### Destructuring
Esto nos permite asignar elementos de un array o un objeto a variables

```javascript
var [a, b] = ["hola", "mundo"];
console.log(a); // "hola"
console.log(b); // "mundo"

var obj = {nombre: "Fede", apellido: "Gonzalez"};
var { nombre, apellido } = obj;
console.log(nombre); // "Fede"

var foo = function() {
	return ["175", "75"];
};
var [estatura, peso] = foo();
console.log(estatura); //175
console.log(peso); //75
```

#### Valores por defecto
Esto nos permite en las funciónes agregar un valor por defecto a los parámetros

```javascript
//ES5
function(valor) {
	valor = valor || "foo"; // Usualmente se hacia esto a pesar de que tiene problemas con null, undefined, 'undefined', 'null', etc.
}

//ES6
function(valor="foo") {...};
```

#### Spread Operator
Esto nos permite copiar un conjunto de elemento y sumarlos a un array (también existe para objetos pero en versiones mas nuevas de ES)
```javascript
const params = [ "hello", true, 7 ]
const other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]
```

#### Rest Parameter
Esto permite guardar el *resto de parámetros* en una variable

```javascript
function f(x, y, ...a) {
    return (x + y) * a.length
}
f(1, 2, "hello", true, 7) === 9
```

#### Property Shorthand
Nos permite simplificar el armado de objetos

```javascript
const x = 0, y = 0

// Antes
obj = { x: x, y: y };

// Ahora
obj = { x, y }
```

#### Export/Import
Soporte para exportar/importar valores de/a módulos sin contaminación del espacio de nombres global.

```javascript
//  lib/math.js
export function sum (x, y) { return x + y }
export var pi = 3.141593

//  someApp.js
import * as math from "lib/math"
console.log("2π = " + math.sum(math.pi, math.pi))

//  otherApp.js
import { sum, pi } from "lib/math"
console.log("2π = " + sum(pi, pi))
```

#### String Repeating
```javascript
' '.repeat(4 * depth)
'foo'.repeat(3) // 'foofoofoo'
```

#### Busquedas en listas
```javascript
[ 1, 3, 4, 2 ].find(x => x > 3) // 4
[ 1, 3, 4, 2 ].includes(3) // true
[ 1, 3, 4, 2 ].findIndex(x => x > 3) // 2
```

#### String Searching
```javascript
"hello".startsWith("ello", 1) // true
"hello".endsWith("hell", 4)   // true
"hello".includes("ell")       // true
"hello".includes("ell", 1)    // true
"hello".includes("ell", 2)    // false
```

#### Number Type Checking
```javascript
Number.isNaN(42) === false
Number.isNaN(NaN) === true

Number.isFinite(Infinity) === false
Number.isFinite(-Infinity) === false
Number.isFinite(NaN) === false
Number.isFinite(123) === true
```

#### Promise
Representación de primera clase de un valor que puede realizarse de forma asíncrona y estar disponible en el futuro.

```javascript
function msgAfterTimeout(msg, who, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout)
  })
}
msgAfterTimeout("", "Foo", 100).then((msg) =>
  msgAfterTimeout(msg, "Bar", 200)
).then((msg) => {
  console.log(`done after 300ms:${msg}`)
})
```

## Linter
ESlint actualmente no solo puede marcar a problemas de sintaxis o de estilo sino que también puede marcar mas cosas como por ejemplo: problemas de performance
Cualquier regla de ESlint se puede buscar en la [documentación oficial](https://eslint.org/)


## Aclaraciones y mejoras

### PropTypes y defaultProps como static en la clase
```javascript
class Greeting extends React.Component {
  static propTypes = {
    name: PropTypes.string
  };

  static defaultProps = {
    name: 'Stranger'
  };

  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

ReactDOM.render(
  <Greeting />,
  document.getElementById('root')
);
```

### State como variable directa de la clase
```javascript
class Clock extends React.Component {
  state = {
    date: new Date()
  };

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

### PureComponents
`React.PureComponent` es similar a `React.Component`.
La diferencia entre ellos es que `React.Component` no implementa `shouldComponentUpdate()`, pero `React.PureComponent` lo implementa con una comparación superficial.
Si la función `render()` de su componente React genera el mismo resultado con las mismas `props` y el mismo `state`, puede usar `React.PureComponent` para aumentar el rendimiento en algunos casos.
