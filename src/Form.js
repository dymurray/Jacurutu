import React, { Component } from 'react';
class Form extends Component {
  constructor(props) {
    super(props);
      this.state = {
          numberOfTickets: 10,
          ticketStyle: 'generalAdmission'
      };
  
    this.handleTicketChange = this.handleTicketChange.bind(this);
    this.handleSeatChange = this.handleSeatChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTicketChange(event) {
    this.setState({
      numberOfTickets: event.target.numberOfTickets
    });
  }

  handleSeatChange(event) {
    this.setState({
      ticketStyle: event.target.ticketStyle
    });
  }
  handleSubmit(event) {
    alert('Type of tickecting event: ' + this.state.ticketStyle +
      '\nNumber of tickets: ' + this.state.numberOfTickets
    );
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Select the seating style for your event:
          <select value={this.state.ticketStyle} onChange={this.handleSeatChange}>
            <option value="general">General Admission</option>
            <option value="seating">Seating Chart</option>
            <option value="general_seating">Combination</option>
          </select>
        </label>
        <br />
        <label>
          Enter the number of tickets to issue:
          <input 
            value={this.state.numberOfTickets}
            onChange={this.handleTicketChange}
            type="number"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
