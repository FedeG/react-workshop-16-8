import React from 'react';
import PropTypes from 'prop-types';

export default class Avatar extends React.PureComponent {
  static propTypes = {
    author: PropTypes.shape({
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    onClickHandler: PropTypes.func.isRequired,
  };

  handleOnClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { onClickHandler } = this.props;
    onClickHandler();
  };

  render() {
    const { author: { avatarUrl, name } } = this.props;
    return (
      <div
        role="button"
        tabIndex={0}
        onKeyPress={this.handleOnClick}
        onClick={this.handleOnClick}
      >
        <img className="Avatar" src={avatarUrl} alt={name} />
      </div>
    );
  }
}
