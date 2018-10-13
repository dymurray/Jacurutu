import React, { Component } from 'react';
import EventDetail from './EventDetail.js';
import MoneyButton from '@moneybutton/react-money-button';

class EventInfo extends Component {
  constructor (props) {
    super (props);
    
  }

  render() {
  console.log(this.props.eventInfo.eventDate);
  return (
  <div>
    <div className="row card-body">
      <div className="col-md">
        <h2 className="card-title my-auto">{this.props.eventInfo.eventName}</h2>
	<h4 className="card-subtitle text-muted">
	  Date of Event: {this.props.eventInfo.eventDate}</h4>
	<h4 className="card-subtitle text-muted">Event ID: {this.props.eventInfo.eventID} </h4>
	<p className="card-text">{this.props.eventInfo.eventDescription}</p>
        <div className="row">
	  <div className="col-md">
	    <MoneyButton
              to="qqpzugjwdxak2cc4yz96khkk5p8v3s55ts8um72rga"
              amount="50"
              currency="USD"
              type='buy'
              label='Get your tickets!'
              buttonID={"moneyButton-" + this.props.eventID}
              devMode={true}
            />
	  </div>
	</div>
	<div className="row">
	  <div className="col-md">
	    <a className="my-auto" href={"#eventID-" + this.props.eventInfo.eventID} 
	    data-toggle="collapse"
	    aria-controls={"eventID-" + this.props.eventInfo.eventID}
	    className="card-link">
	    Show Ticket Information</a>
	  </div>
	</div>
      </div>
    </div>    
    <div className="row">
       <div className="col-md">
         <EventDetail eventID={this.props.eventInfo.eventID} 
	  eventName={this.props.eventInfo.eventName}
	  />
       </div>
     </div>
  </div>
  )
  }
}

export default EventInfo;

