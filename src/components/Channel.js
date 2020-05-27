import React, { Component } from 'react'
import Player from './Player'
import { getChannelByName } from '../actions/channelActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


class Channel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      channelName : 'MTV'
    }
  }

  componentDidMount(){
    this.props.getChannelByName('MTV');
  }

  render() {
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
  channel: state.channelData
})

 export default connect(mapStateToProps, { getChannelByName })(Channel);
