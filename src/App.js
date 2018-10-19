import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import Ticket from './Ticket.js';
import EventList from './EventList.js';
import Spinner from './Spinner.js';
import MoneyButton from '@moneybutton/react-money-button';
import Wallet from 'bitcointoken'
import Login from './Login.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  showForm: false,
	  showTicket: false,
	  showLogin: false,
	  showEvent: false
      };

    this.showForm = this.showForm.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showTicket = this.showTicket.bind(this);
    this.showEvent = this.showEvent.bind(this);
    this.showLoader = this.showLoader.bind(this);
  }
 
   showForm(event) {
     this.setState({
       showForm: true,
       showTicket: false,
	showLogin: false,
       showEvent: false
     });
   }

   showTicket(event) {
     this.setState({
	showForm: false,
	showTicket: true,
	showLogin: false,
	showEvent: false
     });
   }
   
   showLogin(event) {
     this.setState({
	showForm: false,
	showTicket: false,
	showLogin: true,
	showEvent: false
     });
   }

   showEvent(event) {
     this.setState({
	showForm: false,
	showLogin: false,
	showTicket: false,
	showEvent: true
     });
   }

   showLoader(event) {
     this.refs.spinner.toggleSpinner();
   }
  
   render() {
    //TODO: remove
    const test = [{eventName:"Kevin's Event", eventID: 1234}, {eventName: "Dylan's Event", eventID: 4567}];     
    
    return (
      <div className="App">
	<div className="container-fluid app-center no-padding">
          <header className="App-header app-center">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Jacurutu Ticketing</h1>
          </header>
	  <div className="jumbotron">
	    <h1>Welcome to Jacurutu, the world's best ticketing website</h1>
	    <p>We offer vendors the ability to accurately track their tickets at a small processing fee</p>
	    <hr className="my-4" />
	    <p>Jacurutu is built upon the Bitcoin (BCH) block chain which allows for accurate tracking and tokenizing of your tickets.  If someone attempts to resell your ticket then you will know about it.</p>
	    {/* <!-- <p className="lead">
	      <a className="btn btn-secondary" href="#">Learn More</a>
	    </p> */}
	  </div>
	  <div className="row no-margin">
	    <div className="col no-margin">
	      <button className="btn btn-secondary" 
	        onClick={this.showForm}>Create Event</button>
	      <button className="btn btn-secondary" 
	        onClick={this.showTicket}>Show Ticket</button>
	      <button className="btn btn-secondary" 
	        onClick={this.showEvent}>Show Event List</button>
	      <button className="btn btn-secondary" 
	        onClick={this.showLogin}>Show Login</button>
	      <button className="btn btn-secondary" 
	        onClick={this.showLoader}>Show Spinner</button>
	    </div>
	  </div>
	</div>
     	<div className="row container-fluid no-margin">
	  {this.state.showForm ? <Form toggleSpinner={this.refs.spinner.toggleSpinner}/> : null }
	  {this.state.showLogin ? <Login /> : null}
	  {this.state.showTicket ? <Ticket /> : null}
	  {this.state.showEvent ? <EventList KevinTest={test[0]} /> : null}
	</div>
	<Spinner ref="spinner"/>
      </div>
    );
  }
}

export default App;
