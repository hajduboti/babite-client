import React from 'react'
import {Component } from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "../../static/css/login.css";
import { Auth } from "aws-amplify";
class Signup extends Component {
  /* 
    TODO:
      - DOB field?
      - Fix error message on confirm sign up button click 'network error'
      - Fix error when clicking confirmation link in email (lambda error)
  
  */
    constructor(props){  
        super(props);  
        this.state = { 
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
         };  
         this.validateForm = this.validateForm.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)


    }   

    validateForm() {
      console.log("validated")
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
        }

    async handleSubmit(event) {
      try {
        const newUser = await Auth.signUp({
            username: this.state.username,
            password: this.state.password,
            attributes: {
              email: this.state.email
          }
          });
          alert("A verification link as been sent to your email. Please confirm.")
        } catch (e) {
          alert(e.message);

        }
      }
    

    // Handle changes on fields in the form
    handleChange(event, field) {
        let value = event.target.value;
        switch(field){
          case "username":
              this.setState({
                username: value
            });
            break;
          case "password":
              this.setState({
                password: value
            });
            break;

          case "confirmpassword":
              this.setState({
                confirmPassword: value
            });
            break;

          case "email":
              this.setState({
                email: value
            }); 
            break;
           
        }
    }
    renderForm(){
      
    }
render(){
  return (
    <div className="Login">
      <form onSubmit={this.handleSubmit}>
        {/* Username */}
        <FormGroup controlId="username" >
          <label>Username</label>
          <FormControl
            autoFocus
            type="text"
            value={this.state.username}
            onChange={e => this.handleChange(e, "username")}
          />
        </FormGroup>

        {/* Password */}
        <FormGroup controlId="password" >
          <label>Password</label>
          <FormControl
            value={this.state.password}
            onChange={e => this.handleChange(e, "password")}
            type="password"
          />
        </FormGroup>

        {/* Confirm Password */}
        <FormGroup controlId="confirmpassword" >
          <label>Confirm Password</label>
          <FormControl
            value={this.state.confirmPassword}
            onChange={e => this.handleChange(e, "confirmpassword")}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="email" >
          <label>Email</label>
          <FormControl
            value={this.state.email}
            onChange={e => this.handleChange(e, "email")}
            type="email"
          />
        </FormGroup>
        
        <Button block disabled={!this.validateForm()} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
}
export default Signup;

