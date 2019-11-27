
import React,{Component} from "react";
import "./Profile.css";
import {Auth} from 'aws-amplify'
import 
    { Row, Col, Image, ListGroup, ListGroupItem, Table,Button
} from 'react-bootstrap'



export default class Profile extends Component {
    
    constructor(props) {
      
      super(props);
      this.state =
      {
       username:'Test User',
       email:'test@test.com'
  
       }
  
      
    }
    componentDidMount() {
        const user = Auth.currentUserInfo();
        
        
        user.then(function(result) {
            this.setState({username:result.username})
            this.setState({email:result.attributes.email})
            
            

      }.bind(this));
      
     
    }
    render(){

     return(
        <div className='container'>
            <Me 
                username={this.state.username}
                email={this.state.email}
            />
        </div>
    )
     }


}
const Me = (props) => (
    <div className="container">
            <Row>
            <Col s={6} md={4}>
            <Image src='https://image-ticketfly.imgix.net/00/00/32/50/75-og.jpg?w=500&h=334&fit=crop&crop=top' thumbnail />

                
            </Col>
                
                    
                <Col s={6} md={4}>
                <JammerInfo 
                    username={props.username}
                    email={props.email}
                />
                
                </Col>
                <Col s={6} md={4}>
                <Button href="/coder" bsSize="large" block bsStyle="danger">Let's Go</Button>
                
                </Col>
                
            </Row>
            <Row>
            <JammerHistory/>
            </Row>
    </div>
)

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
