import React from 'react';
import Profile from '../../containers/Profile';
import renderer from 'react-test-renderer';

it('renders profile page correctly', () => {
  const tree = renderer
    .create(<Profile/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});