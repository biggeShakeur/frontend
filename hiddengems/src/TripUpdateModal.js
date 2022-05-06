import React from 'react';
import { Form, Button } from 'react-bootstrap';

class TripUpdateModal extends React.Component{

  handleSubmit = (e) => {
    e.preventDefault();
    let notesWithUpdate ={
      title: e.target.title.value || this.props.notesToUpdate.title,
      description: e.target.description.value || this.props.notesToUpdate.description,
      likes: e.target.likes.value || this.props.notesToUpdate.likes,
      dislikes: e.target.dislikes.value || this.props.notesToUpdate.dislikes,
      _id: this.props.notesToUpdate._id,
      __v: this.props.notesToUpdate.__v
    } 
    console.log('HERE --->', e.target);
    this.props.updateNotes(notesWithUpdate);
  }



  render(){
    console.log('Notes to Update', this.props.notesToUpdate);
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className='mb-3' controlId='title'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder={this.props.notesToUpdate.title}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control type='text' placeholder={this.props.notesToUpdate.description}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='likes'>
          <Form.Label>Likes</Form.Label>
          <Form.Control type='text' placeholder={this.props.notesToUpdate.likes}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='dislikes'>
          <Form.Label>Dislikes</Form.Label>
          <Form.Control type='text' placeholder={this.props.notesToUpdate.dislikes}/>
        </Form.Group>
        <Button onClick={this.props.hideUpdateModal} type='submit'>Update Trip</Button>
      </Form>
      


    )
  }
}

export default TripUpdateModal