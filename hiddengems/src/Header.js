import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import Login from './Login.js';
import Logout from './Logout.js';

class Header extends React.Component {
  render() {
    return (
      // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      //   <Navbar.Brand>Hidden Gems!!!!</Navbar.Brand>
      //   <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
      //   <NavItem>{this.props.user?<Link to="/Profile">Profile</Link>:''}</NavItem>
      //   <NavItem><Link to="/Profile.js" className="nav-link">About</Link></NavItem>
      //   {this.props.auth0.isAuthenticated
      //     ? <Logout />
      //     : <Login />}
      // </Navbar>
    )
  }
}

export default withAuth0(Header);