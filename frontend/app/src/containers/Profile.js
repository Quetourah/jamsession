
import React,{Component} from "react";
import "./Profile.css";
import /*Amplify,*/ {Auth}/*,API, graphqlOperation}*/ from 'aws-amplify';
import { Row, Col, Image, ListGroup, ListGroupItem}/*, Table,Button,Modal,InputGroup,FormControl}*/ from 'react-bootstrap';
//import {listSongs} from "../graphql/Queries";
//import {createSongs} from "../graphql/Mutations";
import JammerHistory from "./JammerHistory";



export default class Profile extends Component {

    constructor(props) {

      super(props);
      this.state =
      {
       username:'',
       email:'',
       show:false,
       }
    }

    componentDidMount(){
        const user = Auth.currentUserInfo();

        user.then(function(result) {
            this.setState({username:result.username})
            this.setState({email:result.attributes.email})
            }.bind(this));
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

