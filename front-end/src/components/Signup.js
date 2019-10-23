
import React from 'react';


import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,InputGroup,Button,Col} from 'react-bootstrap';

function Signup() {
    
  
    return (
      <Form >
        <Form.Row>
          <Form.Group as={Col} md="4" >
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First name"
              defaultValue="Mark"
            />
            
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
              defaultValue="Otto"
            />
            
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>Username</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        
          <Form.Group as={Col} md="6" >
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" required />
            
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" required />
            
          </Form.Group>
          <Form.Group as={Col} md="3" >
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" required />
            
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button type="submit">SignUp</Button>
      </Form>
    );
  }
  
export default Signup;