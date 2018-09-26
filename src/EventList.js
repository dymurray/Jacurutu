import React, { Component } from 'react';
import EventDetail from './EventDetail.js';
import EventInfo from './EventInfo.js';

class EventList extends Component {
  constructor (props) {
    super (props);
    
    this.state = {
      events: [{eventID: '123', eventName: "Kevin's Cool Party"},
	       {eventID: '456', eventName: "Dylan's Cool Party"},
	       {eventID: '789', eventName: "Connor's Cool Party"}]

    }
  }

  render() {
    console.log(this);
    return (
      <div className="card col-md-6 col-centered">
	{this.state.events.map((eventInfo, i) => {
          return (<EventInfo key={i} eventInfo={eventInfo} />)
	})}
      </div>
    )
  }
}

export default EventList;
