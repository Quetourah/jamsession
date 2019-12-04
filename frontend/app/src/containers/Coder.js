import React, { Component } from 'react';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import MonacoEditor from 'react-monaco-editor';
import { Button,Grid, Row, Col,Alert,Modal, FormControl,InputGroup} from 'react-bootstrap';
import './Coder.css'



export default class Coder extends Component {
  
  
    
  constructor(props) {
    
    super(props);
    this.state =
    {
      songname:'',
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
  handleReloadOnSubmit = () => {
    this.handleStopButton();
    var formData = new FormData();
      formData.append("code", this.state.code);
      axios.post("http://ec2-3-133-237-193.us-east-2.compute.amazonaws.com:5000/interpret", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(resp => {
        this.setState({
          audio_src: 'http://ec2-3-133-237-193.us-east-2.compute.amazonaws.com:8000/stream.mp3',
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
}
);`
    })
  };
  handleSampleCode2 = () => {
    this.setState({
      code: `
Server.default.waitForBoot({
  b = Buffer.alloc(s,44100 * 2, 2);
  
  SynthDef("help-PingPong",{ arg out=0,bufnum=0,feedback=0.5,delayTime=0.2;
      var left, right;
      left = Decay2.ar(Impulse.ar(0.7, 0.25), 0.01, 0.25,
          SinOsc.ar(SinOsc.kr(3.7,0,200,500)));
      right = Decay2.ar(Impulse.ar(0.5, 0.25), 0.01, 0.25,
          Resonz.ar(PinkNoise.ar(4), SinOsc.kr(2.7,0,1000,2500), 0.2));
  
      Out.ar(0,
          PingPong.ar(bufnum, [left,right], delayTime, feedback, 1)
      )
  }).play(s,[\\out, 0, \\bufnum, b.bufnum,\\feedback,0.5,\\delayTime,0.1]);
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

  handleSave(){
    //TODO:  need to do a graph QL call to the DB to pull all the users and list
    //them
  }
  componentDidMount(){
    // TODO: need to change the jammer list by pulling from the database 
    //this.setState({jammerlist:["baivab.pokhrel","testuser"]});
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
      <h2>{this.state.songname}</h2>
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
