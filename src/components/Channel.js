import React, { Component } from 'react'
import Player from './Player'
import { getChannelByName } from '../actions/channelActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Channel extends Component {
  componentDidMount(){
    this.props.getChannelByName('MTV');
  }

  render() {
    
    // const channelData = this.props.channel
    // let currentVideo
    // try {
      // const programmeKeysOfDay = this.getTodaysKeys(Object.keys(channelData.programme))
      // let programmeInfo = this.getCurrentProgramme(channelData.programme, programmeKeysOfDay);
      // const currentVideoInfo = this.showMedia(channelData.programme[programmeInfo.key], programmeInfo.start)
      // currentVideo = currentVideoInfo.videoSource + "?t=" + currentVideoInfo.offset
      // this.setState({
      //   currentMedia: currentVideo
      // })
      // return 'fuckoff';
    // } catch (e) {
      // console.log(e)
    // }
    return (
      <Player />
    )
  }
}

Channel.propTypes = {
  getChannelByName: PropTypes.func.isRequired,
  // channel: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  channel: state.channelName
})

 export default connect(mapStateToProps, { getChannelByName })(Channel);
