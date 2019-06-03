/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function formatDate(date){
  return date.toDateString();
}

class Avatar extends React.Component {
  render() {
    return (
      <img className="Avatar"
        src={this.props.author.avatarUrl}
        alt={this.props.author.name}
      />
    );
  }
}

Avatar.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string
  })
};


class UserName extends React.Component {
  render() {
    return (
      <div className="UserInfo-name">
        {this.props.name}
      </div>
    )
  }
}

UserName.propTypes = {
  name: PropTypes.string
};

class UserInfo extends React.Component {
  render() {
    return (
      <div className="UserInfo">
        <Avatar author={author} />
        <UserName name={author.name} />
      </div>
    );
  }
}

UserInfo.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string
  })
};

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo author={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

Comment.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string
  }),
  text: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date)
};

Comment.defaultProps = {
  date: new Date()
}

const author = {
  name: 'Fede',
  avatarUrl: 'https://imagekit.androidphoria.com/wp-content/uploads/clash-royale-pajaro-simpsons.jpg'
}

ReactDOM.render(<Comment
  author={author}
  text='Esta componente hay que mejorarla'
/> , document.getElementById('root'));
