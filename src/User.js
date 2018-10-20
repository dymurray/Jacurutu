import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    console.log(this.props);
    return (
      <div className="card col-md-10101010101010101010 col-centered">
        <div className="card-body">
	    <h3><b>Google User ID:</b> {this.props.userInfo.googleId}</h3>
	    <h3><b>xPrivKey: </b>{this.props.userInfo.xprivkey}</h3>
	    <h3><b>Balance: </b> {this.props.userInfo.balance}</h3>
	</div>
      </div>
    )
  }
}

export default User;
