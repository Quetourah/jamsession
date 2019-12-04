
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import JammerHistory from '../../containers/JammerHistory';

import React from 'react';
import { shallow } from 'enzyme';

describe('Test case for initial states',() =>{
let wrapper;

it('check title at the beginning ',()=>{
wrapper = shallow(<JammerHistory/>);
expect(wrapper.state('title')).toBe('');
})

test('title check for creating new song',()=>
{
wrapper = shallow(<JammerHistory/>);
wrapper.find('.titleForm').simulate('change', {target: {name: 'title', value: 'test1'}});
expect(wrapper.state('title')).toEqual('test1');
})

test('type check for creating new song',()=>
{
wrapper = shallow(<JammerHistory/>);
wrapper.find('.typeForm').simulate('change', {target: {name: 'type', value: 'private'}});
expect(wrapper.state('type')).toEqual('private');
})

test('collaborators check for creating new song',()=>
{
wrapper = shallow(<JammerHistory/>);
wrapper.find('.collabForm').simulate('change', {target: {name: 'collaborators', value: 'test2'}});
expect(wrapper.state('collaborators')).toEqual('test2');
})

})