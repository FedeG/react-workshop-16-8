import React from 'react';
import renderer from 'react-test-renderer';

import UserInfo from './UserInfo';

jest.mock('./Avatar', () => 'Avatar');

describe('UserInfo', () => {
  let component;

  const author = {
    name: 'Test',
    avatarUrl: 'avatarTestUrl',
  };

  beforeEach(() => {
    component = renderer.create(
      <UserInfo
        author={author}
        onClickHandler={jest.fn()}
      />,
    );
  });

  test('initial state', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
