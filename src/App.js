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
import houseImgPath from './images/HIDDEN_GEMS_-_Logo_2022-05-06_00-03-04-removebg-preview.png';

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
  
  

  // HANDLE SUBMIT FOR UPDATE
  handleTripSubmit = (e) => {
     e.prevent.Default();
     let tripNotes = {
       title: e.target.title.value,
       description: e.target.description.value,
       likes: e.target.likes.value,
       dislikes: e.target.dislikes.value,
       
     }
     this.postNotes(tripNotes);
  }


  render() {
    console.log(this.props.auth0.isAuthenticated);

    return (
      <>





        <Router>
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="navbar">
        <Navbar.Brand ><img src={houseImgPath} alt="Biggie-Shakur"/></Navbar.Brand>
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
              <div className="parent">
              <Trip/>
              </div> 
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