import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Container, Button, Modal } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
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
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleEventClick = this.handleEventClick.bind(this);
      this.saveProgramme = this.saveProgramme.bind(this);
    } 

    state = {
      calendarWeekends: true,
      calendarEvents: [{}],
      url: '',
      timestamp: '',
      selectedDate: '',
      selectedEvent: ''

    };

    componentDidMount(){
      // this.setState({selectedDate: new Date(), selectedTime: new Date().getTime() })
    }
    

    render() {
        return(
          <Container className= "container">
          {this.renderDateSelectModal()}
          {this.renderEventSelectModal()}
          <FullCalendar
            ref={this.calendarRef}
            header={{
              left: "prev,next today",
              center: "title",
              right: "timeGridWeek, timeGridDay"
            }}
            slotDuration={{
              "hours": 1
            }}
            defaultView={'timeGridWeek'}
            plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]} 
            events={this.state.calendarEvents}
            dateClick={this.saveEvent}
            eventClick={this.handleEventClick}
            editable={true}
            selectable={true}
            allDayText={''}
            slotLabelFormat={[
              {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12:false
              }
              ]}
            />
            <button onClick={this.saveProgramme}>Confirm Programme</button>
        </Container>
        )
    }

    handleDateClick =(arg) => {
      if(this.state.isNewEventModal){
        this.setState({calendarEvents: this.state.calendarEvents.concat({
          title: this.state.url,
          start: this.state.selectedDate,
        })
      })
    }else if(this.state.isSelectedEvent){
      this.setState({calendarEvents: this.state.calendarEvents.concat({
        title: this.state.url,
        start: this.state.selectedDate,
      })
    
    })
  }

  };
  handleEventClick = (calEvent, jsEvent, view) => {
    if(calEvent.event){
      
      let date = moment(calEvent.event.start).format("YYYY-MM-DD HH:mm:ss")
      this.setState({selectedDate:date })
      //This needs to be refactored, Christopher
      for(let item in this.state.calendarEvents){
        if(calEvent.event.title === this.state.calendarEvents[item].title && date === this.state.calendarEvents[item].start ){
          this.state.calendarEvents.splice(this.state.calendarEvents.indexOf(this.state.calendarEvents[item]), 1)
        }
      }

    }
      this.setState({isSelectedEvent: !this.state.isSelectedEvent}, this.handleDateClick())
    }

   saveEvent = (arg) => {
     let date = moment(arg.dateStr).format("YYYY-MM-DD HH:mm:ss")
    this.setState({selectedDate:date})
    this.setState({isNewEventModal: !this.state.isNewEventModal}, this.handleDateClick())
    }

    saveProgramme(){
      console.log(this.state.calendarEvents)
    }

  handleChange(event) {
    // this.setState({url: event.target.url, timestamp: event.target.timestamp});
    if(event.target.id === 'url'){
      this.setState({url: event.target.value});
  
    }else if(event.target.id === 'time'){
      this.setState({timestamp: event.target.value});
    }

  
  }
  renderEventSelectModal = (event) => {
    return(
      <Modal data-backdrop="false"
        keyboard
        show={this.state.isSelectedEvent}
        onHide={() => this.setState({isSelectedEvent: false})}
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
              ampm={false}
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
                Edit Content
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input onChange={this.handleChange} defaultValue={this.state.url}  placeholder="content url" id='url'></input>
                <input onChange={this.handleChange} defaultValue={this.state.timestamp} placeholder="timestamp" id='time'></input>
                <button onClick={this.handleEventClick}>Confirm</button>
      
              </Modal.Body>
            </Modal>
     )
  }

  handleDateChange = (date) => {
    date = moment(date).format("YYYY-MM-DD HH:mm:ss")
    this.setState({selectedDate: date});
  };

  renderDateSelectModal = () => {

      return(
        <Modal data-backdrop="false"
          keyboard
          show={this.state.isNewEventModal}
          onHide={() => this.setState({isNewEventModal: false})}
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
                ampm={false}
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
