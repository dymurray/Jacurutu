import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import SendForm from './SendForm.js';
import Ticket from './Ticket.js';
import EventList from './EventList.js';
import Spinner from './Spinner.js';
import Wallet from 'bitcointoken';
import MoneyButton from '@moneybutton/react-money-button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  showForm: false,
	  showTicket: false,
        showEvent: false,
        showSendForm: false,
      };

    this.showForm = this.showForm.bind(this);
    this.showSendForm = this.showSendForm.bind(this);
    this.showTicket = this.showTicket.bind(this);
    this.showEvent = this.showEvent.bind(this);
    this.showLoader = this.showLoader.bind(this);
  }
 
   showForm(event) {
     this.setState({
         showForm: true,
         showSendForm: false,
         showTicket: false,
         showEvent: false
     });
   }

   showSendForm(event) {
     this.setState({
         showSendForm: true,
         showForm: false,
         showTicket: false,
         showEvent: false
     });
   }

   showTicket(event) {
     this.setState({
        showForm: false,
        showSendForm: false,
    	showTicket: true,
    	showEvent: false
     });
   }
   
   showEvent(event) {
     this.setState({
	showForm: false,
    showSendForm: false,
	showTicket: false,
	showEvent: true
     });
   }

    async showLoader(event) {
        const Bitcoin = require('bitcointoken')
        const BitcoinWallet = Bitcoin.Wallet
        const BitcoinDb = Bitcoin.BitcoinDb
        const BitcoinToken = Bitcoin.Token
        const privkey1 = 'tprv8ZgxMBicQKsPe4PCLLeDcD9SeGK7HfBJjruGJjQwuVJ19gCM3Hqam5ygx62ZHPtB16bmSsw1qjFEo2UQVWSYgcXbo8KFTrDMoDcQBog979N'
        const wallet1 = BitcoinWallet.fromHdPrivateKey(privkey1)
        const address = wallet1.getAddress(0)
        const balance = wallet1.getBalance(0)
        const privkey2 = 'tprv8ZgxMBicQKsPcseFfdHR7u6neRCfR2CLmRQv4h37LjUtkfsDAhdZy1nBW9SFPF85Nxa42fxyRFRWADZo6Jeokvut9PCdjLimyzkCaq9qzWU'
        const wallet2 = BitcoinWallet.fromHdPrivateKey(privkey2)
        console.log(wallet2)

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
	        onClick={this.showSendForm}>Send Tickets</button>
	      <button className="btn btn-secondary" 
	        onClick={this.showTicket}>Show Ticket</button>
	      <button className="btn btn-secondary" 
	        onClick={this.showEvent}>Show Event List</button>
	      <button className="btn btn-secondary" 
	        onClick={this.showLoader}>Show Spinner</button>
	    </div>
	  </div>
	</div>
     	<div className="row container-fluid no-margin">
	  {this.state.showForm ? <Form /> : null }
	  {this.state.showSendForm ? <SendForm /> : null }
	  {this.state.showTicket ? <Ticket /> : null}
	  {this.state.showEvent ? <EventList KevinTest={test[0]} /> : null}
	</div>
	<Spinner ref="spinner"/>
      </div>
    );
  }
}

export default App;
