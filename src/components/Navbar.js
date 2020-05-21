import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChannels } from '../actions/channelActions';
import { Navbar, Nav, Form, Row, Dropdown, DropdownButton} from 'react-bootstrap'
import BabiteLogo from '../static/img/BabiteLogo.png'
import Profile from '../static/img/Profile.png'
import { Link } from "react-router-dom";
import Popup from "./Popup"
import Login from './auth/Login';
import Signup from './auth/Signup';
import {handleLogout} from "./auth/Logout";
import "../static/css/navbar.css";

class NavbarBabite extends Component {
  constructor(props){  
    super(props);  
    this.state = { showSignUp: false, showLogIn:false };  
    this.togglePopup = this.togglePopup.bind(this)
    this.neutralizePopupState = this.neutralizePopupState.bind(this)
  }  

  componentDidMount(){
    this.props.fetchChannels();
  }

  // Displays certain popup type depending on which button is clicked
  togglePopup(popUpType) {
    switch(popUpType){
    case "login":
      this.setState({
        showLogIn: !this.state.showLogIn,
        showSignUp: false
      });
      break;

    case "signup":
      this.setState({
          showSignUp: !this.state.showSignUp,
          showLogIn: false
      });
      break;
     }
    }
    // When the form is closed via esc. or exit, we set states to false so that the toggle is not broken, which requires double clicking the button to open the form (state of showLogin/Signup is still true and is set to false on click again)
    neutralizePopupState() {
      this.setState({showLogIn: false, showSignUp: false})
    }

  render() {
  let {isAuthenticated} = this.props


    return (
      // style={{backgroundColor: "#003545"}}
      <Nav className="navbar navbar-expand-md background-color">
        <Navbar.Brand>
          <img alt='babite-logo' src={BabiteLogo}></img>
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
                      <Row>
                        <Nav.Link className="nav-link" onClick={handleLogout}>LogOut</Nav.Link>  

                        <Dropdown>
                          <Dropdown.Toggle id="dropdown-toggle">
                            <img class="profile-button" alt="profile-dropdown" src={Profile}></img>
                          </Dropdown.Toggle>

                          <Dropdown.Menu >
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Row>
                      :
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
              // isOpen is a toggle pop to toggle the form
              // html is the html/component to be displayed within the popup
              // onclose takes the neutralizePopupState function
                <Popup  
                          isOpen={true}
                          heading='Log In' 
                          subheading='Please enter credentials' 
                          html={<Login/>}  
                          onclose={this.neutralizePopupState}
                />  
                : null  
                }  
                {this.state.showSignUp ?  

                <Popup  
                          isOpen={true}
                          heading='Sign Up' 
                          subheading='Please enter credentials' 
                          html={<Signup/>} 
                          onclose={this.neutralizePopupState} 
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
