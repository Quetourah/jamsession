import React from 'react';
import JammerHistory from '../../containers/JammerHistory';
import renderer from 'react-test-renderer';

it('renders jammer history info correctly', () => {
  const tree = renderer
    .create(<JammerHistory/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


