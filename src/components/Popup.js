import React from 'react';  
import '../static/css/popup.css';  
import Login from "./auth/Login"
import { render } from '@testing-library/react';
class Popup extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        }
        this.escFunction = this.escFunction.bind(this);

    }

    escFunction(event){
        // If escape key pressed
        if(event.keyCode === 27) {
            this.setState({ isOpen: false })
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);

    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);

    }
  render() {
    return (  
        <div>
            {this.state.isOpen ? 
                <div className='popup'>  
                <div className='popup_inner'>  
                <h1>{this.props.text}</h1>
                    {this.props.html}
                <button onClick={this.props.closePopup}>Exit</button>  
                </div>  
                </div>
                : null }
        </div>
   
    );  
    }  
    }  

export default Popup;