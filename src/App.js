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
import User from './User.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  showHome: true,
	  showForm: false,
	  showTicket: false,
	  showLogin: false,
	  showEvent: false,
	  showUser: false,
	  userInfo: null
      };

    this.showForm = this.showForm.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showTicket = this.showTicket.bind(this);
    this.showEvent = this.showEvent.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.showUser = this.showUser.bind(this);
    this.goHome = this.goHome.bind(this);
  }
 
   showForm(event) {
     this.setState({
       showForm: true,
       showTicket: false,
       showLogin: false,
       showEvent: false,
       showHome: false
     });
   }

   showTicket(event) {
     this.setState({
	showForm: false,
	showTicket: true,
	showLogin: false,
	showEvent: false,
	showHome: false
     });
   }
   
   showLogin(event) {
     this.setState({
	showForm: false,
	showTicket: false,
	showLogin: true,
	showEvent: false,
	showHome: false
     });
   }

   showEvent(event) {
     this.setState({
	showForm: false,
	showLogin: false,
	showTicket: false,
	showEvent: true,
	showHome: false
     });
   }

   goHome(event) {
     this.setState({
       showForm: false, 
       showLogin: false,
       showTicket: false,
       showEvent: false,
       showHome: true
     });
   }

   showLoader(event) {
     this.refs.spinner.toggleSpinner();
   }

  showUser(user) {
    this.setState({userInfo: user}); 
    this.setState({ showUser: true });
  }
  
   render() {
    //TODO: remove
    const test = [{eventName:"Kevin's Event", eventID: 1234}, {eventName: "Dylan's Event", eventID: 4567}];     
    
    
    return (
      <div className="App">
	<nav className="navbar navbar-dark bg-dark text-white navbar-expand-lg">
	  <button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navigationButtons" aria-controls="navigationButtons" aria-expanded="false" aria-label="Toggle navigation">
	    <span className="navbar-toggler-icon"></span>
	  </button>
	  <a className="navbar-brand mr-auto my-auto">
	    <img src={logo} width="30" height="30" className="d-inline-block align-top" />
	    Jacurutu
	  </a>
	    {/*<button className="navbar-toggler mr-auto" type="button" data-toggle="collapse" data-target="#navigationButtons" aria-controls="navigationButtons" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>*/}
	  <div className="collapse navbar-collapse" id="navigationButtons">
            <div className="navbar-nav">
	      <a className="nav-item nav-link" href="#/" onClick={this.goHome}>Home</a>
	      <a className="nav-item nav-link" href="#/" onClick={this.showForm}>Create Event</a>
	      <a className="nav-item nav-link" href="#/" onClick={this.showEvent}>Show Events</a>
	      <a className="nav-item nav-link" href="#/" onClick={this.showTicket}>Redeem Ticket</a>
	    </div>
	  </div>     
	  <div className="navbar-nav mr-sm-2">
	      <a className="nav-item nav-link" href="#/" onClick={this.showLogin}>Login</a>
	  </div>
	</nav>
	{this.state.showHome ? 
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
            {this.state.showUser ? <User userInfo={this.state.userInfo} /> : null }
	  </div>
	    {/*<div className="row no-margin">
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
	  </div>*/}
	</div> 
     	: null}
	<div className="row container-fluid no-margin">
	  {this.state.showForm ? <Form toggleSpinner={this.refs.spinner.toggleSpinner} userInfo={this.state.userInfo}/> : null }
	  {this.state.showLogin ? <Login ref={instance => this.userInfo = instance} showUser={this.showUser} /> : null}
	  {this.state.showTicket ? <Ticket /> : null}
	  {this.state.showEvent ? <EventList /> : null}
	</div>
	<Spinner ref="spinner"/>
      </div>
    );
  }
}

export default App;
