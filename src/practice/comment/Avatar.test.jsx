import React from 'react';
import renderer from 'react-test-renderer';

import Avatar from './Avatar';

describe('Avatar', () => {
  let component;
  let onClickHandler;

  const author = {
    name: 'Test',
    avatarUrl: 'avatarTestUrl',
  };

  beforeEach(() => {
    onClickHandler = jest.fn();
    component = renderer.create(
      <Avatar
        author={author}
        onClickHandler={onClickHandler}
      />,
    );
  });

  test('initial state', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('onClickHandler should be called when user click on avatar', () => {
    const instance = component.getInstance();
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    };
    instance.handleOnClick(event);

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
    expect(onClickHandler).toBeCalled();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
