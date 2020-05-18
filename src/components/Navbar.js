import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChannels } from '../actions/channelActions';
import { Navbar, Nav, Form} from 'react-bootstrap'
import BabiteLogo from '../static/img/BabiteLogo.png'
import { Link } from "react-router-dom";
import Popup from "./Popup"
import Login from './auth/Login';
import { Auth } from "aws-amplify";

class NavbarBabite extends Component {
  constructor(props){  
    super(props);  
    this.state = { showPopup: false };  
    }  

  componentDidMount(){
    this.props.fetchChannels();
  }

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }  

  async handleLogout() {  
      try {
          //Auth.signOut is currently broken and does not support non-global sign outs, therefore I had to hack in my solution.
          await Auth.signOut();
          for (let key in localStorage) {
            if (key.substring(0,30) == 'CognitoIdentityServiceProvider') {
              localStorage.removeItem(key);
            }
          }
          alert("Logged out");
          window.location =""
          //TODO: Save user session somehow. Token, Cookies, etc.
          // this.props.isAuthenticated = true;

        } catch (e) {
          alert(e.message);
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
              <Nav.Item className="nav-item">
                      <Nav.Link className="nav-link">Following</Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                      <Nav.Link className="nav-link" >Browse</Nav.Link>
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
                      {isAuthenticated ? <Nav.Link className="nav-link" onClick={this.handleLogout.bind(this)}>LogOut</Nav.Link> : <Nav.Link  className="nav-link" onClick={this.togglePopup.bind(this)}> Log In </Nav.Link>}
                  </Nav.Item>
              </ul>
              {this.state.showPopup ?  
                <Popup  
                          isOpen={true}
                          text='Enter credentials'  
                          closePopup={this.togglePopup.bind(this)}
                          html={<Login/>}  
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
