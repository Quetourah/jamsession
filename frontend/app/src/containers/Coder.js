import React, { Component } from 'react';
import axios from 'axios';
import MonacoEditor from 'react-monaco-editor';
import { Button,Grid, Row, Col } from 'react-bootstrap';

export default class Coder extends Component {
    
  constructor(props) {
    
    super(props);
    this.state =
    {
      code: '# type your code...',

     };

    
  }
  
  onChange(newValue, e) 
  {
    this.setState({code:newValue});
    
  }
  onClick(){
    axios.post(
      'http://localhost:5000/hello',
          { 'code': this.state.code},
          { headers: { 'ContentType': 'application/json' } }
    ).then((resp) => {
      console.log(resp)
    }).catch((err)=> {
      console.log(err)
    })
  }
  handleCollab(){
    //TODO need to do a graph QL call to the DB to pull all the users and list
    //them
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
        <div className='Coder'>
    <Grid>
    <Row>
    <Col xs={8} md={10}>
      <MonacoEditor
        width="800"
        height="600"
        language="python"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange.bind(this)}
        
      />
      </Col>
    
    <Col xs={4} md={2}>
    <div>
      <Button onClick={this.onClick.bind(this)} bsSize="large" block bsStyle="danger" >Play</Button>
      <Button onClick={this.handleCollab} bsSize="large" block bsStyle="danger">Add Jammer</Button>
      </div>
    </Col>
    </Row>
    </Grid>
    </div>
    );
  }
}
  
  
  