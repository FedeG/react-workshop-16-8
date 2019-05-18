# Prop children

`this.props.children` es una propiedad que contiene un elemento o un conjunto de elementos que se le mandan a una componente.
Con un simple ejemplo va a quedar mas claro:

```javascript
class Panel extends React.Component {
  render() {
    return (
      <div className="panel">
        <div className="panel-header">{this.props.title}</div>
        <div className="panel-body">{this.props.children}</div>
      </div>
    );
  }
}

const renderElement = <Panel title="Lista de tareas">
  <div>tarea 1</div>
  <div>mostrar ejemplo</div>
  <div>otro div mas para children</div>
</Panel>

ReactDOM.render(
  <renderElement />,
  document.getElementById('root')
);
```
En este ejemplo, los `div` que estan dentro del componente `<Panel>` va a llegar a dicho componente como `children`


## Documentación relacionada:
- https://learn.co/lessons/react-this-props-children
