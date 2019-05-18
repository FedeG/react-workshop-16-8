import React from 'react';
import PropTypes from 'prop-types';

const formatDate = date => date.toDateString();

const CommentDate = ({ date }) => (
  <div className="Comment-date">
    {formatDate(date)}
  </div>
);

CommentDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default CommentDate;
