import React, { Component } from 'react'
import Player from './Player'
import { getChannelByName } from '../actions/channelActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Channel extends Component {
  componentDidMount(){
    const name = window.location.pathname.replace('/','');
    this.props.getChannelByName(name);
    const channelData = this.props.getChannelByName(name);
  }

  render() {
    const data = this.props.channel;
    return (
      <div>
        <Player />
        {data}
      </div>


    )
  }
}

Channel.propTypes = {
  getChannelByName: PropTypes.func.isRequired,
  channel: PropTypes.string
};

const mapStateToProps = state => ({
  channel: state.channels.currentChannel
})

 export default connect(mapStateToProps, { getChannelByName })(Channel);
