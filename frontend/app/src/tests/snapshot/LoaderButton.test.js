import React from 'react';
import LoaderButton from '../../components/LoaderButton';
import renderer from 'react-test-renderer';

it('renders loader button correctly', () => {
  const tree = renderer
    .create(<LoaderButton/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});