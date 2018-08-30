import React, { Component } from 'react';
class TicketType extends Component {
  render() {
    return (
     <div className="shopping-list">
       <h1>Jacurutu {this.props.name}</h1>
       <ul>
         <li>General Admission</li>
         <li>Seated Events</li>
       </ul>
     </div>
   );
  }
}

export default TicketType;

