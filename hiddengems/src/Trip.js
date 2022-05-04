import React from 'react';
//import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import './App.css';
import axios from 'axios'
//Create an app compnent from react's original component. Similar to how classes work
class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: []
    }
  }


  // This function provides you with the ability to request(or 'get') map data.
  getMap = async () => {
    try {
       let mapData = 'http://localhost:3001/trip';
       let mapResults = await axios.get(mapData);
       console.log(mapResults.data);
       this.setState({
         map: mapResults.data
       })
    } catch (error) {
      console.log('Not receiving Maps.')
    }
  }




  //Return JSX - which allows us to use javascript to render html
  render() {

    //this.props.data holds the array of objects for the user's trips
    const tripMap = this.props.data.map((x, index) => (

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

    ));

    //render the tripMap array
    return (
      <>
        <h3>Trips</h3>
        <Button onClick={this.getMap}>Get trips Button</Button>
        {tripMap}

      </>
    )
  }
}

//Make the component available for import
export default Trip; 