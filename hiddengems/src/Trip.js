import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import './App.css';

//Create an app compnent from react's original component. Similar to how classes work
class Trip extends React.Component {


  //Return JSX - which allows us to use javascript to render html
  render() {

    //this.props.data holds the array of objects for the user's trips
    const tripMap = this.props.data.map((x, index) =>

      //create an array of trips bases on 
      <Carousel>
        <Carousel.Item key={index}>
          <img
            className="tripImg"
            src={x.image}
            alt={x.location}
          />
          <Carousel.Caption>
            <h3>{x.location}</h3>
            <p>{x.subject}</p>
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
      </Carousel>

    );

    //render the tripMap array
    return (
      <>
        <h3>Trips</h3>
        {tripMap}

      </>
    )
  }
}

//Make the component available for import
export default Trip; 