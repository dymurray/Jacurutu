import React, { Component } from 'react';
class SendForm extends Component {
  constructor(props) {
    super(props);
      this.state = {
          numberOfTickets: 0,
          ticketPrice: 0,
          eventId: 0,
          balance1: 0,
          balance2: 0,
      };
  
    //bind all of the handlers for user selected input
    this.handleNumberOfTicketsChange = this.handleNumberOfTicketsChange.bind(this);
    this.handleTicketPriceChange = this.handleTicketPriceChange.bind(this);
    this.handleEventIdChange = this.handleEventIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
 
  //update the eventId that the user enters
  handleEventIdChange(event) {
    this.setState({
      eventId: event.currentTarget.value
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
        const bitcoinDb2 = new BitcoinDb(wallet2)
        const token1 = BitcoinToken.fromHdPrivateKey(privkey)
      const token2 = BitcoinToken.fromHdPrivateKey(privkey2)
      const numOfTickets = this.state.numberOfTickets
              token1.getBalance().then(bal1 => {
                  console.log("balance1: " + bal1)
                  this.setState({
                      balance1: bal1
                  })
                  token2.getBalance().then(bal2 => {
                      console.log("balance2: " + bal2 + " bal1: " + bal1)
                      this.setState({
                          balance2: bal2
                      })
                      let recPubKey = wallet2.getPublicKey()
                      console.log(recPubKey)
                      token1.send(
                          numOfTickets,
                          recPubKey
                      ).then(id => {
                          console.log(id)
                          let newbal2 = eval(bal2) + eval(numOfTickets);
                          let newbal1 = eval(bal1) - eval(numOfTickets);
                          this.setState({
                             balance2: newbal2,
                             balance1: newbal1,
                          })
                      }).catch(err => {
                         console.log(err)
                      })
                  }).catch(err => {
                      console.log(err)
                  })
              }).catch(err => {
                  console.log(err)
              })


    alert('Type of tickecting event: ' + this.state.ticketStyle +
	    '\nDate of event: '+ this.state.date +
	    '\nNumber of tickets: ' + this.state.numberOfTickets + 
	    '\nPrice of tickets: ' + this.state.ticketPrice);

    event.preventDefault();
  }

  render() {
    return (
     <div className="card col-md-6 col-centered">
       <div className="card-body">
        <form onSubmit={this.handleSubmit}>
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
	    <label htmlFor="eventId">Event ID</label>
	    <input id="numTickets" type="number" className="form-control" 
	      placeholder="Enter number of tickets" 
	      onChange={this.handleNumberOfTicketsChange} required/>
	    <div className="invalid-feedback">
	      <p>Please provide a valid event ID.</p>
	    </div>
  	  </div>
          <button type="submit" value="Submit" 
	    className="btn btn-secondary">Submit</button>
        </form>
    </div>
    <h1>Balance1: {this.state.balance1}</h1>
    <h2>Balance2: {this.state.balance2}</h2>
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


export default SendForm;
