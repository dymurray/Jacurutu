import React, { Component } from 'react';

class Event extends Component {
  constructor (props) {
    super(props);
    
    this.state = {
      eventID: 12345,
      eventName: "Kevin's super fun party",
      totalTickets: 500,
      ticketsSold: 212
    }
    
    //put function handlers here
    }

  render() {
    return (
      <h1>Event Information</h1>
    )
  }

}

export default Event;
