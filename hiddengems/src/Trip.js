import React from 'react';
import { Form, Button, Card, Modal } from "react-bootstrap";
import placeHolder from './img.jpg';
import './App.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import TripFormModal from './TripFormModal';

//Create an app component from react's original component. Similar to how classes work
class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      Triprequest: null,
      showModal: false
    }
  }

  // This function provides you with the ability to request(or 'get') map data.
  getMap = async (e) => {
    e.preventDefault();
    //Check if token is verified/authorized, send a token
    if (this.props.auth0.isAuthenticated) {
      let res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const tripResults = await axios.get(`${process.env.REACT_APP_SERVER}/trip?location=${this.state.location}`, { headers: { "Authorization": `Bearer ${jwt}` } });
      console.log(tripResults);

      this.setState({
        Triprequest: tripResults.data
      }, console.log('trip location state set'));
      console.log(tripResults);
    }
  }

  handleTripSubmit = (e) => {
    e.preventDefault();
    let trip = {
      title: e.target.title.value,
      description: e.target.description.value,
      likes: e.target.likes.value,
      dislikes: e.target.dislikes.value
    }
    this.postTrip(trip);
  }

  handleInput = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  showModal = () => {
    this.setState({
      showModal: true
    })
  }

  hideModalHandler = () => {
    this.setState({
      showModal: false
    })
  }

  getTrip = async (trip) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/trip`
      let createdTrip = await axios.get(url, trip)
      this.setState({
        Triprequest: createdTrip
      })
    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }

  postTrip = async (trip) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/trip`
      let createdTrip = await axios.post(url, trip)
      this.setState({
        Triprequest: [...this.state.Triprequest, createdTrip.data]
      })
    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }

  updateTrip = async (tripToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/trip/${tripToUpdate._id}`
      let updatedTrip = await axios.put(url, tripToUpdate);
      let updatedTripArray = this.state.books.map(existingTrip => {
        return existingTrip._id === tripToUpdate._id ? updatedTrip.data : existingTrip;
      })
      this.setState({
        books: updatedTripArray
      });
    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }

  //Return JSX - which allows us to use javascript to render html
  render() {
    let description = this.state.Triprequest
      && this.state.Triprequest.wikipedia_extracts
      && this.state.Triprequest.wikipedia_extracts.text
        ? this.state.Triprequest.wikipedia_extracts.text 
        : "Sorry, this attraction has no description :(";

    // let image = this.state.Triprequest
    // && this.state.Triprequest.image
    //   ? this.state.Triprequest.image
    //   : {placeHolder};
    // console.log(image);
    return (
      <>
        <h3>Trips</h3>
        <Form onSubmit={this.getMap}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter a City/County</Form.Label>
            <Form.Control type="text" placeholder="i.e. Puerto Rico" onInput={this.handleInput} style={{ width: '25%' }} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {this.state.Triprequest &&
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={placeHolder} />
            <Card.Body>
              <Card.Title>{this.state.Triprequest.name}</Card.Title>
              <Card.Text>
                {description}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        }
        <Button onClick={(this.showModal)}>Show add modal for notes</Button>
        
        <Modal
          show={this.state.showModal}
          onHide={this.hideModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Add Your Notes
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TripFormModal
              handleTripSubmit={this.handleTripSubmit}
              hideModalHandler={this.hideModalHandler}
            />
          </Modal.Body>
        </Modal>
      </>
    )
  }

}


export default withAuth0(Trip); 