import React, {Component} from 'react'
import { Container, Modal } from 'react-bootstrap';
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
  // KeyboardDatePicker,
} from '@material-ui/pickers';

import "../static/css/programme_main.css"
import "../static/css/programme.css"
import axios from "axios"
import YOUTUBE_API_KEY from "../youtube-exports"


export default class EditProgramme extends Component {
  calendarRef = React.createRef()
    constructor(props){  
      super(props);  
      this.handleChange = this.handleChange.bind(this);
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleEventClick = this.handleEventClick.bind(this);
      this.handleEventDrag = this.handleEventDrag.bind(this);
      this.saveProgramme = this.saveProgramme.bind(this);
      this.getYoutubeVideoDuration = this.getYoutubeVideoDuration.bind(this)
    } 

    state = {
      calendarWeekends: true,
      calendarEvents: [],
      url: '',
      duration: null,
      selectedDate: '',
      selectedEvent: '',
      endDate: ''

    };    

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
            // slotDuration={{
            //   "hours": 1
            // }}
            defaultView={'timeGridWeek'}
            plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]} 
            events={this.state.calendarEvents}
            dateClick={this.saveEvent}
            eventClick={this.handleEventClick}
            editable={true}
            selectable={true}
            allDayText={''}
            slotDuration={'00:30:00'}
            slotLabelFormat={[
              {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12:false,
                  // hourCycle: '12'
              }
              ]}
              eventTimeFormat= {{ // like '14:30:00'
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false,
              hour12: false
            }}
            locale={'en-GB'}
            eventDrop={this.handleEventDrag}
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
          end: this.state.endDate
        })
      })
    }else if(this.state.isSelectedEvent){
      this.setState({calendarEvents: this.state.calendarEvents.concat({
        title: this.state.url,
        start: this.state.selectedDate,
        end: this.state.endDate
      })
    
    })
  }
  };

  handleEventDrag = (eventDropInfo ) => {
    let calendarEvents = this.state.calendarEvents
    let oldEvent = eventDropInfo.oldEvent
    let oldEventDate = moment(oldEvent.start).format("YYYY-MM-DD HH:mm:ss")
    let newEvent = eventDropInfo.event
    // console.log(eventDropInfo.event)

    for(let item in calendarEvents){
      if(oldEvent.title === calendarEvents[item].title && oldEventDate === calendarEvents[item].start ){
        calendarEvents.splice(calendarEvents.indexOf(calendarEvents[item]), 1)
      }
  }
  this.setState({calendarEvents: this.state.calendarEvents.concat({
    title: newEvent.title,
    start: moment(newEvent.start).format("YYYY-MM-DD HH:mm:ss"),
    })
  })
  }
  
  handleEventClick = (calEvent, jsEvent, view) => {
    let calendarEvents = this.state.calendarEvents
    let currentClickedEvent = calEvent.event
    if(currentClickedEvent){
      
      let date = moment(currentClickedEvent.start).format("YYYY-MM-DD HH:mm:ss")
      let durationDate = moment(date).add(this.state.duration, 'seconds').format("YYYY-MM-DD HH:mm:ss");

      this.setState({selectedDate:date, endDate:durationDate })

      for(let item in calendarEvents){
        if(currentClickedEvent.title === calendarEvents[item].title && date === calendarEvents[item].start ){
          calendarEvents.splice(calendarEvents.indexOf(calendarEvents[item]), 1)
        }
      }

    }
      this.setState({isSelectedEvent: !this.state.isSelectedEvent}, this.handleDateClick())
    }

   saveEvent = (arg) => {
    let date = moment(arg.dateStr).format("YYYY-MM-DD HH:mm:ss")
    let durationDate = moment(date).add(this.state.duration, 'seconds').format("YYYY-MM-DD HH:mm:ss");

    this.setState({selectedDate:date, endDate:durationDate })
    this.setState({isNewEventModal: !this.state.isNewEventModal}, this.handleDateClick())
    }

    saveProgramme(){
      console.log(this.state.calendarEvents)
    }










    getYoutubeVideoDuration(videoId){
      let videoDurationSeconds
      const response = axios({
        baseURL: 'https://www.googleapis.com/youtube/v3/videos',
        params:{
          id: videoId,
          part: 'contentDetails',
          key:YOUTUBE_API_KEY
        }
      }).then(function(result){
        if(result.data.items.length !== 0){
          let videoDuration = result.data.items[0].contentDetails.duration
          videoDurationSeconds = moment.duration(videoDuration).asSeconds()
          return videoDurationSeconds
        }


        
      }).then((response)=> this.setState({duration: response}))

    }

  handleChange(event) {
    // this.setState({url: event.target.url, duration: event.target.duration});
    if(event.target.id === 'url'){
      this.setState({url: event.target.value});

      let videoUrlStringified = event.target.value

      //ensure url entered is a valid youtube url
      const videoId = typeof videoUrlStringified==="string" ?videoUrlStringified.split('watch?v=')[1]: ""
      if(videoId){
        this.getYoutubeVideoDuration(videoId)
      }
    }















      // this.setState({duration: videoDurationSeconds});


    // }else if(event.target.id === 'time'){
    //   this.setState({duration: event.target.value});
    // }

  
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
            {/* <KeyboardDatePicker
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
            /> */}

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
                <input onChange={this.handleChange} defaultValue={this.state.duration} placeholder="duration" disabled id='time'></input>
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
              {/* <KeyboardDatePicker
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
              />  */}

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
                  <input onChange={this.handleChange} defaultValue={this.state.duration} placeholder="duration" disabled id='time'></input>
                  <button onClick={this.saveEvent}>Confirm</button>
        
                </Modal.Body>
              </Modal>
       )
  }
}
