import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login.js';
import Logout from './Logout.js';

class Header extends React.Component {
  render() {
    return (
  <> 
   <Navbar className="foot-nav" collapseOnSelect expand="lg">
        <Navbar.Brand className="foot-brand">Team Biggie-Shakur</Navbar.Brand>
      </Navbar>
  </>
    )
  }
}

export default withAuth0(Header);