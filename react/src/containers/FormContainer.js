import React, { Component } from 'react';
import NameField from '../components/NameField';
import UrlField from '../components/UrlField';

class FormContainer extends Component {
  constructor(props){
    super(props);
    this.state= {
      gifName: '',
      gifUrl: '',
      gifLikes: 0
    }

    this.handleName = this.handleName.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }


  handleName(event){
    this.setState({ gifName: event.target.value })
  }

  handleUrl(event){
    this.setState({ gifUrl: event.target.value })
  }

  handleFormSubmit(event){
    event.preventDefault()
    let formPayload = {
      name: this.state.gifName,
      url: this.state.gifUrl,
      likes: this.state.gifLikes
    }
    this.props.addNewGif(formPayload)
    this.clearForm()
  }

  clearForm(){
    this.setState({
      gifName: '',
      gifTitle: '',
      gifLikes: 0
    })
  }

  render(){
    return(
      <form onSubmit={this.handleFormSubmit}>
        <NameField
          content={this.state.gifName}
          label="Gif Name"
          name= "gifName"
          handleChange={this.handleName}
        />
        <UrlField
          content={this.state.gifUrl}
          label="Gif Url"
          name="gifUrl"
          handleChange={this.handleUrl}
        />
        <input type="submit" value="Add Gif!" />
      </form>
    )
  }
}

export default FormContainer;
