import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

class HomeComponent extends Component {
  render() {
    return (
      <div>
        <Container>
        <div className = "main-body">
          <div className='login-main'>
          <div className = "home text-center">
            <iframe src="https://giphy.com/embed/10bxTLrpJNS0PC" width="960" height = "720" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
          </div>
          </div>
        </div>
        </Container>
      </div>
    )
  }
}
export default HomeComponent