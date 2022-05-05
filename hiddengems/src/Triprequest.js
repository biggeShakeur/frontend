import React from "react";
import axios from 'axios';
import { withAuth0 } from 'auth0-react';
import { Carousel, Button, Modal } from 'react-bootstrap';
// import Trip from './Trip';
import TripForm from './TripForm.js';


class Triprequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Triprequest: [],
      tripformModal: false,
      triptoUpdate: [],
    }
  }

  fetchTrip = async () => {
    try {
      if (this.props.auth0.isAuthorized) {
        let res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;
        const config = {
          method: 'get',
          baseUrl: process.env.REACT_APP_SERVER,
          url: '/trip',
          headers: { 'Authorization': `Bearer ${jwt}` }
        }
        const tripResults = await axios(config);

        this.setState({
          Triprequest: tripResults.data
        })
      }
    }
    catch (error) {
      console.log('We have an error in Triprequest.js');
    }
  }

  deleteTrip = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/trip/${id}`);
      let updatedTrip = this.state.Triprequest.filter(triprequest => triprequest.id !== id);
      this.setState({
        Triprequest: updatedTrip
      })
    } catch (error) {
      console.log('Error at deleteTrip Line 47', error.response.data);
    }
  }

  addTrip = async (newTrip) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/trip/`
      let createdTrip = await axios.post(url, newTrip)
      this.setState({
        Triprequest: [...this.state.Triprequest, createdTrip.data]
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
      this.setState({
        Triprequest: updatedTripdata
      });
    }
    catch (error) {
      console.log('There\'s an error with updateTrip', error.message);
    }
  }

handleTripSubmit = (e) => {
  e.preventDefault();
  let trip = {
    subject: e.target.subject.value,
    description: e.target.description.value,
    note: e.target.subject.value
  }
  this.addTrip(trip);
}


  componentDidMount() {
    this.fetchTrip();
  }

  showForm = () => {
    this.setState({
      tripformModal: true

    })

  }
  onHide = () => {
    this.setState({
      tripformModal: false
    })
  }

  render() {
    return (
      <>
      <Carousel
        // varient='dark'
        style={({
          width: '50vw',
          margin: '2em auto 0'
        })}>
        {this.state.Triprequest.length ? (
          this.state.Triprequest.map((trip => {
            <Carousel.Item key={trip._id}>
              <Trip
                deleteTrip={this.deleteTrip}
                updateTrip={this.updateTrip}
              />

              <Carousel.Caption>
                <>
                  {/* <h3>{trip.location}</h3>
                  <p>{trip.description}</p> */}
                </>

                <Button
                onClick={() => this.deleteTrip(trip._id)}
                variant='danger'>
                  Delete
                </Button>
                <Button
                onClick={() => this.setState({ tripformModal: true, triptoUpdate: trip })}>
                  Update
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          }))
        )
          :
          (
            <h3>No trips found</h3>
          )}
          </Carousel>
          <>
            <Button
            onClick={(this.showForm)}
            style={{
            textAlign: 'center',
            background: 'rgb(125, 26, 232)',
              border: '1px solid rgb(125, 26, 232)'
            }}>Add Trip </Button>

            <Modal
            show={this.state.tripformModal}
            onHide={this.onHide}>
              <Modal.Header>
                <Modal.Title>
                  Add a trip
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <TripForm 
                handleTripSubmit = {this.handleTripSubmit}
                hideModalHandler={this.onHide}
                />
              </Modal.Body>
            </Modal>
          </>
        )
      </>
    )
  }
}
export default withAuth0(Triprequest);