import React, { useState } from "react";
import { Button, FormGroup, FormControl,FormLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Signup.css";

export default function Singup(props) {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>

      <FormGroup controlId="first" bsSize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={first}
            onChange={e => setFirst(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="last" bsSize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={last}
            onChange={e => setLast(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup controlId="phone" bsSize="large">
          <FormLabel>Phone</FormLabel>
          <FormControl
            autoFocus
            type="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </FormGroup>
        
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit" variant="danger">
          Sign Up
        </Button>
      </form>
    </div>
  );
}