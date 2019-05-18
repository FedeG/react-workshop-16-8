import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Clock extends React.PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
  }

  static defaultProps = {
    date: null,
  }

  render() {
    const { date } = this.props;
    return (
      <Fragment>
        <h1>Hello, world!</h1>
        <h2>{`Fecha: ${date.toDateString()}`}</h2>
      </Fragment>
    );
  }
}
