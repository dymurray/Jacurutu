import React, { Component } from 'react';

class MoneyButton extends Component {
  constructor (props) {
    super(props);
	  
    this.state = {
      address: "bitcoinccash:qqpzugjwdxak2cc4yz96khkk5p8v3s55ts8um72rga"
    }
  }
  
  render() {
    return (
	<div className="row">
            <div className="col-md-6 col-centered text-center">
              <div className="money-button mx-auto"
                data-to={this.state.address}
                data-amount=".001"
                data-currency="BCH"
                data-label="Donate to Kev"
                data-hide-amount="false"
                data-client-identifier="a65023353f4a69a96a959fe5f909749c"
                data-button-id="1536850917611"
                data-button-data="{}"
                data-type="buy"
                data-dev-mode="true">
              </div>
            </div>
        </div>
    )
  }
}

export default MoneyButton;

