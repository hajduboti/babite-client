import React from 'react';
import '../static/css/popup.css';
import { Button } from 'react-bootstrap'


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        }
        this.escFunction = this.escFunction.bind(this);
        this.exitPopup = this.exitPopup.bind(this);
    }

    escFunction(event){
        // If escape key pressed
        if(event.keyCode === 27) {
            this.setState({ isOpen: false })
            this.props.onclose(this.state.isOpen)
        }
    }

    exitPopup(event){
        this.setState({ isOpen: false })
        this.props.onclose(this.state.isOpen)
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
                <h2>{this.props.heading}</h2>
                <h5>{this.props.subheading}</h5>
                    {this.props.html}
                <Button onClick={this.exitPopup} variant="outline-dark">Exit</Button>
                </div>
                </div>
                : null }
        </div>

    );
    }
    }

export default Popup;
