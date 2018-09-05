import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
	  showForm: false
      };

    this.showForm = this.showForm.bind(this);
  }
 
   showForm(event) {
     this.setState({
       showForm: true
     });
   // console.log("Kevin Kevin Kevin");
   }
	
  render() {
    return (
      <div className="App">
	<div class="container-fluid app-center">
          <header className="App-header app-center">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Jacurutu Ticketing</h1>
          </header>
	  <button class="btn btn-secondary" onClick={this.showForm}>Show Form</button>
	</div>
     	<div class="row container-fluid">
	  {this.state.showForm ? <Form /> : null }
	</div>
      </div>
    );
  }
}

export default App;
