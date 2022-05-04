import React from 'react';
import { Form, Button } from 'react-bootstrap';

class TripForm extends React.Component{
  render(){
    return(
      <Form onSubmit={this.props.handleTripSubmit}>
        <Form.Group className='mb-3' controlId='subject'>
          <Form.Label>Subject</Form.Label>
          <Form.Control type='text' placeholder='Enter subject'/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='note'>
          <Form.Label>Note</Form.Label>
          <Form.Control type='text' placeholder='Enter notes here...'/>
        </Form.Group>
        <Button onClick={this.props.onHide} type='submit'>Add this trip!</Button>
      </Form>
    )
  }
}

export default TripForm;