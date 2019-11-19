import React, { Component } from 'react';

//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from 'react-bootstrap';

import Routes from "./Routes";
import Profile from "./containers/Profile";
import Coder from "./containers/Coder";
import "./App.css";



class App extends Component 
{
  constructor(){
    super();
    this.state = {
      data: '',
      logged: true
    };
  }

  /**sendToServer = (cmd) => {
    axios.post(
      'http://localhost:5000/hello',
      { data: cmd },
      { headers: { 'ContentType': 'application/json' } },
    ).then((resp) => {
      this.setState({data: resp.data.msg})
    }).catch((err)=> {
      console.log(err)
    })
  }**/

  renderMainScreen() {
    
    
      return (
        <div >
          <Nav className="justify-content-end " activeKey="/home">
      
          <Nav.Item>
          <Nav.Link href="/signup" className="nav">Sign Up</Nav.Link>
          </Nav.Item>
          <Nav.Item >
          <Nav.Link href="/login" className="nav" >Log In</Nav.Link>
          </Nav.Item>
      
        </Nav>
        <Routes/>
    </div>
      )
    
  }

  renderProfileScreen() {
   
      return (
        <div>
        <Profile/>
        </div>
      )
    
  }
  renderEditor(){
    return (
      <div>
      <Coder/>
      </div>
    )
  }
  

  render() {
    if(!this.state.logged){
    return (
      /**<div
        style={this.renderSwitch()}
      >
        {(this.renderMainScreen()) || (this.renderLandingMessage())}
      </div>**/
       <div className="main-app container" >
      {this.renderMainScreen()}
      </div>
      
    );
  }

  else{
    return (
      /**<div
        style={this.renderSwitch()}
      >
        {(this.renderMainScreen()) || (this.renderLandingMessage())}
      </div>**/
       <div className="profile-app container">
      {this.renderEditor()}

      </div>
      
    );
    
  }


}
}

export default App;
