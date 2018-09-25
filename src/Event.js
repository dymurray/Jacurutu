import React, { Component } from 'react';

class Event extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      eventID: 12345,
      eventName: "Kevin's super fun party",
      totalTickets: 500,
      ticketsSold: 100
    }
    
    //put function handlers here
  }

  render() {
    return (
      <div className="card col-md-6 col-centered text-center">
	<div className="card-header">
	  <h1>{this.state.eventName}</h1>
	</div>
	<div className="card-body">
	  <h4>Total Tickets Sold: {this.state.ticketsSold}</h4>
	  <h4>Total Tickets Remaining: {this.state.totalTickets - this.state.ticketsSold} </h4>
	  <div className="progress text-center">
	    <div className=
	      {(this.state.ticketsSold / this.state.totalTickets) > 0.75 ? 
	      "progress-bar bg-success" : 
	        (this.state.ticketsSold / this.state.totalTickets) > .25 ?
		"progress-bar bg-warning" : "progress-bar bg-danger" } 
	      role="progressbar" style={{width: 
		(100 * this.state.ticketsSold / this.state.totalTickets) + '%'}}
	      aria-valuenow={this.state.ticketsSold} 
	      aria-valuemin="0" 
	      aria-valuemax={this.state.totalTickets}>
	      {this.state.ticketsSold}
	    </div>
	  </div>
	</div>
      </div>
    )
  }

}

export default Event;
