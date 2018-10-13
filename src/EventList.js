import React, { Component } from 'react';
import EventDetail from './EventDetail.js';
import EventInfo from './EventInfo.js';

class EventList extends Component {
  constructor (props) {
    super (props);

    const tx1 = {
      txId: 'fe39af3d3ea79fe08e0685ce3f8cd53a019d2d77fb199073d72c24337c2946e6',
      outputNumber: 0
    }
    const tx2 = {
      txId: '79bd4c365e3e9e9403f589f9bf2b55586b40eaa7bcb1c2d316de020283f83bf4',
      outputNumber: 0
    }

    const tx3 = {
      txId: 'e7f6914bdc0e7471e9ec6373a5492cfd58f49d2ab740156b8c2b00dc63ea55b6',
      outputNumber: 0
    }

    this.state = {
	    events: [{masterPrivateKey: '123', eventName: "Kevin's Cool Party", 
		    eventDate: "08/26/2019",
		    eventPrice: "45",
		    currency: "USD",
	            eventDescription: "Come one come all as we celebrate another great year and look forward to the next hockey season."},
	       {masterPrivateKey: '456', eventName: "Dylan's Cool Party", 
	            eventDate: "04/12/2019",
		    eventPrice: "35",
		    currency: "USD",
	            eventDescription: "Since I'm getting married I thought it would be totally cool to throw a party"},
	       {masterPrivateKey: '789', eventName: "Connor's Cool Party",
	            eventDate: "04/12/2019",
		    eventPrice: "15",
		    currency: "USD",
	            eventDescription: "I guess we should celebrate my return from my awesome trip to London. Honestly I just really wanted a long description for an event to see how it would display.  I think that this description is getting to be long enough" }],
	    eventTransactions: [tx2,tx3]

    }
    //bind this to the appropriate functions
    this.loadEventInfoForTransactions = this.loadEventInfoForTransactions.bind(this);
  }

  //event list is loaded, find all of the active events
  componentDidMount() {

    console.log(this.state.eventTransactions)
    this.loadEventInfoForTransactions()

  }

  async loadEventInfoForTransactions(){
    const BitcoinToken = require('bitcointoken')
    const bitcoinDb = new BitcoinToken.BitcoinDb()
    console.log(this.state.eventTransactions.length);
    for( var i = 0; i < this.state.eventTransactions.length; i++){
      bitcoinDb.get(this.state.eventTransactions[i]).then(result => {
	//TODO: Figure out how to handle event IDs in this scenario
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
