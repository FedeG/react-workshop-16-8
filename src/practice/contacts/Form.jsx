import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export default class Form extends React.PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  }

  state = {
    searchInputValue: '',
  };

  handleChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ searchInputValue: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { handleSubmit } = this.props;
    const { searchInputValue } = this.state;
    handleSubmit(searchInputValue);
  };

  render() {
    const { searchInputValue } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={searchInputValue}
          onChange={this.handleChange}
          className="search-input"
          type="text"
        />
        <Button type="submit">Buscar</Button>
      </form>
    );
  }
}
