import React from "react";
// import Header from "./Header";
import Footer from "./Footer.js";
import Trip from "./Trip";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  BrowserRouter as Router,
  Switch, 
  Route,
  Link
} from "react-router-dom";
// import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import { Navbar, NavItem } from 'react-bootstrap';
import Login from './Login.js';
import Logout from './Logout.js';

//import { Button, Modal } from "react-bootstrap";
// import Login from "./Login";
// import Profile from "./Profile";





class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     user: '',
  //     email:'',
  //   }
  // }

  // loginHandler = (user, email) => {
  //   console.log(user, email)
  //   this.setState({
  //     user: user,
  //     email: email,
  //   })
  // }

  // logoutHandler = () => {
  //   this.setState({
  //     user: '',
  //   })
  // }

  render() {
    console.log(this.props.auth0.isAuthenticated);
    return (
      <>
        <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Hidden Gems!!!!</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem>{this.props.user?<Link to="/Profile">Profile</Link>:''}</NavItem>
        <NavItem><Link to="/Profile.js" className="nav-link">About</Link></NavItem>
        {this.props.auth0.isAuthenticated
          ? <Logout />
          : <Login />}
      </Navbar>
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated 
              ?
              <Trip/> 
              : <h2>Please log in!</h2>}
            </Route>
            
            {/* <Route exact path = "/Profile.js">
              <Profile />
            </Route> */}
          </Switch>
          <Footer />
        </Router>

      </>
    )
  }
}

export default withAuth0(App);