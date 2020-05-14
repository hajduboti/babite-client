import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChannels } from '../actions/channelActions';
import { Row, Card, Container, Col } from 'react-bootstrap'
class Channels extends Component {
  componentDidMount(){
    this.props.fetchChannels();
  }

  render() {
    const channelItems = this.props.channels.map(channel => (
      <Col xs={12} sm={6} md={3} large={4} >
        <Card key={channel.name} className="my-2 channel-card" style={{ width: '100%' }}>
        <Card.Img variant="top" className="card-img-top" src={channel.thumbnail} />
        <Card.Body >
          <Card.Title>{channel.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{channel.category}</Card.Subtitle>
          <Card.Text>
              {channel.description}
          </Card.Text>
        </Card.Body>
        </Card>
      </Col>

    ))


    return (
      <div>
      <Container fluid="py-4 channel-container px-4">
        <h1>Channels</h1>

        <Row className="px-10 justify-content-center">
          {channelItems}
        </Row>
      </Container>

      </div>
    )
  }
}


const mapStateToProps = state => ({
  channels: state.channels.items
})

 export default connect(mapStateToProps, { fetchChannels })(Channels);
