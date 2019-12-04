
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import Profile from '../../containers/Profile';

import React from 'react';
import { shallow } from 'enzyme';

describe('Test case for initial states',() =>{
let wrapper;
test('renders', ()=>{
    wrapper = shallow(<Profile/>);
    expect(wrapper.exists()).toBe(true);
 })

it('initial username value',()=>{
    wrapper = shallow(<Profile/>);
    
    expect(wrapper.state('username')).toBe('');
    })

it('initial email value',()=>{
        wrapper = shallow(<Profile/>);
        
        expect(wrapper.state('email')).toBe('');
    })

    it('initial song type value',()=>{
        wrapper = shallow(<Profile/>);
        
        expect(wrapper.state('song_type')).toBe('public');
    })

    it('initial song exists value',()=>{
        wrapper = shallow(<Profile/>);
        
        expect(wrapper.state('song_exists')).toBe(false);
    })
    
    it('show value after handling show',()=>{
        wrapper = shallow(<Profile/>);
        wrapper.instance().handleShow()
        expect(wrapper.state('show')).toBe(true);
    })

    it('show value after handling close',()=>{
        wrapper = shallow(<Profile/>);
        wrapper.instance().handleClose()
        expect(wrapper.state('show')).toBe(false);
    })

    
    
    
})

