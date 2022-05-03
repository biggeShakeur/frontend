import React from "react";
import axios from 'axios';
import { withAuth0 } from 'auth0-react';










class Triprequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Triprequest: [],
      tripformModal: false,
    }
  }


  fetchTrip = async () => {


    const token = await this.props.auth0.getIdTokenClaims();
    const jwt = token.__raw;
    console.log(jwt);
    try {
      let url = `${process.env.REACT_APP_SERVER}/trip`
      console.log(url)
      const response = await axios.get(url);
      console.log(response);
      this.setState({
        triprequest: response.data
      })
      console.log(this.state.triprequest);
    } catch (error) {
      console.log('Error at fetchTrip Line 24', error.response);
    }


  }


  deleteTrip = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/trip/${id}`);
      let updatedTrip = this.state.triprequest.filter(triprequest => triprequest._id !== id);
      this.setState({
        triprequest: updatedTrip
      })
    } catch (error) {
      console.log('Error at deleteTrip Line 47',error.response.data);
    }

  }



  addTrip = async (newTrip) => {
    try {
      let newTrip = await axios.put(`${process.env.REACT_APP_SERVER}/trip/`, newTrip)


    } catch (error) {
      console.log('Error at addTrip Line 64: ', error.response.data);
    }
  }
}