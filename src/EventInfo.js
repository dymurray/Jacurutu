import React, { Component } from 'react';
import EventDetail from './EventDetail.js';

class EventInfo extends Component {
  constructor (props) {
    super (props);
    
  }

  render() {
  return (
  <div>
    <div className="row">
      <div className="col-md">
        <h1>{this.props.eventInfo.eventName} (ID: {this.props.eventInfo.eventID})
        </h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <button className="btn btn-primary" type="button"
          data-toggle="collapse"
          data-target={"#eventID-" + this.props.eventInfo.eventID}
          aria-expanded="false"
          aria-controls={"#eventID-" + this.props.eventInfo.eventID}>
        Show More Info
        </button>
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

