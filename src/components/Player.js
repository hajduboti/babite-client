import React, { Component } from 'react'
import '../static/css/player.css'
import { Row,  Container, Col } from 'react-bootstrap'
import ReactPlayer from 'react-player'


export default class Player extends Component {

  state = {
    url: this.props.url,
    playing: true,
    muted: false,
    controls: false,
    loaded: 0,
    volume: 0.1,
    videoNumber: 0,
    currentProgramme: "",
  }

shouldComponentUpdate(nextProps, nextState){
  if(nextProps.url !== "" && nextProps.url && this.state.url !== nextProps.url){
    this.load(this.props.url)
    this.setState({
      currentProgramme: this.props.state.currentProgramme,
      videoNumber: this.props.state.videoNumber
    })
    return false
  }else{
    return true
  }
}

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handleEnded = () => {
    this.setState({
      videoNumber: this.state.videoNumber + 1
    })
    this.load(this.state.currentProgramme[this.state.videoNumber].url)
  }

  ref = player => {
    this.player = player
  }

  render() {
    const { url, playing, volume } = this.state
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
