import React, { Component } from 'react';
class TicketProps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkBox: true,
      numberOfTickets: 2
    };
  
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
  
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="checkBox"
            type="checkbox"
            checked={this.state.checkBox}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of tickets to issue:
          <input
            name="numberOfTickets"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}

export default TicketProps;

