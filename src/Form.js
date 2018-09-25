import React, { Component } from 'react';
class Form extends Component {
  constructor(props) {
    super(props);
      this.state = {
          numberOfTickets: 0,
          ticketStyle: 'generalAdmission',
	  description: null,
	  ticketPrice: 0,
	  date: null
      };
  
    //bind all of the handlers for user selected input
    this.handleTicketStyleChange = this.handleTicketStyleChange.bind(this);
    this.handleNumberOfTicketsChange = this.handleNumberOfTicketsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTicketPriceChange = this.handleTicketPriceChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  //user submitted the form
  handleSubmit(event) {
    alert('Type of tickecting event: ' + this.state.ticketStyle +
	    '\nDate of event: '+ this.state.date +
	    '\nNumber of tickets: ' + this.state.numberOfTickets + 
	    '\nPrice of tickets: ' + this.state.ticketPrice +
	    '\nDescription: ' + this.state.description);
    event.preventDefault();
  }

  render() {
    return (
     <div className="card col-md-6 col-centered">
       <div className="card-body">
        <form onSubmit={this.handleSubmit}>
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
