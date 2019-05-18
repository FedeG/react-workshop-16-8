import React from 'react';
import PropTypes from 'prop-types';

const STATUS = {
  HOVERED: 'hovered',
  NORMAL: 'normal',
};

export default class Link extends React.Component {
  state = {
    class: STATUS.NORMAL,
  }

  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  onMouseEnter = () => {
    this.setState({ class: STATUS.HOVERED });
  }

  onMouseLeave = () => {
    this.setState({ class: STATUS.NORMAL });
  }

  render() {
    const { href, children } = this.props;
    const { class: className } = this.state;
    return (
      <a
        className={className}
        href={href || '#'}
        role="button"
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {children}
      </a>
    );
  }
}
