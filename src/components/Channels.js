import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChannels } from '../actions/channelActions';

class Channels extends Component {
  componentDidMount(){
    this.props.fetchChannels();
  }

  render() {
    const channelItems = this.props.channels.map(channel => (
      <div key={channel.name}>
        <h2> {channel.name} </h2>
        <p> {channel.category} </p>
      </div>
    ))


    return (
      <div>
      <h1>Channels</h1>
      {channelItems}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  channels: state.channels.items
})

 export default connect(mapStateToProps, { fetchChannels })(Channels);
