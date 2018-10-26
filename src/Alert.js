import React, {Component} from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "alert alert-success jac-alert jac-hidden",
      style: "success"
    };
  }

  //show the alert to the user
  showAlert() {
    var style = this.props.style || this.state.style;
    this.setState({classes: "alert jac-alert show alert-" + style})
  }

  //show the alert to the user, then fade away after specified delay
  showThenHideAlert(delay) { 
    delay = delay || 5000;
    var style = this.props.style || this.state.style;    
    this.setState({classes: "alert jac-alert show alert-" + style});
    setTimeout(this.hideAlert.bind(this), delay);
  }
  
  //hide the alert from the user
  hideAlert() {
    this.setState({classes: "alert alert-success jac-alert jac-hidden" });
  }
  
  //toggle the alert
  toggleAlert() {
    //TODO: figure out how to handle this...
  }

  render() {
    return (
	    <div className={this.state.classes}>{this.props.message}</div>
    )
  }
}

export default Alert;
