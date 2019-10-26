import React, { Component } from 'react';
import Terminal from 'terminal-in-react';


class App extends Component {
  showMsg = () => 'Hello World'

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
            // do something async
            print(`You sent '${cmd} to the server!'`);
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
