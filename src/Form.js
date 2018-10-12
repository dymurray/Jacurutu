import React, { Component } from 'react';
class Form extends Component {
  constructor(props) {
    super(props);
      this.state = {
          numberOfTickets: 0,
          ticketStyle: 'generalAdmission',
	  description: null,
	  ticketPrice: 0,
	  date: null
      };
  
    //bind all of the handlers for user selected input
    this.handleTicketStyleChange = this.handleTicketStyleChange.bind(this);
    this.handleNumberOfTicketsChange = this.handleNumberOfTicketsChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleTicketPriceChange = this.handleTicketPriceChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //update the ticket style based on user input
  handleTicketStyleChange(event) {
    this.setState({
      ticketStyle: event.currentTarget.value
    });
  }
  
  //update the number of tickets that the user wants to create
  handleNumberOfTicketsChange(event) {
    this.setState({
      numberOfTickets: event.currentTarget.value
    });
  }

  //update price of the tickets
  handleTicketPriceChange(event) {
    this.setState({
      ticketPrice: event.currentTarget.value
    });
  }
 
  //update the description that the user enters
  handleDescriptionChange(event) {
    this.setState({
      description: event.currentTarget.value
    });
  }

  handleDateChange(event) {
    this.setState({
      date:event.currentTarget.value
    });
  }

  //user submitted the form
  handleSubmit(event) {
        const Bitcoin = require('bitcointoken')
        const BitcoinWallet = Bitcoin.Wallet
        const BitcoinDb = Bitcoin.BitcoinDb
        const BitcoinToken = Bitcoin.Token
        const privkey = 'tprv8ZgxMBicQKsPe4PCLLeDcD9SeGK7HfBJjruGJjQwuVJ19gCM3Hqam5ygx62ZHPtB16bmSsw1qjFEo2UQVWSYgcXbo8KFTrDMoDcQBog979N'
        const privkey2 = 'tprv8ZgxMBicQKsPcseFfdHR7u6neRCfR2CLmRQv4h37LjUtkfsDAhdZy1nBW9SFPF85Nxa42fxyRFRWADZo6Jeokvut9PCdjLimyzkCaq9qzWU'
        const wallet2 = BitcoinWallet.fromHdPrivateKey(privkey2)
      const wallet1 = BitcoinWallet.fromHdPrivateKey(privkey)
        const bitcoinDb1 = new BitcoinDb(wallet1)
      const token = new BitcoinToken(bitcoinDb1)
              token.getBalance().then(bal => {
                  console.log("balance")
                  console.log(bal)
              })
      token.create({
          data: {
              balance: this.state.numberOfTickets,
              price: this.state.ticketPrice,
              description: this.state.description,
              date: this.state.date,
              type: this.state.ticketStyle,
          }}).then(result => {
              console.log("token created")
              console.log(result)
              token.getBalance().then(bal => {
                  console.log("balance")
                  console.log(bal)
              })
          }).catch(err => {
              console.log(err)
          })
        const data = { 
            ticketStyle: this.state.ticketStyle,
            date: this.state.date,
            numberOfTickets: this.state.numberOfTickets,
            ticketPrice: this.state.ticketPrice,
            description: this.state.description,
        }
      getdata(bitcoinDb1, data).then(result => {
          console.log(result)
      }).catch(err => {
          console.log(err)
      });
    alert('Type of tickecting event: ' + this.state.ticketStyle +
	    '\nDate of event: '+ this.state.date +
	    '\nNumber of tickets: ' + this.state.numberOfTickets + 
	    '\nPrice of tickets: ' + this.state.ticketPrice +
        '\nDescription: ' + this.state.description);

    event.preventDefault();
  }

  render() {
    return (
     <div className="card col-md-6 col-centered">
       <div className="card-body">
        <form onSubmit={this.handleSubmit}>
 	  <div className="form-group">
	    <label htmlFor="eventType">Type of event</label>
	    <select className="form-control" id="eventType"
	      value={this.state.ticketStyle} 
	      onChange={this.handleTicketStyleChange}>
	    	<option value="general">General Admission</option>
	    	<option value="seating">Seating Chart</option>
	    	<option value="general_seating">Combination</option>
	    </select>
	  </div>
	  <div className="form-group">
	    <label htmlFor="eventDate">Date</label>
	    <input id="eventDate" type="date" 
	      className="form-control" 
	      placeholder="Enter the date of the event" 
	      onChange={this.handleDateChange}
	    required/>
	  </div>
	  <div className="form-group">
	    <label htmlFor="numTickets">Number of tickets</label>
	    <input id="numTickets" type="number" className="form-control" 
	      placeholder="Enter number of tickets" 
	      onChange={this.handleNumberOfTicketsChange} required/>
	    <div className="invalid-feedback">
	      <p>Please provide a valid number of tickets.</p>
	    </div>
	  </div>
	  <div>
	    <label htmlFor="ticketPrice">Ticket price</label>
	    <input id="ticketPrice" type="number" className="form-control" 
	      min="0.01" max="100000" step=".01" 
	      placeholder="Enter price of the ticket" 
	      onChange={this.handleTicketPriceChange} required />
	  </div>
	  <div className="form-group">
	    <label htmlFor="eventDescription">Event description</label>
	    <textarea className="form-control" id="eventDescription" 
	      rows="3" onChange={this.handleDescriptionChange} 
	      placeholder="Enter a description of the event that you are holding">
	    </textarea>
  	  </div>
          <button type="submit" value="Submit" 
	    className="btn btn-secondary">Submit</button>
        </form>
      </div>
    </div>
    );
  }
}
async function getdata(db, data) {
    try {
        let id = await db.put({data}).then(res => {
            return res
        });
        console.log(id)
        let returndata = await db.get(id).then(res => {
            return res
        });
        return returndata;
    } catch(e) {
        console.log(e);
        throw e;
    }
}


export default Form;
