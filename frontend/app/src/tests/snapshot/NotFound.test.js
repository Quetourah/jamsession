import React from 'react';
import NotFound from '../../containers/NotFound';
import renderer from 'react-test-renderer';

it('renders login page correctly', () => {
  const tree = renderer
    .create(<NotFound/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


