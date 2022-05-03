import React from "react";
import Header from "./Header";
import Footer from "./Footer.js";
import Login from "./Login";
import Profile from "./Profile";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import Trip from "./Trip";






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
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Routes>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {this.props.auth0.isAuthenticated ? <Trip/> : <Login loginHandler={this.loginHandler}/>}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path = "/Profile">
              {this.props.auth0.isAuthenticated ? <Profile/>: null}
            </Route>
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);