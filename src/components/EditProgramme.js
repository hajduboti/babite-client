import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import "../static/css/programme_main.css"
import "../static/css/programme.css"


export default class EditProgramme extends Component {
  calendarRef = React.createRef()
    constructor(props){  
      super(props);  
      this.handleChange = this.handleChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this)
    } 

    state = {
      calendarWeekends: true,
      calendarEvents: [{}],
      url: '',
      timestamp: '',
      selectedDate: '',

    };

    componentDidMount(){
      this.setState({selectedDate: new Date(), selectedTime: new Date().getTime() })
    }
    

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
            selectable={true}

            />
        </Container>
        )
    }
    handleDateClick =(arg) => {
      if(this.state.isOpen){
        this.setState({calendarEvents: this.state.calendarEvents.concat({
          title: this.state.url,
          start: this.state.selectedDate,
          // allDay: arg.allDay
        })
      })
    }
  };

   saveEvent = (arg) => {
    this.setState({selectedDate: arg.dateStr})
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

  handleDateChange = (date) => {
    this.setState({selectedDate: date});
  };

  renderModal = () => {

      return(
        <Modal data-backdrop="false"
          keyboard
          show={this.state.isOpen}
          onHide={() => this.setState({isOpen: false})}
          aria-labelledby="ModalHeader"
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={this.state.selectedDate}
                onChange={this.handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
                />
              </Grid>
              </MuiPickersUtilsProvider>

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
  }
}
