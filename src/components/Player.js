import React, { Component } from 'react'
import '../static/css/player.css'
import { Row,  Container, Col } from 'react-bootstrap'
import ReactPlayer from 'react-player'


export default class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    let url = this.props.url

    return (

      <Container fluid >
        <Row className="player-row">
          <Col xs={{ span: 8, offset: 2 }} className="player-container">
            <ReactPlayer width="100%" height="100%" url={url} playing />
          </Col>
        </Row>
      </Container>

  )}
}
