import React from 'react';
import { Form, Button, Card, Modal } from "react-bootstrap";
import './App.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import TripFormModal from './TripFormModal';
import TripUpdateModal from './TripUpdateModal';
//Create an app component from react's original component. Similar to how classes work
class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      Triprequest: null,
      showModal: false,
      notes: [],
      notesToUpdate: '',
      showUpdateModal: false,
      imageUrl: ''
    }
  }

  // This function provides you with the ability to request(or 'get') map data.
  getMap = async (e) => {
    e.preventDefault();

    //fire function to get image
    this.getImage();

// await axios.get();



    //Check if token is verified/authorized, send a token
    if (this.props.auth0.isAuthenticated) {
      let res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;
      const tripResults = await axios.get(`${process.env.REACT_APP_SERVER}/trip?location=${this.state.location}`, { headers: { "Authorization": `Bearer ${jwt}` } });
      //console.log(tripResults);

      this.setState({
        Triprequest: tripResults.data
      }, console.log('trip location state set'));
     // console.log(tripResults);
    }


    //display hidden notes div container
    const div = document.getElementById("div3");
    div.style.visibility="inherit";
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

  showUpdateModal = (notes) => {
    this.setState({
      showUpdateModal: true

    })
    this.setNotesToUpdate(notes);
  }

  hideUpdateModal = () => {
    this.setState({
      showUpdateModal: false
    })
  }

 // use this..

  setNotesToUpdate = (updateNotes) => {
    this.setState({
      notesToUpdate: updateNotes
    })
  }

  removesNotes = (removeNotes) => {

    this.setState ({
      notesToUpdate: removeNotes
    })
  }

  getTrip = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/trip?location=${this.state.location}`;
      let createdTrip = await axios.get(url)
      this.setState({
        Triprequest: createdTrip.data
      })

    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }

  getNotes = async (trip) => {
    try {
      if (this.props.auth0.isAuthenticated) {
        const res = await this.props.auth0.getIdTokenClaims();
        const jwt = res.__raw;

        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/notes',
          headers: { Authorization: `Bearer ${jwt}` }
        }
        const noteResults = await axios(config);
        // let url = `${process.env.REACT_APP_SERVER}/trip`
        // let createdNotes = await axios.get(url, trip)

        this.setState({
          notes: noteResults.data
        })
      }
    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }


  postTrip = async (trip) => {
    console.log(trip);
    try {
      let url = `${process.env.REACT_APP_SERVER}/trip`
      let createdTrip = await axios.post(url, trip)
      this.setState({
        notes: [...this.state.notes, createdTrip.data]

      })
    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }

  updateNotes = async (notesToUpdate) => {
    try {
      console.log(notesToUpdate);
      let url = `${process.env.REACT_APP_SERVER}/notes/${notesToUpdate._id}`
      let updatedNotes = await axios.put(url, notesToUpdate);
      let updatedNotesArray = this.state.notes.map(existingNotes => {
        return existingNotes._id === notesToUpdate._id ? updatedNotes.data : existingNotes;
      })
      this.setState({
        notes: updatedNotesArray
      });
    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }

  deleteNotes = async (id) => {
    console.log(id);
    try {
      let url = `${process.env.REACT_APP_SERVER}/notes/${id}`;
      console.log('THis is your URL', url)
      await axios.delete(url);
      this.getNotes();
      // let updatedNotes = this.state.notes.filter(notes => notes.id !== id);
      // this.setState({
      //   notes: updatedNotes
      // });
    }
    catch (err) {
      console.log('We have an error: ', err.response.data)
    }
  }


  componentDidMount() {
    this.getNotes();
  }

  //Testing a function to get an image for this location
  getImage = async (id) => {
    const imageLink = `https://api.unsplash.com/search/photos/?query=${this.state.location}&client_id=${process.env.REACT_APP_UNSPLASH}`;
  
  
    let retrievedImage = await axios.get(imageLink);

    //generate a random number
    const num =  Math.floor(Math.random() * 9);

  
    //get image
    console.log(retrievedImage.data.results[num]);
    console.log(retrievedImage.data.results);
  
        this.setState({
          imageUrl: retrievedImage.data.results[num].links.download
        })
  
    //console.log(imageValue);
    }


  //Open TripAdvisor hyperlink to show 'things to do' in the area via Trip Advisor
  openTripAdvisor = async (id) => {
    window.open(`https://www.tripadvisor.com/Search?q=${this.state.location}&blockRedirect=true&ssrc=A`);
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
        <div className="div1">
          <h3>Trips</h3>
          <Form onSubmit={this.getMap} id="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text">Enter a Destination</Form.Label>
              <Form.Control type="text" placeholder="i.e. Miami" onInput={this.handleInput} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </div>
        <div className="div2">
          {this.state.Triprequest &&

            <Card>
              <Card.Img variant="top" src={this.state.imageUrl} className="image"/>
              <Card.Body className="c-body">
                <Card.Title>{this.state.Triprequest.name}</Card.Title>
                <Card.Text>
                  {description}
                </Card.Text>
                <div className="button-theme">
                <Button variant="success" onClick={this.openTripAdvisor}>Things to Do</Button>
                <Button onClick={(this.showModal)}>Add Notes</Button>
                </div>
              </Card.Body>
            </Card>
          }
          </div>
          <div className="div4">
          {/* <Button onClick={(this.showModal)}>Add Notes</Button> */}
          </div>
        <div className="div3" id="div3">

        {/* <Card style={{ width: '18rem' }}>

          <Card.Body>
            <Card.Title>{this.state.notes.title}</Card.Title>
            <Card.Text>
              {this.state.notes.description}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card> */}
  
        {/* Show notes for the trip*/}
        {this.state.notes.length ? (
        
          this.state.notes.map((data) => {
            return (
                <Card key={data._id}>
                  <Card.Title>
                    Title: {data.title}
                  </Card.Title>
                  <Card.Text>
                    Description: {data.description}
                  </Card.Text>
                  <Card.Text>
                    Likes:{data.likes}
                  </Card.Text>
                  <Card.Text>
                    Dislikes: {data.dislikes}
                  </Card.Text>
                  <div className="button-theme">
                  <Button onClick={() => this.showUpdateModal(data)}>Update</Button>
                  <Button variant="danger" onClick={() => this.deleteNotes(data._id)}>Delete</Button>
                </div>
                </Card>

            )
          })
      )
          :
          (
            <p id="no-notes">No notes Found</p>
          )}

 </div> 



        <Modal
          show={this.state.showModal}
          onHide={this.hideModalHandler}
        >
          <Modal.Header closeButton>
            <Modal.Title className='mb-3'>
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

        <Modal 
          show={this.state.showUpdateModal}
          onHide={() => this.setState({ showUpdateModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Update Trip
            </Modal.Title>
          </Modal.Header>
          <Modal.Body  >
            <TripUpdateModal
              updateNotes={this.updateNotes}
              hideUpdateModal={() => this.setState({ showUpdateModal: false })}
              notesToUpdate={this.state.notesToUpdate}
            />
          </Modal.Body>
        </Modal>



      </>
    )

  }
}


export default withAuth0(Trip); 