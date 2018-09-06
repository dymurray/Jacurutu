import React, { Component } from 'react';

class Ticket extends Component {
  constructor(props) {
    super(props);
    var chartApi = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=";
    var publicKey = "bitcoincash:qqpzugjwdxak2cc4yz96khkk5p8v3s55ts8um72rga"
    this.state = {
      publicKey: publicKey,
      qrCode: chartApi + publicKey
    }
  
  //pust function handlers here
  }
  
  render() {
    return ( 
      <div className="card col-md-6 col-centered">
        <div className="card-body">
	  <h1>Ticket information goes here</h1>
	  <img src={this.state.qrCode} />
	</div>
      </div>
    )
  }
}

export default Ticket
