import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import "./Footer.css";
import houseImgPath from './images/biggie-tupac.png';

class Footer extends React.Component {
  render() {
    return (
      <>
      <br/>
      <Navbar className="justify-content-center" collapseOnSelect expand="lg">
        <Navbar.Brand className="foot-brand">&copy; 2022 Team Biggie-Shakur 
        </Navbar.Brand>
       <img src={houseImgPath} alt="Biggie-Shakur"/>
      </Navbar>
    </>)
  }
}

export default Footer;