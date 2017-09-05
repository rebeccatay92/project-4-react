import React, {Component} from 'react'
import {Glyphicon, Modal, Button} from 'react-bootstrap'
import './App.css'

const url = 'https://project-4-backend.herokuapp.com'

class CoverPhotoEditPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      token: props.token,
      itinerary: props.itinerary,
      img: props.itinerary.bannerUrl,
      newImg: '/sample.jpg',
      editingTitle: false,
      editingImg: false
    }

    this.getItinerary = props.getItinerary
  }
  render () {
    console.log('bannerUrl', this.state.itinerary.bannerUrl)
    console.log('this state img', this.state.img)

    let editTitleWindow = (
      <Modal show={this.state.editingTitle} onHide={() => this.closeTitleEditWindow()}>
        <Modal.Header>
          <Modal.Title>Edit Title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input className='form-control' value={this.state.newTitle} type='text' onChange={(e) => this.handleTitleChange(e)} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.closeTitleEditWindow()}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.saveTitle()}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    )

    let editImgWindow = (
      <Modal show={this.state.editingImg} onHide={() => this.closeImgEditWindow()}>
        <Modal.Header>
          <Modal.Title>Edit Image Url</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input className='form-control' value={this.state.newImg} type='text' onChange={(e) => this.handleImgChange(e)} />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => this.closeImgEditWindow()}>Cancel</Button>
          <Button bsStyle='primary' onClick={() => this.saveImg()}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    )

    return (
      <div style={{backgroundImage: 'url(' + this.state.itinerary.bannerUrl + ')', backgroundSize: 'cover', height: '85vh', position: 'relative', width: '100%', float: 'right'}}>
        <div style={{position: 'absolute', left: '0', bottom: '0', paddingTop: '20vh', background: 'linear-gradient(to bottom, rgba(0,0,0,0), black', width: '100%'}}>
          <div onClick={() => this.showTitleEditWindow()} className='coverPhotoDiv' style={{marginBottom: '10px', display: 'inline-block', whiteSpace: 'nowrap', 'paddingRight': '1%'}}>
            <h1 style={{marginLeft: '10px', display: 'inline', color: 'white'}}><strong>{this.state.title}</strong></h1>
            <Glyphicon glyph='pencil' style={{fontSize: '25px', marginLeft: '3%', color: 'white'}} />
          </div>
        </div>
        <div onClick={() => this.showImgEditWindow()} className='coverPhotoDiv' style={{margin: '0 0 10px 0', position: 'absolute', right: '0', bottom: '0', whiteSpace: 'nowrap', 'paddingRight': '1%'}}>
          <h3 style={{display: 'inline', color: 'white'}}>Edit Cover Photo</h3>
          <Glyphicon glyph='picture' style={{fontSize: '18px', marginLeft: '3%', color: 'white'}} />
        </div>
        {editTitleWindow}
        {editImgWindow}
      </div>
    )
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      itinerary: nextProps.itinerary,
      title: nextProps.itinerary.title,
      newTitle: nextProps.itinerary.title,
      id: nextProps.itinerary.id
    })
  }

  handleTitleChange (e) {
    this.setState({
      newTitle: e.target.value
    })
  }

  handleImgChange (e) {
    this.setState({
      newImg: e.target.value
    })
  }

  showTitleEditWindow () {
    this.setState({
      editingTitle: true
    })
  }

  showImgEditWindow () {
    this.setState({
      editingImg: true
    })
  }

  closeTitleEditWindow () {
    this.setState({
      editingTitle: false,
      newTitle: this.state.title
    })
  }

  closeImgEditWindow () {
    this.setState({
      editingImg: false,
      newImg: this.state.img
    })
  }

  saveTitle () {
    let newItinerary = this.state.itinerary
    newItinerary.title = this.state.newTitle
    newItinerary = {
      data: newItinerary
    }
    fetch(`${url}/profile/${this.state.id}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItinerary)
      }
    )
      .then(res => {
        if (res.status === 200) {
          alert('successful!')
          this.getItinerary()
        }
        else console.log(res)
      })
    this.setState({
      editingTitle: false
    })
  }

  saveImg () {
    this.setState({
      editingImg: false,
      img: this.state.newImg
    })

    let newItinerary = this.state.itinerary
    newItinerary.bannerUrl = this.state.newImg
    newItinerary = {
      data: newItinerary
    }
    fetch(`${url}/profile/${this.state.id}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': 'Bearer ' + this.state.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItinerary)
      }
    )
      .then(res => {
        if (res.status === 200) {
          alert('successful!')
          this.getItinerary()
        }
        else console.log(res)
      })

  }
}

export default CoverPhotoEditPage
