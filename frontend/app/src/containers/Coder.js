import React from 'react';
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';
import { Button } from 'react-bootstrap';

export default class Coder extends React.Component {
    
  constructor(props) {
    
    super(props);
    this.state =
    {
      code: '# type your code...'

     }

    
  }
  
  onChange(newValue, e) 
  {
    
    axios.post(
        'http://localhost:5000/hello',
            { 'code': newValue },
            { headers: { 'ContentType': 'application/json' } }
      ).then((resp) => {
        console.log(resp)
      }).catch((err)=> {
        console.log(err)
      })
  }
  onClick(){
     
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
        <div>
      <MonacoEditor
        width="800"
        height="675"
        language="python"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
      <Button onClick={this.onClick}>Play</Button>
      </div>
    );
  }
}
  
  
  