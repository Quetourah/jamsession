
import React,{Component} from "react";
import "./Profile.css";
import {Auth,API, graphqlOperation} from 'aws-amplify'
import { Row, Col, Image, ListGroup, ListGroupItem, Table,Button,Modal,InputGroup,FormControl} from 'react-bootstrap'
import {listSongs} from "../graphql/Queries";
import {createSongs} from "../graphql/Mutations";

//TODO: Need to pull this data from DB
const userhistoryinfo=
[
    {
    
    song_name:"Baivab",
    song_type:"Public",
    song_collab:"1"
},
{
   
    song_name:"Pokhrel",
    song_type:"Private",
    song_collab:"2"
},
]

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
       song_exists:false,
  
       }
       this.handleName=this.handleName.bind(this);
       this.handleType=this.handleType.bind(this);
       this.handleCollab=this.handleCollab.bind(this);
       this.handleCreateSong=this.handleCreateSong.bind(this);
      
    }
    
    componentDidMount(){
        const user = Auth.currentUserInfo();
         
        user.then(function(result) {
            this.setState({username:result.username})
            this.setState({email:result.attributes.email})
            }.bind(this));
    }
    
    handleClose = () => this.setState({show:false});
    handleShow = () => this.setState({show:true});
    
    handleName(event){
        this.setState({song_name: event.target.value});
    }

    handleType(event){
        this.setState({song_type: event.target.value});
    }

    handleCollab(event){
        this.setState({song_collaborators: event.target.value});
    }
    handleCreateSong(){
        
        // TODO: Write these info to the DB
        //console.log(this.state.song_name);
        //console.log(this.state.song_type);
        //console.log(this.state.song_collaborators);
        if(!this.state.song_exists)
        {
            this.props.history.push(`/coder/${this.state.song_name}`);
        }
        else{
            //throw error saying this song already exists and open the new song
        }
    
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
                            Create Song
                            </Button>
                    
                            <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Lets Create a new Song</Modal.Title>
                            </Modal.Header>
                            <form className="container">
                                    
                                    <h3>Song Name</h3>
                                    <InputGroup >
                                    <FormControl
                                        
                                        placeholder="Please Enter the Song Name"
                                        value={this.state.song_name}
                                        onChange={this.handleName}
                                        />
                                    
                                    </InputGroup >
                                    <InputGroup >
                                    <h3>Private/ Public</h3>
                                    <FormControl
                                        placeholder="Enter Private or Public"
                                        value={this.state.song_type}
                                        onChange={this.handleType}
                                        
                                        />
                                    
                                    </InputGroup >
                                    <InputGroup >
                                    <h3>Add Collaborators</h3>
                                    <FormControl
                                        placeholder="Add Collaborators separating by comma"
                                        value={this.state.song_collaborators}
                                        onChange={this.handleCollab}
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

class JammerHistory extends Component {
    state = { title: '', songs: [] }
    async componentDidMount() {
        try {
            const apiData = await API.graphql(graphqlOperation(listSongs))
            const songs = apiData.data.listSongs.items
            this.setState({ songs })
        } catch (err) {
            console.log('error: ', err)
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    createSongs = async () => {
        const { title } = this.state
        if (title === '') return
        try {
            const song = { title }
            const songs = [...this.state.songs, song]
            this.setState({ songs, title: ''})
            await API.graphql(graphqlOperation(createSongs, { input: song }))
            console.log('song successfully created!')
        } catch (err) {
            console.log('error: ', err)
        }
    }
    render() {
        
        return (
            <div className="JammerHistory">
                <h2>Jammer History</h2>
                <Table striped bordered responsive  >
                    <thead>
                        <tr>

                            <td>Song Name</td>
                            <td>Privacy</td>
                            <td>Jammers</td>


                        </tr>
                    </thead>
                   
                    {
                        this.state.songs.map((rest, i) => (
                            <tbody key={i}>
                                <tr>
                                    <td><a href={""}>{rest.title}</a></td>
                                    <td>Privacy</td>
                                    <td>Jammers</td>
                                </tr>
                            </tbody>
                        ))
                    }

                </Table>
            </div>)        
        
    }
}

