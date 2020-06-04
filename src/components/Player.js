import React, { Component } from 'react'
import '../static/css/player.css'
import { Row,  Container, Col } from 'react-bootstrap'
import ReactPlayer from 'react-player'


export default class Player extends Component {

  state = {
    playing: true,
    muted: false,
    controls: false,
    loaded: 0,
    volume: 0.8
  }


  load = url => {
    this.setState({
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handleEnded = () => {
    this.props.action()
    console.log('do stuff')
  }

  ref = player => {
    this.player = player
  }

  render() {
    const {playing, volume } = this.state
    const {url} = this.props
    return (

      <Container fluid >
        <Row className="player-row">
          <Col xs={{ span: 8, offset: 2 }} className="player-container">
            <ReactPlayer width="100%" height="100%"
              ref={this.ref}
              url={url}
              volume={volume}
              playing={playing}
              onEnded={this.handleEnded}
              />
          </Col>
        </Row>
      </Container>

  )}


}
