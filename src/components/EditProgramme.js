import React, {Component} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Button, Modal } from 'react-bootstrap';
import "../static/css/programme.css";

const localizer = momentLocalizer(moment);
const propTypes = {}

// Start week at Monday rather than Sunday.
moment.locale('ko', {week: {dow: 1,doy: 1,},});

class EditProgramme extends Component {
    constructor(props){  
      super(props);  
      const events = [{}]

      this.state = {
        events,
        isOpen: false,
        url: '',
        timestamp: ''
      };
      this.renderModal = this.renderModal.bind(this)
      this.handleChange = this.handleChange.bind(this);
      this.handleSelect = this.handleSelect.bind(this);

    } 
    
    componentDidMount(){
    }

    // When selecting time range on calendar, toggle isOpen to display popup
    handleSelect = ({ start, end }) => {
      let url = this.state.url
      let timestamp = this.state.timestamp
      this.setState({isOpen: !this.state.isOpen})
 
      //This saves event to calendar if valid values
      if(start && end && url){  
        this.setState({
          events: [
            ...this.state.events,
            {
              start, 
              end, 
              url,
              timestamp,
            },
          ],
          isOpen: false
        },
        // Clear state for next input
        this.setState({
          url: '',
          timestamp: ''
        }))
      }
    }

    saveEvent = (event) => {
     this.setState({isOpen: false})
     console.log(event)
    // this.state.url = 
    // this.state.timestamp
  
    }

    handleChange(event) {
      // this.setState({url: event.target.url, timestamp: event.target.timestamp});
      if(event.target.id === 'url'){
        this.setState({url: event.target.value});

      }else if(event.target.id === 'time'){
        this.setState({timestamp: event.target.value});
      }

    }

    renderModal = () => {

      // if (!this.state.isOpen){
      //   return;
      // } else{
        return(
        <Modal data-backdrop="false"
          keyboard
          show={this.state.isOpen}
          onHide={() => this.setState({isOpen: false})}
          aria-labelledby="ModalHeader"
        >

          <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Enter Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <input onChange={this.handleChange} defaultValue={this.state.url}  placeholder="content url" id='url'></input>
            <input onChange={this.handleChange} defaultValue={this.state.timestamp} placeholder="timestamp" id='time'></input>
            <button onClick={this.saveEvent}>Confirm</button>

          </Modal.Body>
        </Modal>
       )
      // }
    }

    render() {
        return(
          <div className="container">
          {this.renderModal()}
          <Container className="calendar-background">
            <Calendar
            selectable
            events={this.state.events}
            localizer={localizer}
            views={['day', 'week']}
            defaultView='day'
            onSelectEvent={event => alert(event.url + " " + event.timestamp)}
            onSelectSlot={this.handleSelect}

          />
        </Container>
        <Button>Confirm Programme</Button>
        </div>
        )
    }

}
EditProgramme.propTypes = propTypes


const mapStateToProps = state => ({
  })
  
   export default connect(mapStateToProps, { })(EditProgramme);