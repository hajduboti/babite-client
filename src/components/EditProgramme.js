import React, {Component} from 'react'
import moment from 'moment'
import { connect } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

import "../static/css/programme_main.css"
import "../static/css/programme.css"

// Start week at Monday rather than Sunday.
moment.locale('ko', {week: {dow: 1,doy: 1,},});

export default class EditProgramme extends Component {
  calendarRef = React.createRef()
    constructor(props){  
      super(props);  
    //  this.renderModal = this.renderModal.bind(this)
    this.handleChange = this.handleChange.bind(this);

    } 
    state = {
      calendarWeekends: true,
      calendarEvents: [{}],
      url: '',
      timestamp: ''
    };
    
    componentDidMount(){
    }


  
    // render() {
    //   return (
    //     <Container className= "container">

    //     <FullCalendar dateClick={this.handleDateClick}
    //      plugins={[ dayGridPlugin, interactionPlugin ]} />
    //    </Container>

    //   )
    // }
  
    // handleDateClick = (arg) => { // bind with an arrow function
    //   alert(arg.dateStr)
    // }
    render() {
        return(
          <Container className= "container">
          {this.renderModal()}
          <FullCalendar
            ref={this.calendarRef}
            defaultView="dayGridDay"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridWeek, dayGridDay"
            }}
            plugins={[ dayGridPlugin, interactionPlugin ]} 
            events={this.state.calendarEvents}
            dateClick={this.saveEvent}
            editable={true}

            />
        </Container>
        )
    }
    handleDateClick =(arg) => {
      if(this.state.isOpen){
        this.setState({calendarEvents: this.state.calendarEvents.concat({
          title: this.state.url,
          start: '2020-05-28T12:30:00Z',
          // allDay: arg.allDay
        })
      })
    }
  };

   saveEvent = (event) => {
    this.setState({isOpen: !this.state.isOpen}, this.handleDateClick())
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
}



// const mapStateToProps = state => ({
// })
  
// export default connect(mapStateToProps, { })(EditProgramme);