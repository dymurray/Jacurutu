import React, { Component } from 'react';

class Ticket extends Component {
  constructor(props) {
    super(props);
    var chartApi = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=";
    var publicKey = "bitcoincash:qqpzugjwdxak2cc4yz96khkk5p8v3s55ts8um72rga"
    this.state = {
      publicKey: publicKey,
      qrCode: chartApi + publicKey,
      chartApi: chartApi
    }
  
  //put function handlers here
    this.generateNewQrCode = this.generateNewQrCode.bind(this);
  }
  
  generateNewQrCode(event) {
    var newAddress = document.getElementById("addressInput").value;
    this.setState({
      publicKey: newAddress,
      qrCode: this.state.chartApi + newAddress
    });
    
  }


  render() { 
    return ( 
      <div className="card col-md-6 col-centered">
        <div className="card-body">
	  <h1>Ticket information goes here</h1>
	  <div className="row">
	    <div className="col-md col-centered">
	      <div className="input-group">
	        <input id="addressInput" type="text" className="form-control" placeholder="Enter your public address" defaultValue={this.state.publicKey}/>    
	        <span className="input-group-btn">
	          <button className="btn btn-secondary" onClick={this.generateNewQrCode}>Generate Code</button>
	        </span>
	      </div>
	    </div>
	  </div>
	  <div className="row">
	    <div className="col-md col-centered mx-auto">
	      <img alt="Jacurutu Ticket" className="qrCode" src={this.state.qrCode} />
	    </div>
	  </div>
	</div>
      </div>
    )
  }
}

export default Ticket
