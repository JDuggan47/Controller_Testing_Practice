import React, { Component } from 'react';
import GifTile from '../components/GifTile';
import FormContainer from './FormContainer';

class GifContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      gifs: []
    }

    this.addNewGif = this.addNewGif.bind(this);
  }

  componentDidMount(){
    fetch('/api/v1/gifs')
    .then(response => {
      let gifs = response.json()
      return gifs
    }).then(gifs => {
      this.setState({ gifs: gifs})
    })
  }

  addNewGif(formPayload){
    fetch('api/v1/gifs', {
      method: 'POST',
      body: JSON.stringify(formPayload)
    }).then(response => {
      let newGif = response.json()
      return newGif
    }).then(newGif => {
      debugger;
      this.setState({ gifs: [...this.state.gifs, newGif] })
    })
  }

  render(){
    let gifs = this.state.gifs.map(gif => {
      return(
        <GifTile
          key={gif.id}
          gif={gif}
        />
      )
    })
    return(
      <div>
        <FormContainer
          addNewGif={this.addNewGif}
        />
        {gifs}
      </div>
    )
  }
}

export default GifContainer;
