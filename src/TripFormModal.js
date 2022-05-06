import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './App.css';

class TripFormModal extends React.Component{
  render(){
    return(
      <Form onSubmit={this.props.handleTripSubmit} id="modal-form">
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label className='mb-3'>Title</Form.Label>
          <Form.Control type='text' placeholder='Enter a Title...'/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='description' id="desc">
          <Form.Label className='mb-3'>Description</Form.Label>
          <Form.Control type='text' placeholder='Enter trip Description...'/>
          
        </Form.Group>
        <Form.Group className='mb-3' controlId='likes'>
          <Form.Label className='mb-3'>Likes</Form.Label>
          <Form.Control type='text' placeholder='Enter what you liked about a place...'/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='dislikes'>
          <Form.Label className='mb-3'>Dislikes</Form.Label>
          <Form.Control type='text' placeholder='Enter what you disliked about a place...'/>
        </Form.Group>
        <Button onClick={this.props.hideModalHandler} type='submit'>Save notes</Button>
      </Form>
    )
  }
}

export default TripFormModal