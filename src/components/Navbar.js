import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChannels } from '../actions/channelActions';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import BabiteLogo from '../static/img/BabiteLogo.png'

class NavbarBabite extends Component {
  componentDidMount(){
    this.props.fetchChannels();
  }

  render() {
  


    return (
        <Navbar className="background-color" >
        <Navbar.Brand href="#home">
            <img src={BabiteLogo}>
            </img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link className="navbar-text" href="#home">Home</Nav.Link>
            <Nav.Link className="navbar-text" href="#link">Link</Nav.Link>
            <Nav.Link className="navbar-text" href="#link">Poop</Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        </Navbar.Collapse>
    </Navbar>
    )
  }
}


const mapStateToProps = state => ({
  channels: state.channels.items
})

 export default connect(mapStateToProps, { fetchChannels })(NavbarBabite);
