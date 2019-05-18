import React from 'react';
import PropTypes from 'prop-types';

const CommentText = ({ children }) => (
  <div className="Comment-text">
    {children}
  </div>
);

CommentText.propTypes = {
  children: PropTypes.element,
};

CommentText.defaultProps = {
  children: null,
};

export default CommentText;
