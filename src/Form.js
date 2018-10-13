import React, { Component } from 'react';
class Form extends Component {
  constructor(props) {
    super(props);
      this.state = {
	  eventName: null,
	  numberOfTickets: 0,
          ticketStyle: 'generalAdmission',
	  description: null,
	  ticketPrice: 0,
	  date: null,
	  masterPrivateKey: 'tprv8ZgxMBicQKsPdjJKAVVDbBizg59Ue2nfTKn9LN3qSjfg2Sd35igCWc18ApFiMaQ25zCGxrhaiBBEP4uPdL9Ydxhk8XUdkaWVo4Gb4DBz1Ec'
      };
  
    //bind all of the handlers for user selected input
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTicketStyleChange = this.handleTicketStyleChange.bind(this);
    this.handleNumberOfTicketsChange = this.handleNumberOfTicketsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTicketPriceChange = this.handleTicketPriceChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.putDataSuccess = this.putDataSuccess.bind(this);
    this.getDataSuccess = this.getDataSuccess.bind(this);
  }
  
  //update event name based on user input
  handleNameChange(event) {
    this.setState({
      eventName: event.currentTarget.value
    });
  }

  //update the ticket style based on user input
  handleTicketStyleChange(event) {
    this.setState({
      ticketStyle: event.currentTarget.value
    });
  }
  
  //update the number of tickets that the user wants to create
  handleNumberOfTicketsChange(event) {
    this.setState({
      numberOfTickets: event.currentTarget.value
    });
  }

  //update price of the tickets
  handleTicketPriceChange(event) {
    this.setState({
      ticketPrice: event.currentTarget.value
    });
  }
 
  //update the description that the user enters
  handleDescriptionChange(event) {
    this.setState({
      description: event.currentTarget.value
    });
  }

  handleDateChange(event) {
    this.setState({
      date:event.currentTarget.value
    });
  }

  async putDataSuccess(result) {
    const BitcoinToken = require('bitcointoken')
    //console.log(BitcoinToken)
    const id = result.txId;
    const bitcoinDb = new BitcoinToken.BitcoinDb()
    console.log("bitcoinDB: " + bitcoinDb)
    bitcoinDb.get(result).then(this.getDataSuccess);
    console.log("transaction id: " + id);
  }

  async getDataSuccess(result) {
    const data = result.data
    console.log("ditcoindb data: " + data.eventName)
  }
  //user submitted the form
  async handleSubmit(event) {
   event.preventDefault();
   const masterPrivateKey = 'tprv8ZgxMBicQKsPdjJKAVVDbBizg59Ue2nfTKn9LN3qSjfg2Sd35igCWc18ApFiMaQ25zCGxrhaiBBEP4uPdL9Ydxhk8XUdkaWVo4Gb4DBz1Ec'
   const BitcoinToken = require('bitcointoken');
   const Wallet = BitcoinToken.Wallet;
   const BitcoinDb = BitcoinToken.BitcoinDb;
   const wallet = Wallet.fromHdPrivateKey(masterPrivateKey);
   const bitcoinDb = new BitcoinDb(wallet);
   var data = this.state;
   var idData = 0;
   const dataInfo = {
	     txId: 'fe39af3d3ea79fe08e0685ce3f8cd53a019d2d77fb199073d72c24337c2946e6',
	     outputNumber: 0
   }
   bitcoinDb.get(dataInfo).then(data => console.log(data))

   bitcoinDb.put({data}).then(this.putDataSuccess);

   
   //wallet.getBalance().then(balance => console.log(balance))
   //console.log(id);
   //console.log(wallet.getAddress());

    alert('Event name: ' + this.state.eventName +
	    '\nType of tickecting event: ' + this.state.ticketStyle +
	    '\nDate of event: '+ this.state.date +
	    '\nNumber of tickets: ' + this.state.numberOfTickets + 
	    '\nPrice of tickets: ' + this.state.ticketPrice +
	    '\nDescription: ' + this.state.description);
    return false;
  }

  render() {
    return (
     <div className="card col-md-6 col-centered">
       <div className="card-body">
        <form onSubmit={this.handleSubmit}>
 	  <div className="form-group">
            <label htmlFor="eventName">Name of event</label>
	    <input id="eventName" type="string"
	      className="form-control"
	      placeholder="Enter the name of the event"
	      onChange={this.handleNameChange} />
	  </div>
	  <div className="form-group">
	    <label htmlFor="eventType">Type of event</label>
	    <select className="form-control" id="eventType"
	      value={this.state.ticketStyle} 
	      onChange={this.handleTicketStyleChange}>
	    	<option value="general">General Admission</option>
	    	<option value="seating">Seating Chart</option>
	    	<option value="general_seating">Combination</option>
	    </select>
	  </div>
	  <div className="form-group">
	    <label htmlFor="eventDate">Date</label>
	    <input id="eventDate" type="date" 
	      className="form-control" 
	      placeholder="Enter the date of the event" 
	      onChange={this.handleDateChange}
	    required/>
	  </div>
	  <div className="form-group">
	    <label htmlFor="numTickets">Number of tickets</label>
	    <input id="numTickets" type="number" className="form-control" 
	      placeholder="Enter number of tickets" 
	      onChange={this.handleNumberOfTicketsChange} required/>
	    <div className="invalid-feedback">
	      <p>Please provide a valid number of tickets.</p>
	    </div>
	  </div>
	  <div>
	    <label htmlFor="ticketPrice">Ticket price</label>
	    <input id="ticketPrice" type="number" className="form-control" 
	      min="0.01" max="100000" step=".01" 
	      placeholder="Enter price of the ticket" 
	      onChange={this.handleTicketPriceChange} required />
	  </div>
	  <div className="form-group">
	    <label htmlFor="eventDescription">Event description</label>
	    <textarea className="form-control" id="eventDescription" 
	      rows="3" onChange={this.handleDescriptionChange} 
	      placeholder="Enter a description of the event that you are holding">
	    </textarea>
  	  </div>
          <button type="submit" value="Submit" 
	    className="btn btn-secondary">Submit</button>
        </form>
      </div>
    </div>
    );
  }
}

export default Form;
