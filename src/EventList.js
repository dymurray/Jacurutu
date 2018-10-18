import React, { Component } from 'react';
import EventInfo from './EventInfo.js';

class EventList extends Component {
  constructor (props) {
    super (props);

    this.state = {
	    transactions: [],
	    events: [],
	    eventTransactions: []

    }
    //bind this to the appropriate functions
    this.loadEventInfoForTransactions = this.loadEventInfoForTransactions.bind(this);
    this.getTransactionsResponse = this.getTransactionsResponse.bind(this);
    this.setEventTransactionData = this.setEventTransactionData.bind(this);
  }

  //event list is loaded, find all of the active events
  async componentDidMount() {
    var ipAddress = "http://206.189.180.144:8000/"
    await fetch(ipAddress + "transactions").then(this.getTransactionsResponse);
    
    //console.log(this.state.eventTransactions)
    //this.loadEventInfoForTransactions()

  }

  getTransactionsResponse(response)
  {
    if(response.status !== 200) {
      console.log("Error receiving transaction information.  Error Code: " + response.status);
      return;
    }

    response.json().then(this.setEventTransactionData);
    //this.loadEventInfoForTransactions();
  }

  setEventTransactionData(data) {
    this.setState({
      eventTransactions: data
    });
    this.loadEventInfoForTransactions();
  }

  async loadEventInfoForTransactions(){
    const BitcoinToken = require('bitcointoken')
    const bitcoinDb = new BitcoinToken.BitcoinDb()
    console.log("Event info: ");
    console.log(this.state.eventTransactions.length);
    
    for( var i = 0; i < this.state.eventTransactions.length; i++){
      bitcoinDb.get(this.state.eventTransactions[i]).then(result => {
	//TODO: Figure out how to handle event IDs in this scenario
	console.log(result);
	result.data.eventID = i * result.data.numberOfTickets 
        var eventArray = this.state.events.concat(result.data)
	this.setState({ 
          events: eventArray
	})
	//console.log(eventArray)
      })
      //console.log(this.state.eventTransactions[i])
    }
    //this.state.eventTransactions.each(function(){console.log(this)})
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
