
import React from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav, Form,InputGroup,FormControl,Button,Card} from 'react-bootstrap';

function Login () {

return(
<Navbar  className="bg-light justify-content-end">



  <Form inline pullRight >
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="Username"
        aria-label="Username"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
    <InputGroup>
      
      <FormControl
        placeholder="Password"
        aria-label="Password"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
    <Button type="submit">Log In</Button>
  </Form>
  
  
  
</Navbar>
);
}

export default Login;
