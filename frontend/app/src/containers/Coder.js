import React, { Component } from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import MonacoEditor from 'react-monaco-editor';
import { Button,Grid, Row, Col,Alert,Modal, FormControl,InputGroup} from 'react-bootstrap';
import './Coder.css'
import /*Amplify, {Auth,*/{API, graphqlOperation} from 'aws-amplify';

import {updateSongs} from "../graphql/Mutations";
import {getSongs} from "../graphql/Queries";




export default class Coder extends Component {
  
  
    
  constructor(props) {
    
    super(props);
    this.state =
    {
      songid:'',
      code: '# type your code...',
      add_jammer:'',
      jammerlist:[],
      show:false,
      audio_src: '',
      render_player: false,
      stop_player: false
     };
    this.handleAddJammer=this.handleAddJammer.bind(this);
    this.handleCollab=this.handleCollab.bind(this);
    this.handleReloadOnSubmit=this.handleReloadOnSubmit.bind(this);
    this.handleStopButton=this.handleStopButton.bind(this);
    this.onClick=this.onClick.bind(this);
    this.handleSave=this.handleSave.bind(this);


    
  }
  async editorDidMount(editor, monaco) {
    //console.log('editorDidMount', editor);
    //console.log(this.state.songid);
    try {
      const apiData = await API.graphql(graphqlOperation(getSongs, { songid: this.state.songid }));
      
      //console.log(apiData);
      const code = apiData.data.getSongs.code;
      //console.log(code);
      this.setState({code:code});
  } catch (err) {
      console.log('error: ', err);
  }
    
    
  }
  
  onChange(newValue, e) 
  {
    this.setState({code:newValue});
    
  }
  onClick(){
    
    axios.post(
      'http://127.0.0.1:5000/hello',
          { 'code': this.state.code},
          { headers: { 'ContentType': 'application/json' } }
    ).then((resp) => {
      console.log(resp)
    }).catch((err)=> {
      console.log(err)
    })
    
  }
  handleReloadOnSubmit = () => {
    this.handleStopButton();
    var formData = new FormData();
      formData.append("code", this.state.code);
      axios.post("https://a9bd6961.ngrok.io/interpret", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(resp => {
        this.setState({
          audio_src: 'https://c06fb052.ngrok.io/stream.mp3',
          render_player: true
        });
      })
    .catch(err => {
      console.log(err);
      this.setState({
        audio_src: '',
        render_player: false
      });
    })
  };
  handleStopButton = () => {
    this.setState({
      audio_src: '',
      stop_player: true,
      render_player: false
    })
  };
  handleSampleCode1 = () => {
    this.setState({
      code: `
      Server.default.waitForBoot({
        {
        ({RHPF.ar(OnePole.ar(BrownNoise.ar, 0.99), LPF.ar(BrownNoise.ar, 14)
        * 400 + 500, 0.03, 0.003)}!2)
        + ({RHPF.ar(OnePole.ar(BrownNoise.ar, 0.99), LPF.ar(BrownNoise.ar, 20)
        * 800 + 1000, 0.03, 0.005)}!2)
        * 4
        }.play
        });
      `
    })
    
  };
  handleSampleCode2 = () => {
    this.setState({
      code: `
      Server.default.waitForBoot
      ({
        play{
          x=SinOsc;
          y=LFNoise0;
          a=y.ar(8);
          (x.ar(Pulse.ar(1)*24)+x.ar(90+(a*90))+MoogFF.ar(Saw.ar(y.ar(4,333,666)),a*XLine.ar(1,39,99,99,0,2)))!2/3
        }
        });`
    })
  };
  handleClose = () => this.setState({show:false});
  handleShow = () => this.setState({show:true});
  handleAddJammer(event){
    this.setState({add_jammer: event.target.value});
}
  handleCollab(){
    //TODO: need to do a graph QL call to the DB to put this user in this specific song as a collaborator if this user exists
    console.log(this.state.add_jammer);
  }

  async handleSave(){
    //TODO:  need to do a graph QL call to the DB to pull all the users and list
    //them
    
        try {
            //const song = { title }
            //const songs = [...this.state.songs, song]
            //this.setState({ songs, title: ''})
            await API.graphql(graphqlOperation(updateSongs, { input: {
              songid: this.state.songid,
              code: this.state.code,
            } }))
            console.log('song successfully updated!');
            //Profile.props.history.push(`/coder/${this.state.title}`);
        } catch (err) {
            console.log('error: ', err);
        }
    
  }
  componentWillMount(){
    // TODO: need to change the jammer list by pulling from the database 
    //this.setState({jammerlist:["baivab.pokhrel","testuser"]});
    this.setState({songid: this.props.location.pathname.slice(7,)});

       
   
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
      <ReactAudioPlayer src={this.state.audio_src} 
        autoPlay
        controls={false}
        block
      />
      <Button onClick={this.handleReloadOnSubmit} bsSize="large" block bsStyle={(this.state.render_player && "info") || "danger"}>{(this.state.render_player && "Jamming!") || "Jam!" }</Button>
      <Button onClick={this.handleStopButton} bsSize="large" block bsStyle="danger">Stop</Button>
      <Button onClick={this.handleSave} bsSize="large" block bsStyle="danger">Save</Button>
      <Button onClick={this.handleShow} bsSize="large" block bsStyle="danger">Add Jammer</Button>
      <Button onClick={this.handleSampleCode1} bsSize="large" block bsStyle="secondary">Sample Code 1</Button>
      <Button onClick={this.handleSampleCode2} bsSize="large" block bsStyle="secondary">Sample Code 2</Button>
                            <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Please write the name of jammer you want to add</Modal.Title>
                                </Modal.Header>
                                <InputGroup >
                                      <h3>Jammer Name:</h3>
                                    <FormControl
                                        
                                        placeholder="Jammer Name"
                                        value={this.state.add_jammer}
                                        onChange={this.handleAddJammer}
                                        />
                                    
                                    </InputGroup >
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                Close
                                </Button>
                                <Button name="addjammer" onClick={this.handleCollab} variant="primary"  >
                                Add Jammer
                                </Button>
                            </Modal.Footer>
                            </Modal>
      
    </div>
    
    <div >
      <Alert className="jammers" >Jammer's:
       {jammers}
    </Alert>
    </div>
    
    
    
    </Col>
    </Row>
    </Grid>
    </div>
    );
  }
}