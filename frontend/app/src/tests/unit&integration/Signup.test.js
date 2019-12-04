
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import Signup from '../../containers/Signup';

import React from 'react';
import { shallow } from 'enzyme';

describe('Test case for initial states of Sign Up Page',() =>{
let wrapper;
 
test('renders', ()=>{
    wrapper = shallow(<Signup/>);
    expect(wrapper.exists()).toBe(true);
 })


it('check new user value ',()=>{
wrapper = shallow(<Signup/>);
expect(wrapper.state('newUser')).toBe(null);
})

it('initial username value',()=>{
    wrapper = shallow(<Signup/>);
    
    expect(wrapper.state('username')).toBe('');
    })

it('initial password value',()=>{
        wrapper = shallow(<Signup/>);
        
        expect(wrapper.state('password')).toBe('');
    })
 
    it("Number of Input Forms", () => {
        const wrapper = shallow(<Signup />);
        expect(wrapper.find("FormControl")).toHaveLength(4);
      });


    

    
})

