import React from 'react';
import ReactDOM from 'react-dom';

import Comment from './Comment';

const author = {
  name: 'Fede',
  avatarUrl: 'https://imagekit.androidphoria.com/wp-content/uploads/clash-royale-pajaro-simpsons.jpg',
};

ReactDOM.render(<Comment
  author={author}
  date={new Date()}
  comments={['buenos dias', 'buenas tarde', 'buenas noches']}
/>, document.getElementById('root'));
