import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <Navbar className="foot-nav" collapseOnSelect expand="lg">
        <Navbar.Brand className="foot-brand">Team Biggie-Shakur</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;