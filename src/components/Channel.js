import React, { Component } from 'react'
import Player from './Player'
import { getChannelByName } from '../actions/channelActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment'

class Channel extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoNumber: 0,
      currentProgramme: "",
      currentMedia: ""
    };

  }

  componentDidMount(){
    const name = window.location.pathname.replace('/','');
    this.props.getChannelByName(name);
  }

  componentDidUpdate(){
    this.ffuckoff();
  }

  ffuckoff(){
    const channelData = this.props.channel
    let currentVideo
    try {
      const programmeKeysOfDay = this.getTodaysKeys(Object.keys(channelData.programme))
      let programmeInfo = this.getCurrentProgramme(channelData.programme, programmeKeysOfDay);
      const currentVideoInfo = this.showMedia(channelData.programme[programmeInfo.key], programmeInfo.start)
      currentVideo = currentVideoInfo.videoSource + "?t=" + currentVideoInfo.offset
      this.setState({
        currentMedia: currentVideo
      })
      return 'fuckoff';
    } catch (e) {
      console.log(e)
    }
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

  getCurrentProgramme(programmes, programmeKeys){
    const now = moment().unix()
    for(const element of programmeKeys) {
      const programmeStartingTime = moment(element).utc().unix()
      const programmeLength = this.getProgrammeLength(programmes[element])
      if(now > programmeStartingTime){
        if(now > programmeStartingTime + programmeLength){
          continue;
        }else{
          return {"key": element, "start": programmeStartingTime};
        }
      }
    }
    return false;
  }

  getProgrammeLength(programme){
    let programmeLength = 0;
    for(const media of programme){
      let mediaLength = parseInt(media.length)
      if(!isNaN(mediaLength)){
        programmeLength += mediaLength
      }
    }
    return programmeLength
  }

  showMedia(currentProgramme, start){
    const now = moment().unix()
    let programmeProgress = now-start;
    let mediaNumber = 0;
    for(const media of currentProgramme){
      if(programmeProgress >= media.length){
        programmeProgress -= media.length
        mediaNumber++
      }else{
        return { "videoSource": media.url, "offset":  programmeProgress, "position": mediaNumber }
      }
    }
  }

  nextMedia(){
    this.setState({
           messageShown: true
       });
  }

  render() {
    return (
      <div>
        <Player url={this.state.currentMedia}> </Player>
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
