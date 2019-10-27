import React, { Component } from 'react';
import Terminal from 'terminal-in-react';
import axios from 'axios';


class App extends Component {
  constructor(){
    super();
    this.state = {
      data: ''
    };
  }

  sendToServer = (cmd) => {
    const response = axios.post(
      'http://localhost:5000/hello',
      { data: cmd },
      { headers: { 'ContentType': 'application/json' } },
    ).then((resp) => {
      this.setState({data: resp.data.msg})
    }).catch((err)=> {
      console.log(err)
    })
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh"
        }}
      >
        <Terminal
          color='yellow'
          backgroundColor='black'
          barColor='black'
          style={{ fontWeight: "bold", fontSize: "1em" }}
          commandPassThrough={(cmd, print) => {
            this.sendToServer(cmd);
            if (this.state.data !== '') {
              print(this.state.data);
              this.setState({data: ''})
            }
          }}
          startState={'closed'}
          closedMessage={'Welcome to Jam Session! Click the icon to connect to the server'}
          closedTitle={'Jam Session Landing Page'}
          msg='Jam Session (Python).'
        />
      </div>
    );
  }
}

export default App;
