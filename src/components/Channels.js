import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchChannels } from '../actions/channelActions';
import { Row, Card, Container, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Channels extends Component {
  componentDidMount(){
    this.props.fetchChannels();
  }

  render() {
    const channelItems = this.props.channels.map(channel => (
      <Col key={channel.name} xs={12} sm={6} md={3} large={2} >
        <Card  className="my-2 channel-card">
        <Card.Img variant="top" className="card-img-top" src={channel.thumbnail} />
        <Card.Body >
          <Card.Title><Link to={channel.name} className="card-title">{channel.name}</Link></Card.Title>
          <Card.Subtitle className="mb-2 text-muted"> <a className="card-subtitle" href="#">{channel.category}</a></Card.Subtitle>
          <Card.Text>
              {channel.description}
          </Card.Text>
        </Card.Body>
        </Card>
      </Col>

    ))

    return (
      <Container className="py-4 px-3" fluid="channel-container ">
        <Row className="px-10 justify-content-center align-items-stretch">
          {channelItems}
        </Row>
      </Container>
    )
  }
}

Channels.propTypes = {
  fetchChannels: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  channels: state.channels.items
})

 export default connect(mapStateToProps, { fetchChannels })(Channels);
