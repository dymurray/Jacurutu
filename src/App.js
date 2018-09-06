import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import Ticket from './Ticket.js';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
	  showForm: false,
	  showTicket: false
      };

    this.showForm = this.showForm.bind(this);
    this.showTicket = this.showTicket.bind(this);
  }
 
   showForm(event) {
     this.setState({
       showForm: true,
       showTicket: false
     });
   }

   showTicket(event) {
     this.setState({
	showForm: false,
	showTicket: true
     });
   }
	
  render() {
    return (
      <div className="App">
	<div className="container-fluid app-center no-padding">
          <header className="App-header app-center">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Jacurutu Ticketing</h1>
          </header>
	  <button className="btn btn-secondary" onClick={this.showForm}>Show Form</button>
	  <button className="btn btn-secondary" onClick={this.showTicket}>Show Ticket</button>
	</div>
     	<div className="row container-fluid no-margin">
	  {this.state.showForm ? <Form /> : null }
	  {this.state.showTicket ? <Ticket /> : null}
	</div>
      </div>
    );
  }
}

export default App;
