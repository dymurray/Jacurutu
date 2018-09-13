import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import Ticket from './Ticket.js';
import Event from './Event.js';
import Spinner from './Spinner.js';
//let MoneyButton = require('react-money-button')

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
	  showForm: false,
	  showTicket: false,
	  showEvent: false
      };

    this.showForm = this.showForm.bind(this);
    this.showTicket = this.showTicket.bind(this);
    this.showEvent = this.showEvent.bind(this);
    this.showLoader = this.showLoader.bind(this);
  }
 
   showForm(event) {
     this.setState({
       showForm: true,
       showTicket: false,
       showEvent: false
     });
   }

   showTicket(event) {
     this.setState({
	showForm: false,
	showTicket: true,
	showEvent: false
     });
   }
   
   showEvent(event) {
     this.setState({
	showForm: false,
	showTicket: false,
	showEvent: true
     });
   }

   showLoader(event) {
     this.refs.spinner.toggleSpinner();
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
	  <button className="btn btn-secondary" onClick={this.showEvent}>Show Event</button>
	  <button className="btn btn-secondary" onClick={this.showLoader}>Show Spinner</button>
	</div>
     	<div className="row container-fluid no-margin">
	  {this.state.showForm ? <Form /> : null }
	  {this.state.showTicket ? <Ticket /> : null}
	  {this.state.showEvent ? <Event /> : null}
	</div>
	<div className="row">
	    <div className="col-2 col-centered">
	      <div className="money-button"
	        data-to="bitcoincash:qqpzugjwdxak2cc4yz96khkk5p8v3s55ts8um72rga"
	        data-amount=".001"
	        data-currency="BCH"
	        data-label="Donate to Kev"
	        data-hide-amount="false"
	        data-client-identifier="a65023353f4a69a96a959fe5f909749c"
	        data-button-id="1536850917611"
	        data-button-data="{}"
	        data-type="buy" 
	        data-dev-mode="true">
	      </div>
	    </div>
	</div>
	<Spinner ref="spinner"/>
      </div>
    );
  }
}

export default App;
