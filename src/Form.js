import React, { Component } from 'react';
class Form extends Component {
  constructor(props) {
    super(props);
      this.state = {
          numberOfTickets: 2,
          ticketStyle: 'generalAdmission'
      };
  
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      ticketStyle: event.target.ticketStyle,
      numberOfTickets: 0
    });
  }

  handleSubmit(event) {
    alert('Type of tickecting event: ' + this.state.ticketStyle);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Select the seating style for your event:
          <select value={this.state.ticketStyle} onChange={this.handleInputChange}>
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
            onChange={this.handleInputChange}
            type="number"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
