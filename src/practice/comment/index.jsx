/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

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

class UserName extends React.Component {
  render() {
    return (
      <div className="UserInfo-name">
        {this.props.name}
      </div>
    )
  }
}

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

const author = {
  name: 'Fede',
  avatarUrl: 'https://imagekit.androidphoria.com/wp-content/uploads/clash-royale-pajaro-simpsons.jpg'
}

ReactDOM.render(<Comment
  author={author} date={new Date()}
  text='Esta componente hay que mejorarla'
/> , document.getElementById('root'));
