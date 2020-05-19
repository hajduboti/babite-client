import React from 'react'
import {Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "../../static/css/login.css";
import { Auth } from "aws-amplify";
class Login extends Component {

    constructor(props){  
        super(props);  
        this.state = { 
            username: "",
            setUsername: "",
            password: "",
            setPassword: ""
         };  
         this.validateForm = this.validateForm.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)

    }   

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
        }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            await Auth.signIn(this.state.username, this.state.password);
            alert("Logged in");
            window.location = ""
          } catch (e) {
            alert(e.message);
          }
        }


    handleChange(event, field) {
      
        let value = event.target.value;
        if(field === "username"){
            this.setState({
                username: value
            });
        }else if(field ==="password"){
            this.setState({
                password: value
            });
        }
    }
render(){
  return (
    <div className="Login">
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="username" >
          <label>Username</label>
          <FormControl
            autoFocus
            type="text"
            value={this.state.username}
            onChange={e => this.handleChange(e, "username")}
          />
        </FormGroup>
        <FormGroup controlId="password" >
          <label>Password</label>
          <FormControl
            value={this.state.password}
            onChange={e => this.handleChange(e, "password")}
            type="password"
          />
        </FormGroup>
        <Button block disabled={!this.validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
}
export default Login;

