import React, { Component } from 'react'
import Player from './Player'
import { getChannelByName } from '../actions/channelActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment'

class Channel extends Component {


  componentDidMount(){
    const name = window.location.pathname.replace('/','');
    this.props.getChannelByName(name);
  }

  getTodaysKeys(programmeKeys){
    let today = moment.utc().format("YYYY-MM-DD");
    let keys = [];
    for(const element of programmeKeys) {
      if(element.indexOf(today) > -1){
          keys.push(element)
      }
    }
    return keys.sort()
  }

  getCurrentProgrammeKey(programmeKeys){
    let currentProgrammeKey;
    for(const element of programmeKeys) {
      let unixKey = moment(element).utc().unix()
      if(moment().unix() > unixKey){
        currentProgrammeKey = element
      }else{
        return "No programmes"
      }
    }
    return currentProgrammeKey
  }

  showMedia(currentProgramme){
    return currentProgramme[0].url
  }

  render() {
    const channelData = this.props.channel
    let toDisplay;
    let currentVideo;
    if(channelData){
      const programmeKeysOfDay = this.getTodaysKeys(Object.keys(channelData.programme))
      if(programmeKeysOfDay){
        const currentProgrammeKey = this.getCurrentProgrammeKey(programmeKeysOfDay)
        currentVideo = (this.showMedia(channelData.programme[currentProgrammeKey]))
      }
    }

    return (
      <div>
        <Player url={currentVideo}> </Player>
      </div>


    )
  }
}

Channel.propTypes = {
  getChannelByName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  channel: state.channels.currentChannel
})

 export default connect(mapStateToProps, { getChannelByName })(Channel);
