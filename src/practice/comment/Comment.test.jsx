import React from 'react';
import MockDate from 'mockdate';
import renderer from 'react-test-renderer';

import Comment from './Comment';

jest.mock('../clock', () => 'Clock');
jest.mock('./Avatar', () => 'Avatar');
jest.mock('./UserInfo', () => 'UserInfo');
jest.mock('./CommentText', () => 'CommentText');
jest.mock('./CommentDate', () => 'CommentDate');

describe('Comment', () => {
  let component;

  const author = {
    name: 'Test',
    avatarUrl: 'avatarTestUrl',
  };

  beforeEach(() => {
    MockDate.set('3/5/1995');
    component = renderer.create(
      <Comment
        author={author}
        date={new Date()}
        comments={['buenos dias', 'buenas tarde', 'buenas noches']}
      />,
    );
  });

  test('initial state', () => {
    const instance = component.getInstance();
    expect(instance.state.date).toEqual(new Date());
    expect(instance.state.showDate).toBeFalsy();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('when click, showDate should be true', () => {
    const instance = component.getInstance();
    expect(instance.state.showDate).toBeFalsy();

    instance.onClickHandler();

    expect(instance.state.showDate).toBeTruthy();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('when click, date should change', () => {
    const instance = component.getInstance();
    expect(instance.state.date).toEqual(new Date());

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    MockDate.set('3/5/1996');

    instance.onClickHandler();

    expect(instance.state.date).toEqual(new Date());

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    MockDate.set('3/5/1997');

    instance.onClickHandler();

    expect(instance.state.date).toEqual(new Date());

    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
