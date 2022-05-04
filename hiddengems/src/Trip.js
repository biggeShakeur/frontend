import React from 'react';
//import ReactDOM from 'react-dom';
import { Form, Button} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel';
import './App.css';
import axios from 'axios'
//Create an app component from react's original component. Similar to how classes work
class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: [],
      location: ''
    }
  }


  // This function provides you with the ability to request(or 'get') map data.
  getMap = async (e) => {
    e.preventDefault();
    console.log("here");
    try {
       let mapData = `${process.env.REACT_APP_SERVER}/trip?location=${this.state.location}`;
       console.log(mapData);
       let mapResults = await axios.get(mapData);
       console.log(mapResults);
       this.setState({
         map: mapResults.data,
         location: this.location
       })
    } catch (error) {
      console.log('Not receiving Maps.');
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
    // const tripMap = this.mapResults.map((x, index) => (

    //   //create an array of trips bases on 
    //   <Carousel>
    //     <Carousel.Item key={index}>
    //       <img
    //         className="tripImg"
    //         //src={x.image}
    //         alt={x.location}
    //       />
    //       <Carousel.Caption>
    //         <h3>{x.location}</h3>
    //         <p>{x.subject}</p>
    //       </Carousel.Caption>
    //       <div>
    //         <Button onClick="">
    //           Edit
    //         </Button>
    //         <Button onClick="">
    //           Delete
    //         </Button>
           
    //       </div>
    //     </Carousel.Item>
    //   </Carousel>

    // ));

    //render the tripMap array
    return (
      <>
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
export default Trip; 