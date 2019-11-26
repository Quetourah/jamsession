
import React,{Component,useState} from "react";
import "./Profile.css";
import {Auth} from 'aws-amplify'
import 
    { Row, Col, Image, ListGroup, ListGroupItem, Table,Button,Modal,InputGroup,FormControl
} from 'react-bootstrap'



export default class Profile extends Component {
    
    constructor(props) {
      
      super(props);
      this.state =
      {
       username:'',
       email:'',
       show:false,
       song_name:'',
       song_type:'public',
       song_collaborators:'',
  
       }
  
      
    }
    componentDidMount() {
        const user = Auth.currentUserInfo();
        
        
        user.then(function(result) {
            this.setState({username:result.username})
            this.setState({email:result.attributes.email})
            
            

      }.bind(this));
    
     
    }
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});

    handleCreateSong(){
       
    }
   
    render(){
        
     return(
        <div className="container">
            <Row>
            <Col s={6} md={4}>
            <Image src='https://image-ticketfly.imgix.net/00/00/32/50/75-og.jpg?w=500&h=334&fit=crop&crop=top' thumbnail />

                
            </Col>
                
                    
                <Col s={6} md={4}>
                <JammerInfo 
                    username={this.state.username}
                    email={this.state.email}
                />
                
                </Col>
                <Col s={6} md={4}>
                <div>
                            <Button variant="primary" onClick={this.handleShow} bsSize="large" block bsStyle="danger">
                            Lets Go Live
                            </Button>
                    
                            <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Lets Create a new Song</Modal.Title>
                            </Modal.Header>
                            <form className="container">
                                    
                                    <h3>Song Name</h3>
                                    <InputGroup >
                                    <FormControl
                                        componentClass="input"
                                        placeholder="Please Enter the Song Name"
                                        inputRef={(ref) => {this.input = ref}}
                                        />
                                    
                                    </InputGroup >
                                    <InputGroup >
                                    <h3>Private/ Public</h3>
                                    <FormControl
                                        placeholder="Enter Private or Public"
                                        />
                                    
                                    </InputGroup >
                                    <InputGroup >
                                    <h3>Add Collaborators</h3>
                                    <FormControl
                                        placeholder="Add Collaborators separating by comma"
                                        />
                                    
                                    </InputGroup >
                                    
                            </form>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                Close
                                </Button>
                                <Button variant="primary" onClick={this.handleCreateSong}>
                                Create a New Song
                                </Button>
                            </Modal.Footer>
                            </Modal>
                </div>
                
                </Col>
                
            </Row>
            <Row>
            <JammerHistory/>
            </Row>
    </div>
    )
     }


}

const JammerInfo = (props) => (
    <div className="JammerInfo" >
                    
                        <ListGroup>
                            <ListGroupItem><h2>Jammer Name :</h2><br/>{props.username}</ListGroupItem>
                            <ListGroupItem><h2>Jammer Email :</h2><br/> {props.email}</ListGroupItem>
                        </ListGroup>    
    </div>
)
const JammerHistory = (props) => (
    <div className="JammerHistory">
        <h2>Jammer History</h2>
        <Table striped bordered responsive >
            <thead>
                <tr>
                    <td>#</td>
                    <td>Song Name</td>
                    <td>Privacy</td>
                    <td>Jammers</td>

                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td><a href="/coder">Rock It</a></td>
                    <td>Public</td>
                    <td>1</td>
                    
                </tr>
            </tbody>
        </Table>
    </div>)

