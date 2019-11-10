import React, { Component } from 'react';
import Terminal from 'terminal-in-react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from 'react-bootstrap';

import Routes from "./Routes";




class App extends Component {
  constructor(){
    super();
    this.state = {
      data: '',
      connected: false
    };
  }

  sendToServer = (cmd) => {
    axios.post(
      'http://localhost:5000/hello',
      { data: cmd },
      { headers: { 'ContentType': 'application/json' } },
    ).then((resp) => {
      this.setState({data: resp.data.msg})
    }).catch((err)=> {
      console.log(err)
    })
  }
  renderSwitch() {
    if (this.state.connected) {
      return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "50vw"
      }}
    else {
      return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
  }

  renderLandingMessage() {
    if (!this.state.connected) {
      return (
        <div style={{
                alignContent: "center",
                marginLeft: "auto",
                marginRight: "auto"
            }}>
          <h2>Welcome to Jam Session (Python)</h2><br/>
            <button style={{textAlign: "center"}} onClick={()=>{this.setState({connected: true})}}>Connect</button>
          <p>Click the Connect button to launch a session.</p>
        </div>
      )
    }
  }

  renderMainScreen() {
    if (this.state.connected) {
      return (
        <Terminal
          color='yellow'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1.3em" }}
          commandPassThrough={(cmd, print) => {
            this.sendToServer(cmd);
            if (this.state.data !== '') {
              print(this.state.data);
              this.setState({data: ''});
            }
            }
          }
          startState={'maximised'}
          closedMessage={'Welcome to Jam Session! Click the icon to connect to the server'}
          closedTitle={'Jam Session Landing Page'}
          msg='Jam Session (Python).'
        />
      )
    }
  }

  render() {
    return (
      /**<div
        style={this.renderSwitch()}
      >
        {(this.renderMainScreen()) || (this.renderLandingMessage())}
      </div>**/


      <div className="App container">
      <Nav className="justify-content-end " activeKey="/home">
      
      <Nav.Item>
        <Nav.Link href="/signup" className="nav">Sign Up</Nav.Link>
      </Nav.Item>
      <Nav.Item >
        <Nav.Link href="/login" >Log In</Nav.Link>
      </Nav.Item>
    
    </Nav>
        <Routes />
    </div>
    );
  }
}

export default App;
