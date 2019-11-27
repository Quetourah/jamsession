import React from 'react';
import Signup from '../../containers/Signup';
import renderer from 'react-test-renderer';

it('renders sign up page correctly', () => {
  const tree = renderer
    .create(<Signup/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

