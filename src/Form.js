import React, { Component } from 'react';
class Form extends Component {
  constructor(props) {
    super(props);
      this.state = {
          numberOfTickets: 0,
          ticketStyle: 'generalAdmission',
	  description: null
      };
  
    //bind all of the handlers for user selected input
    this.handleTicketStyleChange = this.handleTicketStyleChange.bind(this);
    this.handleNumberOfTicketsChange = this.handleNumberOfTicketsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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
 
  //update the description that the user enters
  handleDescriptionChange(event) {
    this.setState({
      description: event.currentTarget.value
    });
  }

  //user submitted the form
  handleSubmit(event) {
    alert('Type of tickecting event: ' + this.state.ticketStyle + '\nNumber of tickets: ' + this.state.numberOfTickets + '\nDescription: ' + this.state.description);
    event.preventDefault();
  }

  render() {
    return (
     <div class="card col-md-6 col-centered">
       <div class="card-body">
        <form onSubmit={this.handleSubmit}>
 	  <div class="form-group">
		<label for="eventType">Type of event</label>
	    	<select class="form-control" id="eventType"
	    	value={this.state.ticketStyle} onChange={this.handleTicketStyleChange}>
	    		<option value="general">General Admission</option>
	    		<option value="seating">Seating Chart</option>
	    		<option value="general_seating">Combination</option>
	    	</select>
	  </div>
	  <div class="form-group">
		  <label for="numTickets">Number of tickets</label>
	    	  <input type="number" class="form-control" placeholder="Enter number of tickets" onChange={this.handleNumberOfTicketsChange} required/>
		  <div class="invalid-feedback">
	    		<p>Please provide a valid number of tickets.</p>
	    	  </div>
	  </div>
	  <div class="form-group">
	      <label for="eventDescription">Event description</label>
	      <textarea class="form-control" id="eventDescription" rows="3" onChange={this.handleDescriptionChange} placeholder="Enter a description of the event that you are holding"></textarea>
  	  </div>
          <button type="submit" value="Submit" class="btn btn-secondary">Submit</button>
        </form>
      </div>
    </div>
    );
  }
}

export default Form;
