import React, {Component} from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "alert alert-success jac-alert"
    };
  }

  showAlert() {
    this.setState({classes: "alert alert-success jac-alert show "})
    
    setTimeout(this.hideAlert.bind(this), 5000)
  }
  
  hideAlert() {
    this.setState({classes: "alert alert-success jac-alert"});
  }
  
  toggleAlert() {

  }

  render() {
    return (
	    <div className={this.state.classes}>{this.props.message}</div>
    )
  }
}

export default Alert;
