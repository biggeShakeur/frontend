import React from "react";
import axios from 'axios';
import { withAuth0 } from 'auth0-react';
import { Carousel } from "react-bootstrap";

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
        Triprequest: response.data
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
        Triprequest: updatedTrip
      })
    } catch (error) {
      console.log('Error at deleteTrip Line 47', error.response.data);
    }

  }

  addTrip = async (newTrip) => {
    try {
      let newTrip = await axios.put(`${process.env.REACT_APP_SERVER}/trip/`, newTrip)
      this.setState({
        Triprequest: [...this.state.Triprequest, newTrip.data]
      })

    } catch (error) {
      console.log('Error at addTrip Line 64: ', error.response.data);
    }
  }


  updateTrip = async (triptoUpdate) => {
    try {
      let freshTrip = await axios.put(`${process.env.REACT_APP_SERVER}/trip/${triptoUpdate._id}`, triptoUpdate);
      let updatedTripdata = this.state.triprequest.map(currentTrip => {
        return currentTrip._id === triptoUpdate._id ? freshTrip.data : currentTrip;
      })
      this.setState({ Triprequest: updatedTripdata })
    } catch (error) {
      console.log(error.message);



    }

    showForm = () =>
      this.setState({
        tripformModal: true

      })

  }
  onHide = () => {
    this.setState({
      tripformModal: true

    })


  }

  render() {
    return (
      <>
        {this.state.Triprequest.length ? (
          this.state.Triprequest.map((trip => {
            <Carousel.Item key={trip._id}>
              <Trip
                deleteTrip={this.deleteTrip}
                updateTrip={this.updateTrip}
              />
            </Carousel.Item>
          }))
        )
          :
          (
            <h3>No trips found</h3>
          )}

        )
      </>
    )
  }
}
export default withAuth0(Triprequest);