import React, { Component } from 'react';
import axios from 'axios';

import MonacoEditor from 'react-monaco-editor';
import { Button,Grid, Row, Col,Alert} from 'react-bootstrap';
import './Coder.css'



export default class Coder extends Component {
  
  
    
  constructor(props) {
    
    super(props);
    this.state =
    {
      songname:'',
      code: '# type your code...',
      jammerlist:[],

     };

    
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    
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
    //TODO: need to do a graph QL call to the DB to pull all the users and list
    //them
  }

  handleSave(){
    //TODO:  need to do a graph QL call to the DB to pull all the users and list
    //them
  }
  componentDidMount(){
    // TODO: need to change the jammer list by pulling from the database 
    this.setState({jammerlist:["baivab.pokhrel","testuser"]});
    this.setState({songname: this.props.location.pathname.slice(7,)});

       
   
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };

    const jammers = this.state.jammerlist.map((jammerlist) => 
    {
        
        return (
            
          <div key={jammerlist}>
          <ul>
            <li>
            {jammerlist}
          </li>
          </ul>
    
    
          </div >
                );
        });

    return (
        <div className='Coder'>
    <Grid>
    <Row>
    <Col xs={10} md={8}>
      <MonacoEditor
        width="750"
        height="600"
        language="python"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange.bind(this)}
        editorDidMount={this.editorDidMount.bind(this)}
        
      />
      </Col>
    
    <Col xs={6} md={4}>
    <div>
      <Button onClick={this.onClick.bind(this)} bsSize="large" block bsStyle="danger" >Play</Button>
      <Button onClick={this.handleSave} bsSize="large" block bsStyle="danger">Save</Button>
      <Button onClick={this.handleCollab} bsSize="large" block bsStyle="danger">Add Jammer</Button>
      
    </div>
    
    <div >
      <Alert >Jammer's:
       {jammers}
    </Alert>
    </div>
    
    <div >
    <Alert className="BuildAlert" >Build Logs:
    <div>

    </div>
    </Alert>
    </div>
    
    </Col>
    </Row>
    </Grid>
    </div>
    );
  }
}
  
  
  