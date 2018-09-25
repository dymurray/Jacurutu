import React, { Component } from 'react';

class MoneyButton extends Component {
  constructor (props) {
    super(props);
	  
    this.state = {
      address: "qqpzugjwdxak2cc4yz96khkk5p8v3s55ts8um72rga"
    }
  }
  
  render() {
    return (
	<div className="row">
            <div className="col-md-6 col-centered text-center">
              <div className="money-button mx-auto"
                data-to={this.state.address}
                data-amount=".0001"
                data-currency="BCH"
                data-label="Donate to Kev"
                data-hide-amount="false"
                data-client-identifier="71f3b76d2eaba22f25a306be5eb636ec"
                data-button-id="1536865589522"
                data-button-data="{}"
                data-type="buy"
                >
	    </div>
          </div>
        </div>
    )
  }
}

export default MoneyButton;

