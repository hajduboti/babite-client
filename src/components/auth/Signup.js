import React from 'react'
import {Component } from "react";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "../../static/css/login.css";
import { Auth } from "aws-amplify";
class Signup extends Component {
  /* 
    TODO:
      - verify password fields should make sure passwords match
      - DOB field?
      - Fix Exit button on signup and login fields
      -
  
  */
    constructor(props){  
        super(props);  
        this.state = { 
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            confirmationCode: "",
            newUser: null
         };  
         this.validateForm = this.validateForm.bind(this)
         this.validateConfirmationForm = this.validateConfirmationForm.bind(this)
         this.handleSubmit = this.handleSubmit.bind(this)
         this.handleConfirmationSubmit = this.handleConfirmationSubmit.bind(this)
         this.renderConfirmationForm = this.renderConfirmationForm.bind(this)
         this.renderForm = this.renderForm.bind(this)


    }   

    validateForm() {
      console.log("validated")
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
        }

    validateConfirmationForm() {
      return this.state.confirmationCode.length > 0;
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
          this.setState({newUser: newUser})
        } catch (e) {
          alert(e.message);

        }
      }
    async handleConfirmationSubmit(event) {
        event.preventDefault();
        try {
          await Auth.confirmSignUp(this.state.email, this.state.username, this.state.confirmationCode);
          await Auth.signIn(this.state.email, this.state.password);
            // window.location = ""
          } catch (e) {
            alert(e.message);
          }
        }

    // Handle changes on fields in the form
    handleChange(event, field) {
      
      console.log(this.state.username)
      console.log(this.state.password)
      console.log(this.state.confirmPassword)
      console.log(this.state.email)
      console.log(this.state.confirmationCode)
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

          case "confirmationcode":
              this.setState({
                confirmationCode: value
            }); 
            break;
           
        }
    }

    renderConfirmationForm(){
      return(
      <form onSubmit={this.handleConfirmationSubmit}>
      <FormGroup controlId="confirmationCode">
          <label>Confirmation Code</label>
          <FormControl
            autoFocus
            type="tel"
            onChange={e => this.handleChange(e, "confirmationcode")}
            value={this.state.confirmationCode}
          />
          <Form.Text>Please check your email for the code.</Form.Text>
          <Button block disabled={!this.validateConfirmationForm()} type="submit">
              Confirm
            </Button>
        </FormGroup>
        </form>
        )
    }
    renderForm(){
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
render(){
  return(
  <div className="Signup">
  {this.state.newUser === null ?  this.renderForm() : this.renderConfirmationForm() }
</div>
)
}
}
export default Signup;

