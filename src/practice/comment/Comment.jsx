import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

import Avatar from './Avatar';
import UserInfo from './UserInfo';
import CommentText from './CommentText';
import CommentDate from './CommentDate';

const LoadableClock = Loadable({
  loader: () => import('../clock'),
  loading: () => <div>Loading...</div>,
});

export default class Comment extends React.PureComponent {
  static propTypes = {
    author: PropTypes.shape({
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    comments: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    comments: [],
  };

  state = {
    date: new Date(),
    showDate: false,
  }

  onClickHandler = () => {
    this.setState({ date: new Date(), showDate: true });
  }

  getComments() {
    const { comments } = this.props;
    return comments.map(comment => <h4 key={comment}>{comment}</h4>);
  }

  render() {
    const { date: clockDate, showDate } = this.state;
    const { author, date } = this.props;
    return (
      <div className="Comment">
        <UserInfo author={author} onClickHandler={this.onClickHandler} />
        <CommentText>
          <div>
            <h1>Comentarios:</h1>
            <Avatar author={author} onClickHandler={this.onClickHandler} />
            {this.getComments()}
          </div>
        </CommentText>
        <CommentDate date={date} />
        { showDate && <LoadableClock date={clockDate} />}
      </div>
    );
  }
}
