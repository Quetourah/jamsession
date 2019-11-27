import React from 'react';
import Login from '../../containers/Login';
import renderer from 'react-test-renderer';

it('renders login page correctly', () => {
  const tree = renderer
    .create(<Login/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


