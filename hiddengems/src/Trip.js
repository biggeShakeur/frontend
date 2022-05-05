import React from 'react';
//import ReactDOM from 'react-dom';
import { Form, Button, Carousel} from "react-bootstrap";

import './App.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
//Create an app component from react's original component. Similar to how classes work
class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: [],
      location: '',
      Triprequest:[]
    }
  }


  // This function provides you with the ability to request(or 'get') map data.
  getMap = async (e) => {
    e.preventDefault();
  
console.log("here");
    //Check if token is verified/authorized, send a token
    if (this.props.auth0.isAuthenticated) {
        
        let res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw;

      const tripResults = await axios.get(`${process.env.REACT_APP_SERVER}/trip?location=${this.state.location}`, { headers: {"Authorization" : `Bearer ${jwt}`} });

      console.log(tripResults);

      this.setState({
        Triprequest: tripResults.data
      });


      // try {
      //   let mapData = `${process.env.REACT_APP_SERVER}/trip?location=${this.state.location}`;
      //   console.log(mapData);
      //   let mapResults = await axios.get(mapData);
      //   console.log(mapResults);
      //   this.setState({
      //     map: mapResults.data,
      //     location: this.location
      //   })
      // } catch (error) {
      //   console.log('Not receiving Maps.');
      // };
    }

  }

 handleInput = (e) => {
   this.setState({
     location: e.target.value
   },console.log(this.state.location));
   
  }



  //Return JSX - which allows us to use javascript to render html
  render() {

    //this.props.data holds the array of objects for the user's trips
    
    //create an array of trips bases on 
        
  
    //render the tripMap array
    return (
      <>
    <Carousel>
        {this.state.Triprequest.length ? ( 
          
          
          this.state.Triprequest.map((x, index) => (
            <Carousel.Item key={index}>
          <img
            className="tripImg"
            src={x.data.image}
            alt={x.data.name}
            />
          <Carousel.Caption>
            <h3>{x.data.name}</h3>
            <p>{x.data.wikipedia_extracts.text}</p>
          </Carousel.Caption>
          <div>
            <Button onClick="">
              Edit
            </Button>
            <Button onClick="">
              Delete
            </Button>
          </div>
        </Carousel.Item>
        
        ))) : <p>No trips</p>};
        </Carousel>
        <h3>Trips</h3>
        <Form onSubmit={this.getMap}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter a City/County</Form.Label>
            <Form.Control type="text" placeholder="I.e. Puerto Rico" onInput={this.handleInput}/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

        <Button onClick={this.getMap}>Get trips Button</Button>
        {/* {tripMap} */}

      </>
    )
  }
}

//Make the component available for import
export default withAuth0(Trip); 