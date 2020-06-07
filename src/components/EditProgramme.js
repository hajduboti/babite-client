import React, {Component} from 'react'
import { Container, Modal } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import moment from 'moment'
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
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
      // url: '',
      // duration: '',
      selectedDate: '',
      selectedEvent: '',
      endDate: '',
      isNewEventModal: false,
      isSelectedEvent: false,
      url: [],
      duration: [],
      videos: [],
      inputs: ['input-0']

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
            defaultView={'timeGridWeek'}
            plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]} 
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
            eventDurationEditable={false}
            editable={true}
            selectable={true}
            timeZone={'utc'}
            allDayText={''}
            slotDuration={'00:30:00'}
            slotLabelFormat={[
              {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12:false,
              }
              ]}
              eventTimeFormat= {{
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

    createEvent =() => {
      //we set the enddate here because otherwise this.state.duration is not updated from the modal input value
      if(this.state.isNewEventModal){
        this.setState({calendarEvents: this.state.calendarEvents.concat({
          title: this.state.url,
          start: this.state.selectedDate,
          end: moment.utc(this.state.selectedDate).add(this.state.duration, 'seconds').format("YYYY-MM-DD HH:mm:ss")

        })
      }, this.setState({isNewEventModal: false}))
    }else if(this.state.isSelectedEvent){

      let calendarEvents = this.state.calendarEvents
      let date = moment.utc(this.state.selectedEvent.start).format("YYYY-MM-DD HH:mm:ss")

      for(let item in calendarEvents){
        if(this.state.selectedEvent.title === calendarEvents[item].title && date === calendarEvents[item].start ){
          // do a check to see if the selected event really exists in calender, and if so, remove it
          calendarEvents.splice(calendarEvents.indexOf(calendarEvents[item]), 1)
        }
      }
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
      let oldEventDate = moment.utc(oldEvent.start).format("YYYY-MM-DD HH:mm:ss")
      let newEvent = eventDropInfo.event

      for(let item in calendarEvents){
        if(oldEvent.title === calendarEvents[item].title && oldEventDate === calendarEvents[item].start ){
          calendarEvents.splice(calendarEvents.indexOf(calendarEvents[item]), 1)
        }
    }
    this.setState({calendarEvents: this.state.calendarEvents.concat({
      title: newEvent.title,
      start: moment.utc(newEvent.start).format("YYYY-MM-DD HH:mm:ss"),
      //fix end logic
      // end: moment(oldEvent.end).format("YYYY-MM-DD HH:mm:ss")
      })
    })
    }
  

    handleEventClick = (calEvent) =>{    

      let currentClickedEvent = calEvent.event
      
      if(currentClickedEvent){

        // Initialise variables with start and end times of selected event
        let startTime = moment.utc(currentClickedEvent.start)
        let endTime = moment.utc(currentClickedEvent.end)

        // Initialise variables with start and end times of selected event in date format
        let date = moment.utc(currentClickedEvent.start).format("YYYY-MM-DD HH:mm:ss")
        let durationDate = moment.utc(date).add(this.state.duration, 'seconds').format("YYYY-MM-DD HH:mm:ss");
        
        //Calculate the difference between the selected event times, to display in the duration box
        let startEndTimeDifference = moment.duration(endTime.diff(startTime)).asSeconds();

        this.setState({
          selectedDate:date, 
          endDate:durationDate,
          url: currentClickedEvent.title,
          duration:startEndTimeDifference,
          selectedEvent: currentClickedEvent
        })

      }
          this.setState({isSelectedEvent: !this.state.isSelectedEvent}, this.createEvent())
      
    }

    handleDateClick = (arg) =>{
      this.setState({isNewEventModal: !this.state.isNewEventModal}, this.saveEvent(arg))
    
    }

   saveEvent = (arg) => {
    let date = moment.utc(arg.dateStr).format("YYYY-MM-DD HH:mm:ss")
    this.setState({selectedDate:date}, this.createEvent())
    
    }

    saveProgramme(){
      console.log(this.state.calendarEvents)
    }

    getYoutubeVideoDuration(videoId, url){
      let videoDurationSeconds
      const videos = [...this.state.videos]
      var i = videos.length
      var url = url
      axios({
        baseURL: 'https://www.googleapis.com/youtube/v3/videos',
        params:{
          id: videoId,
          part: 'contentDetails',
          key: YOUTUBE_API_KEY
        }
      // }).then(function(result){
      }).then((result) => {
      if(result.data.items.length !== 0){
          let videoDuration = result.data.items[0].contentDetails.duration
          videoDurationSeconds = moment.duration(videoDuration).asSeconds()
          return videoDurationSeconds
        }else{
          return "url is invalid"
        }

      }).then((response)=> 

      this.setState({duration: response},() =>
        // console.log(url),
        videos[i] = {...videos[i], [url]: response},
        // console.log(videos),
    
        // this.setState({ videos }, ()=> console.log(this.state.videos)),
        this.setState({ videos }),
    )
      // })
      )
      

    }


  renderEventSelectModal = (event) => {
    return(
      <Modal data-backdrop="false"
        keyboard
        show={this.state.isSelectedEvent}
        onHide={() => this.setState({isSelectedEvent: false})}
        aria-labelledby="ModalHeader"
      >
              <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                Edit a Programme
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input onChange={this.handleChange} defaultValue={this.state.url}  placeholder="content url" id='url'></input>
                <input onChange={this.handleChange} value={this.state.duration} placeholder="duration" disabled id='time'></input>
                {/* <button onClick={() => this.handleEventClick(true)}>Confirm</button> */}
                <button onClick={this.handleEventClick}>Confirm</button>
      
              </Modal.Body>
            </Modal>
     )
  }

  handleDateChange = (date) => {
    date = moment.utc(date).format("YYYY-MM-DD HH:mm:ss")
    this.setState({selectedDate: date});
  };

  appendInput() {
    var newInput = `input-${this.state.inputs.length}`;
    var newUrl = this.state.url.length;
    var newDuration = this.state.duration.length;
    this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput])}));
    // this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]), videos: [...prevState.videos, { url: "", duration: "" }] }));

}

