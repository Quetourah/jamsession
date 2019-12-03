
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import Login from '../../containers/Login';

import React from 'react';
import { shallow } from 'enzyme';

describe('Test case for initial states',() =>{
let wrapper;

it('check loader button ',()=>{
wrapper = shallow(<Login/>);
expect(wrapper.state('isLoading')).toBe(false);
})

it('initial username value',()=>{
    wrapper = shallow(<Login/>);
    
    expect(wrapper.state('username')).toBe('');
    })

it('initial password value',()=>{
        wrapper = shallow(<Login/>);
        
        expect(wrapper.state('password')).toBe('');
    })
    
    
    
    
    it("Number of Input Forms", () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find("FormControl")).toHaveLength(2);
      });
    
})


