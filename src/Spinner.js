import React, { Component } from 'react';
import logo from './logo.svg';

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false
    }

    this.toggleSpinner = this.toggleSpinner.bind(this);
  }

  toggleSpinner() {
    this.setState({showSpinner: !this.state.showSpinner});
  }

  render() {
    var showSpinnerClass = !this.state.showSpinner ? 'hidden' : 'app-center align-middle';
    return (
      <div id="overlay" className={showSpinnerClass}>
	    <div className="container vertical-center">
	      <img src={logo} className="App-spinner mx-auto" alt="logo" />
	    </div>

      </div>
    );
  }
};

export default Spinner;
