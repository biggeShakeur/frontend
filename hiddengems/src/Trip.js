import React from 'react';
import { Form, Button, Card } from "react-bootstrap";
import placeHolder from './img.jpg';
import './App.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'

//Create an app component from react's original component. Similar to how classes work
class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      Triprequest: null
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

  handleInput = (e) => {
    this.setState({
      location: e.target.value
    });
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
      </>
    )
  }

}


export default withAuth0(Trip); 