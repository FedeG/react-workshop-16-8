# Listas y claves

## Listas
Para manejar listas en React es importante volver a tener en cuanta que JSX permite usar JavaScript y a su vez JavaScript puede usar elementos React (JSX) como cualquier otra variable.

Por ejemplo:
```javascript

// Podemos usar map y obtener el doble de cada numero de una lista
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(number => number * 2);
console.log(doubled);

// Podemos usar otro map para generar elementos React para renderizar como una lista
const listItems = doubled.map(number => <li>{number}</li>);

// Podemos renderizarlo
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

### Formas de armar una componente que use una lista
```javascript

// Forma 1- hacer el map fuera del JSX
function DoubledList(props) {
  const listItems = props.numbers.map(number => <li>{number * 2}</li>);
  return <ul>{listItems}</ul>;
}

// Forma 2- hacer el map dentro del JSX
function DoubledList(props) {
  return (
    <ul>
      {props.numbers.map(number => <li>{number * 2}</li>);}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

## Claves
En el caso de ejecutar la componente de lista anterior en React vamos a ver una advertencia de que requerimos una `key` en los elementos de la lista que estamos armando.
La `key` es un *string* que es importante en las lista de React, ya que permite que React calcule mas rápido la diferencia para renderizar.
Esta clave tiene que ser única para cada elemento, por lo general de usa un `id` de los elementos a mostrar.

Nota: cuando no especificamos una `key` React usa el index del elemento en la lista, usualmente se utiliza en index incluso como `key` definida pero este puede traer problemas.

Arreglando el ejemplo anterior:
```javascript

// Forma 1- hacer el map fuera del JSX
function DoubledList(props) {
  const listItems = props.numbers.map(number => <li key={number.toString()} >{number * 2}</li>);
  return <ul>{listItems}</ul>;
}

// Forma 2- hacer el map dentro del JSX
function DoubledList(props) {
  return (
    <ul>
      {props.numbers.map(number => <li key={number.toString()}>{number * 2}</li>);}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### Documentación oficial:
- https://5abc31d8be40f1556f06c4be--reactjs.netlify.com/docs/lists-and-keys.html
