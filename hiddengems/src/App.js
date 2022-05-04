import React from "react";
import Header from "./Header";
import Footer from "./Footer.js";
import Login from "./Login";
import Profile from "./Profile";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import Trip from "./Trip";
//import { Button, Modal } from "react-bootstrap";





class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      email:'',
    }
  }

  loginHandler = (user, email) => {
    console.log(user, email)
    this.setState({
      user: user,
      email: email,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: '',
    })
  }

  
  render() {
    return (
      <>
      <h1>That is soooo irritating!!!!!! </h1>
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {this.props.auth0.isAuthenticated ? <Trip/> : <Login loginHandler={this.loginHandler}/>}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path = "/Profile">
              {this.props.auth0.isAuthenticated && <Profile/>}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);