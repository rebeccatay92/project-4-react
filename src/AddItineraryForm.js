import React, {Component} from 'react'
import {Button, Modal} from 'react-bootstrap'
import ImageUpload from './ImageUpload'

class AddItineraryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: props.token,
      addingItinerary: false,
      title: '',
      country: '',
      images: []
    }

    this.renderAllItineraries = this.props.renderAllItineraries
  }

  openAddItineraryWindow () {
    this.setState({
      addingItinerary: true
    })
  }

  closeAddItineraryWindow () {
    this.setState({
      addingItinerary: false,
      title: '',
      country: '',
      images: []
    })
  }


  render () {
    return (
      <div>
        <Button onClick={() => this.openAddItineraryWindow()} bsStyle='success' style={{float: 'right', marginRight: '3vh'}}>Add new itinerary</Button>

        <Modal show={this.state.addingItinerary} onHide={() => this.closeAddItineraryWindow()}>
          <Modal.Header>
            <Modal.Title>Add new itinerary</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <label>Title</label>
            <input className='form-control' value={this.state.title} type='text' onChange={(e) => this.handleChange(e, 'title')} />
          </Modal.Body>

          <Modal.Body>
            <label>Country</label>
            <input className='form-control' value={this.state.country} type='text' onChange={(e) => this.handleChange(e, 'country')} />
          </Modal.Body>

          <Modal.Body>
            <label>Banner URL</label>
            <div>
              <ImageUpload images={[]} />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => this.closeAddItineraryWindow()}>Cancel</Button>
            <Button bsStyle='primary' onClick={() => this.handleSubmit()}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  handleChange (e, field) {
    this.setState({
      [field]: e.target.value
    })
  }

  handleSubmit (e) {
    const params = {
      data: {
        title: this.state.title,
        country: this.state.country,
        bannerUrl: this.state.images
      }
    }

    fetch('https://project-4-backend.herokuapp.com/profile',
      {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          "Authorization": "Bearer " + this.state.token
        },
        body: JSON.stringify(params)
      })
      .then(res => {
        if (res.status === 200) {
          alert('Successfully created!')
          this.renderAllItineraries()
        }
        return res.json()
      })
      .then(result => console.log(result))
      .catch(err => console.log('there is an an error: ', err))

    this.setState({addingItinerary: false})
  }

}

export default AddItineraryForm
