import React, {Component} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container } from 'react-bootstrap';
import "../static/css/programme.css";


const localizer = momentLocalizer(moment);
const date = moment(); // Thursday Feb 2015
const dow = date.day();

// Start week at Monday rather than Sunday.
moment.locale('ko', {week: {dow: dow}});


const propTypes = {}

class EditProgramme extends Component {
    constructor(props){
      super(props);
      const events = [{}]
      this.state = {
        events
      };
    }

    componentDidMount(){
    }

    handleSelect = ({ start, end }) => {
      const title = window.prompt('New Event name')
      if (title)
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title,
            },
          ],
        })
    }

    render() {
      // console.log(moment())
        return(
          <Container className="calendar-background">
            <div>
                <Calendar
                selectable
                events={this.state.events}
                localizer={localizer}
                views={['day', 'week']}
                defaultView='day'
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={this.handleSelect}
                format={"DD/MM/YYYY HH:mm"}
                startAccessor="start"
                      endAccessor="end"
            />
            </div>
            </Container>
        )
    }

}
EditProgramme.propTypes = propTypes


const mapStateToProps = state => ({
  })

//    export default connect(mapStateToProps, { fetchProgrammes })(EditProgramme);
   export default connect(mapStateToProps, { })(EditProgramme);
