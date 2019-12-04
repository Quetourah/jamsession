
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import JammerHistory from '../../containers/JammerHistory';

import React from 'react';
import { shallow } from 'enzyme';

describe('Test case for initial states',() =>{
let wrapper;

test('renders', ()=>{
    wrapper = shallow(<JammerHistory/>);
    expect(wrapper.exists()).toBe(true);
 })



it('check title at the beginning ',()=>{
wrapper = shallow(<JammerHistory/>);
expect(wrapper.state('title')).toBe('');
})

it('initial song type value',()=>{
    wrapper = shallow(<JammerHistory/>);
    
    expect(wrapper.state('type')).toBe('public');
})

it('initial collaborators',()=>{
    wrapper = shallow(<JammerHistory/>);
    
    expect(wrapper.state('collaborators')).toBe('');
})



it('show value after handling show',()=>{
    wrapper = shallow(<JammerHistory/>);
    wrapper.instance().handleShow()
    expect(wrapper.state('show')).toBe(true);
})

it('show value after handling close',()=>{
    wrapper = shallow(<JammerHistory/>);
    wrapper.instance().handleClose()
    expect(wrapper.state('show')).toBe(false);
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