handleChange(event, i) {

    let url = [...this.state.url];
    url[event.target.id] = event.target.value
    // videos[i] = {...videos[i]};
    // console.log(videos)

    this.setState({ url });


    let videoUrlStringified = event.target.value

    //ensure url entered is a valid youtube url
    //TODO: fix this regex expression
    const videoId = typeof videoUrlStringified==="string" ?videoUrlStringified.split('/watch?v=')[1]: ""
    if(videoId){
      this.getYoutubeVideoDuration(videoId, event.target.value)

    }
  

}
  renderDateSelectModal = () => {
    // console.log(this.state.url)
    console.log(this.state.videos[0])
    
      return(
        <Modal data-backdrop="false"
          keyboard
          show={this.state.isNewEventModal}
          onHide={() => this.setState({isNewEventModal: false})}
          aria-labelledby="ModalHeader"
        >

                <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Create a new programme
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <div id="dynamicInput">
                       {this.state.inputs.map((input, i) => 
                       <div key={input}>
                         {/* https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c */}
                        <input id={`${input}-url`} onChange={this.handleChange} defaultValue={this.state.url}  placeholder="content url"></input>
                        <input id={`${input}-duration`} onChange={this.handleChange} value={this.state.videos[i]} placeholder="duration" disabled></input>
                       </div> )}
              </div>
                  {/* <input onChange={this.handleChange} defaultValue={this.state.url}  placeholder="content url" id='url'></input>
                  <input onChange={this.handleChange} value={this.state.duration} placeholder="duration" disabled id='time'></input> */}
                  {/* disable button if above inputs are not valid */}
                  {/* <button onClick={this.createEvent}>Confirm</button> */}
                  <button onClick={() => this.createEvent(this.state.duration)}>Confirm</button>
                </Modal.Body>
                <button onClick={ () => this.appendInput() }>
                   CLICK ME TO ADD AN INPUT
               </button>
              </Modal>
       )
  }
}
