import React from 'react';
import { Form, Button } from 'react-bootstrap';

class TripUpdateModal extends React.Component{

  handleSubmit = (e) => {
    e.preventDefault();
    let tripWithUpdate ={
      title: e.target.title.value || this.props.tripToUpdate.title,
      description: e.target.description.value || this.props.tripToUpdate.description,
      status: e.target.status.checked || this.props.tripToUpdate.status,
      _id: this.props.tripToUpdate._id,
      __v: this.props.tripToUpdate.__v
    }
    this.props.updateTrip(tripWithUpdate);
  }

  render(){
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder={this.props.tripToUpdate.title}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control type='text' placeholder={this.props.tripToUpdate.description}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='likes'>
          <Form.Label>Likes</Form.Label>
          <Form.Control type='text' placeholder={this.props.tripToUpdate.description}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='dislikes'>
          <Form.Label>Dislikes</Form.Label>
          <Form.Control type='text' placeholder={this.props.tripToUpdate.description}/>
        </Form.Group>
        <Button onClick={this.props.hideUpdateModal} type='submit'>Update Trip</Button>
      </Form>
    )
  }
}

export default TripUpdateModal