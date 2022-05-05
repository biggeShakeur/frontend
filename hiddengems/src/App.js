import React from "react";
import Header from "./Header";
import Footer from "./Footer.js";
import Trip from "./Trip";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  BrowserRouter as Router,
  Switch, 
  Route 
} from "react-router-dom";
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
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
          <Header />
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated 
              ?
              <Trip/> 
              : <><h2>Please log in!</h2></>}
            </Route>
            <Trip/>
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