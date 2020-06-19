import React, { Component } from 'react'
import { connect } from 'react-redux';
// import { fetchChannels } from '../actions/channelActions';
import { Navbar, Nav, Form, Row, Dropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BabiteLogo from '../static/img/BabiteLogo.png'
import Profile from '../static/img/Profile.png'
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
    // this.props.fetchChannels();
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
      default:
        break;
      }

    }
    // When the form is closed via esc. or exit, we set states to false so that the toggle is not broken, which requires double clicking the button to open the form (state of showLogin/Signup is still true and is set to false on click again)
    neutralizePopupState() {
      this.setState({showLogIn: false, showSignUp: false})
    }
  render() {
  let {isAuthenticated, username, channels} = this.props
    return (
      <Nav className="navbar navbar-expand-md background-color">
        {channels}
        <Navbar.Brand>
        <Nav.Link className="nav-link w-16" href="/"><img alt='babite-logo' src={BabiteLogo} className="nav-logo"></img></Nav.Link>
        </Navbar.Brand>
          <div className="navbar-collapse  collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">
              {/* If user is authenticated, display following button, else, nothing */}
              {isAuthenticated ?
                <Nav.Item className="nav-item">
                  <Nav.Link className="nav-link" href="/following">Following</Nav.Link>
                </Nav.Item> : null }

                  <Nav.Item className="nav-item">
                      <Nav.Link className="nav-link" href="/">Browse</Nav.Link>
                  </Nav.Item>
              </ul>
          </div>
          <div className="mx-auto order-0 w-4/6">
              <Form className="navbar-brand mx-auto w-5/6	">
                <input className="form-control-override mr-sm-2 w-2/3" type="text" placeholder="To be implemented..." />
              </Form>
          </div>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 flex justify-end">
                  <Nav.Item className="nav-item">
                      {isAuthenticated ?
                      <Row>

                        <Dropdown>
                          <Dropdown.Toggle className="profile-toggle">
                          <img className="profile-button nav-logo" alt="profile-dropdown" src={Profile} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu >
                          <Link to={{pathname: `/${username}`}} className="dropdown-item">{username}</Link>
                          <Dropdown.Divider></Dropdown.Divider>
                          <Link to={{pathname: `/${username}/programmes`}} className="dropdown-item">Edit Programme</Link>
                          <Dropdown.Item onClick={handleLogout}>LogOut</Dropdown.Item>
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
              {this.state.showLogIn ?
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

const mapStateToProps = (state, ownProps) => {
return {}
};




export default connect(mapStateToProps)(NavbarBabite);
