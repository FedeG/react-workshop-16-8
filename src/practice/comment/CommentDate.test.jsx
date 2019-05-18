import React from 'react';
import MockDate from 'mockdate';
import renderer from 'react-test-renderer';

import CommentDate from './CommentDate';

describe('CommentDate', () => {
  let component;

  beforeEach(() => {
    MockDate.set('3/5/1995');
    component = renderer.create(
      <CommentDate date={new Date()} />,
    );
  });

  test('initial state', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
