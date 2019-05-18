import React from 'react';
import PropTypes from 'prop-types';

import Avatar from './Avatar';

const UserInfo = ({ author, onClickHandler }) => (
  <div className="UserInfo">
    <Avatar author={author} onClickHandler={onClickHandler} />
    <div className="UserInfo-name">
      {author.name}
    </div>
  </div>
);

UserInfo.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onClickHandler: PropTypes.func.isRequired,
};

export default UserInfo;
