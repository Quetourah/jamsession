
import React, { Component, Fragment } from "react";
import { Auth } from "aws-amplify";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();

    this.userHasAuthenticated(false);
    
    
    this.props.history.push("/login");

  }
  handleProfile(){
    if(this.state.isAuthenticated)
    {
      const user = Auth.currentUserInfo();
    
        
        
        user.then(function(result) {
          this.props.history.push(`/profile/${result.username}`);
        }.bind(this));
  
        }
}
  

  render() {

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect className="Nav">
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Jam Session</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <Nav pullRight> 
                    
                    <NavItem href="https://foxdot.org/docs/" target="_blank">Documentation</NavItem>
                    <NavItem onClick={this.handleProfile.bind(this)}>Profile</NavItem> 
                    <NavItem onClick={this.handleLogout}>Logout</NavItem> 
                 </Nav>
                : <Fragment>
                    <LinkContainer to="/signup">
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
    
  }


}


export default withRouter(App);
