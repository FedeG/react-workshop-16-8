import React from 'react';
import renderer from 'react-test-renderer';

import CommentText from './CommentText';

describe('CommentText', () => {
  let component;
  let children;

  beforeEach(() => {
    children = <h1>Test</h1>;
    component = renderer.create(
      <CommentText>
        {children}
      </CommentText>,
    );
  });

  test('initial state', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
