import React, { Component } from 'react';
import MoneyButton from '@moneybutton/react-money-button';

class EventDetail extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      eventID: 12345,
      eventName: "Kevin's super fun party",
      totalTickets: 500,
      ticketsSold: 100,
      ticketPrice: "20",
      priceCurrency: "USD"
    }
    
    //put function handlers here
  }

  GenerateTicketVolume=()=>
  {
    var randomTicketsAvailable = this.props.numberOfTickets>0 ? this.props.numberOfTickets : Math.floor(Math.random() * 1000) + 1;
    var randomTicketsSold = Math.floor(Math.random() * randomTicketsAvailable) + 1;
    var randomPrice = Math.floor(Math.random() * 50) + 20;
    this.setState({
      ticketsSold: randomTicketsSold,
      totalTickets: randomTicketsAvailable,
      ticketPrice: String(randomPrice)
    });
  }
  
  componentDidMount() {
    this.GenerateTicketVolume();
  }
  
  

  render() {
    return (
      <div id={"eventID-" + this.props.eventID} className="card collapse col-md col-centered text-center no-padding">
	<div className="card-header">
	  <h1>{this.props.eventName}</h1>
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

export default EventDetail;
