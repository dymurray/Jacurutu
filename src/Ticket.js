import React, { Component } from 'react';

class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: null
    }
  
  //pust function handlers here
  }
  
  render() {
    return ( 
      <div className="card col-md-6 col-centered">
        <div className="card-body">
	  <h1>Ticket information goes here</h1>
	</div>
      </div>
    )
  }
}

export default Ticket
