import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChannels } from '../actions/channelActions';
import Card from 'react-bootstrap/Card'
class Channels extends Component {
  componentDidMount(){
    this.props.fetchChannels();
  }

  render() {
    
    const channelItems = this.props.channels.map(channel => (
      <Card key={channel.name} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{channel.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{channel.category}</Card.Subtitle>
          <Card.Text>
              {channel.description}
          </Card.Text>
          {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
      </Card>
    ))


    return (
      <div>
      <h1>Channels</h1>
      <div className="row">
        {channelItems}
      </div>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  channels: state.channels.items
})

 export default connect(mapStateToProps, { fetchChannels })(Channels);
