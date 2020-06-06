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
    volume: 0.3,
    videoNumber: 0,
    currentProgramme: 0,
  }

  componentDidUpdate(){
    if(this.state.currentProgramme !== this.props.state.currentProgramme){
      this.setState({
        currentProgramme: this.props.state.currentProgramme,
        videoNumber: this.props.state.videoNumber
      })
      this.load(this.props.url)
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
    const newIndex = this.state.videoNumber + 1
    this.setState({
      videoNumber: newIndex
    })
    if(this.state.videoNumber === newIndex){
      const newUrl = this.state.currentProgramme[newIndex].url
      console.log(newIndex)
      this.load(newUrl)
    }
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  ref = player => {
    this.player = player
  }

  render() {
    const { url, playing, volume } = this.state
    return (

      <Container  className="root-container" fluid>
        <Row className="player-row py-6">
          <Col xs={{ span: 8, offset: 2 }} className="player-container">
            <ReactPlayer width="100%" height="100%"
              ref={this.ref}
              url={url}
              volume={volume}
              playing={playing}
              onEnded={this.handleEnded}
              style={{ pointerEvents: 'none' }}
              />
            <button><img src="https://cdn.discordapp.com/attachments/393128959312789505/718423333867094076/danny-devito-face-png-4.png"  width="90" alt="so-anyways-i-started-blasting" onClick={this.handlePlayPause} /></button>

          </Col>

        </Row>
      </Container>

  )}


}
