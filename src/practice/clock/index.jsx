/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.PureComponent {
  state = {
    date: new Date()
  }

  componentDidMount() {
    setInterval(() => this.setState({date: new Date()}), 1000)
  }

  handleOnClick = event => {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.props.name);
  }

  render() {
    const showTitle = this.props.name && this.props.name.length > 0;
    return (
      <div onClick={this.handleOnClick}>
        {showTitle && (<h1>{this.props.name}</h1>)}
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

class Clocks extends React.PureComponent {
  render() {
    const clocks = this.props.names.map(name => <Clock name={name} key={name} />);
    return <div>{clocks}</div>;
  }
}

ReactDOM.render(<Clocks names={['clock 1', 'clock 3', 'clock 2']} />, document.getElementById('root'));
