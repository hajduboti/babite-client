import React, {Component} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'
import { connect } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);


class EditProgramme extends Component {
    constructor(props){  
      super(props);  
      const events = [
        {
        }
      ]
      this.state = {
        name: 'React',
        events
      };
    } 
    
    componentDidMount(){
    //   this.props.fetchProgrammes();
    }

    render() {
        return(
            <div> 
                <Calendar
                events={this.state.events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={moment().toDate()}
                localizer={localizer}
            />
            </div>
        )
    }

}

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.


const mapStateToProps = state => ({
    // channels: state.channels.items
  })
  
//    export default connect(mapStateToProps, { fetchProgrammes })(EditProgramme);
   export default connect(mapStateToProps, { })(EditProgramme);