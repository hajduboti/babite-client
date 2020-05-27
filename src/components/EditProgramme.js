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

      };
      this.renderModal = this.renderModal.bind(this)
    } 
    
    componentDidMount(){
    }

    // When selecting time range on calendar, toggle isOpen to display popup
    handleSelect = ({ start, end, url, timestamp }) => {
      this.setState({isOpen: !this.state.isOpen})

      //This saves event to calendare if valid values
      if(url){
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
        })
      }
     
    }

    saveEvent = ({start, end, url, timestamp}) => {
     this.setState({isOpen: false})
  
    }

    renderModal = () => {

      if (!this.state.isOpen){
        return;
      } else{
        return(
          <Modal
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
            <input placeholder="content url"></input>
            <input placeholder="timestamp"></input>
            <button onClick={this.saveEvent}>Confirm</button>

          </Modal.Body>
        </Modal>
       )
      }
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
            onSelectEvent={event => alert(event.title)}
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