import React, { Component } from 'react';
import EventDetail from './EventDetail.js';
import EventInfo from './EventInfo.js';

class EventList extends Component {
  constructor (props) {
    super (props);
    
    this.state = {
	    events: [{eventID: '123', eventName: "Kevin's Cool Party", 
		    eventDate: "08/26/2019", 
	            eventDescription: "Come one come all as we celebrate another great year and look forward to the next hockey season."},
	       {eventID: '456', eventName: "Dylan's Cool Party", 
	            eventDate: "04/12/2019",
	            eventDescription: "Since I'm getting married I thought it would be totally cool to throw a party"},
	       {eventID: '789', eventName: "Connor's Cool Party",
	            eventDate: "04/12/2019", 
	            eventDescription: "I guess we should celebrate my return from my awesome trip to London. Honestly I just really wanted a long description for an event to see how it would display.  I think that this description is getting to be long enough" }]

    }
  }

  render() {
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
