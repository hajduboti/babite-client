import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChannels } from '../actions/channelActions';
import { Navbar, Nav, Form,Row} from 'react-bootstrap'
import BabiteLogo from '../static/img/BabiteLogo.png'
import { Link } from "react-router-dom";
import Popup from "./Popup"
import Login from './auth/Login';
import Signup from './auth/Signup';
import {handleLogout} from "./auth/Logout";
import { Auth } from "aws-amplify";

class NavbarBabite extends Component {
  constructor(props){  
    super(props);  
    this.state = { showSignUp: false, showLogIn:false };  
    this.togglePopup = this.togglePopup.bind(this)
  }  

  componentDidMount(){
    this.props.fetchChannels();
  }

  togglePopup(popUpType) {
    // event.preventDefault()
    switch(popUpType){
    case "login":
      this.setState({
        showLogIn: !this.state.showLogIn
      });
      case "signup":
      this.setState({
          showSignUp: !this.state.showSignUp
      });
     }
    }

  render() {
  let {isAuthenticated} = this.props


    return (

      <Nav style={{backgroundColor: "#003545"}} className="navbar navbar-expand-md background-color">
        <Navbar.Brand>
          <img alt="babite-logo" src={BabiteLogo}></img>
        </Navbar.Brand>
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">

              <ul className="navbar-nav mr-auto">

              {/* If user is authenticated, display following button, else, nothing */}
              {isAuthenticated ? 
                <Nav.Item className="nav-item">
                  <Nav.Link className="nav-link">Following</Nav.Link>
                </Nav.Item> :  null }   

                  <Nav.Item className="nav-item">
                      <Nav.Link className="nav-link" href="/">Browse</Nav.Link>
                  </Nav.Item>
                  
              </ul>
          </div>
          <div className="mx-auto order-0">
              <Form className="navbar-brand mx-auto">

                <input className="form-control-override mr-sm-2" type="text" placeholder="Search" />
              </Form>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                  <span className="navbar-toggler-icon"></span>
              </button>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                  <Nav.Item className="nav-item">
                      {isAuthenticated ? 
                        <Nav.Link className="nav-link" onClick={handleLogout}>LogOut</Nav.Link> : 

                        <Row>
                        <Nav.Item>
                          <Nav.Link className="nav-link" onClick={() => this.togglePopup('login')}> Log In </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link className="nav-link" onClick={() => this.togglePopup('signup')}> Sign Up </Nav.Link>
                        </Nav.Item>
                        </Row>
                      } 

                  </Nav.Item>
              </ul>
              {this.state.showLogIn ?  
              // Popup takes these prop parameters. Can customize more if desired.
                <Popup  
                          isOpen={true}
                          heading='Log In' 
                          subheading='Please enter credentials' 
                          closePopup={this.togglePopup}
                          html={<Login/>}  
                />  
                : null  
                }  
                {this.state.showSignUp ?  
              // Popup takes these prop parameters. Can customize more if desired.
                <Popup  
                          isOpen={true}
                          heading='Sign Up' 
                          subheading='Please enter credentials' 
                          closePopup={this.togglePopup}
                          html={<Signup/>}  
                />  
                : null  
                }  
          </div>
      </Nav>
    )
  }
}


const mapStateToProps = state => ({
  channels: state.channels.items
})

 export default connect(mapStateToProps, { fetchChannels })(NavbarBabite);
