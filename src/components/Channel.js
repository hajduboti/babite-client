import React, { Component } from 'react'
import Player from './Player'


export default class Channel extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <Player/>
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
