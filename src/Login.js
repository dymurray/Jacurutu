import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login-component';
import { GoogleLogout } from 'react-google-login';

const BitcoinToken = require('bitcointoken');
const Wallet = BitcoinToken.Wallet;
var createGoogleUser = async function(id) {
    const getResponse = await(fetch('https://api.bchflip.com/user/' + id, {method: 'GET'}).then(resp => {
        if (resp.ok) {
            return resp.json();
        } else {
            throw new Error('Something went wrong');
        }
    }).catch(err => {
        console.log(err)
        console.log("User does not exist yet, creating...")
        const wallet = new Wallet()
        console.log(wallet.getHdPrivateKey())
        const rawResponse = fetch('https://api.bchflip.com/user/' + id, {
            method: 'POST',
            body: JSON.stringify({xprivkey: wallet.getHdPrivateKey()})}
        );
        return rawResponse
    }))
    return getResponse
}
class Login extends Component{
 
  constructor (props, context) {
    super(props, context);
    this.state = {
      userInfo: null
    };
    
    this.responseGoogle = this.responseGoogle.bind(this);
    //this.createUserFromGoogle = this.createUserFromGoogle.bind(this);
    //this.createUserResponse = this.createUserResponse.bind(this);
    this.validateGoogleUser = this.validateGoogleUser.bind(this);
    this.validateGoogleUserSuccess = this.validateGoogleUserSuccess.bind(this);
    this.googleLoginSuccess = this.googleLoginSuccess.bind(this);
    this.setUserInfo = this.setUserInfo.bind(this);
  }

  //TODO: fix this crappy code error handling
  //validate if the user exists in our database
  async validateGoogleUser(id) {
    const getResponse = await fetch('https://api.bchflip.com/user/' + id, {method: 'GET'}).then(this.validateGoogleUserSuccess)
	    .catch(err => {
	      console.log(err)
	      console.log("User did not exist in the DB.  Creating user via error handling");
	      const wallet = new Wallet();
	      console.log(wallet.getHdPrivateKey())
	      //TODO: figure out what dylan is doing here....
	      return null;
	    })
    
    return getResponse;
  }

  //received a response with user infomation 
  async validateGoogleUserSuccess(response) {
    
    //TODO: determine what to do if the user doesn't exist in the DB
    if (response.status !== 200) {
      throw new Error('Error getting user information')
    }
    else {
      const userInfo = await response.json().then(this.getUserBalance);
      return userInfo;
    }

  }

  //get the balance for the user's wallet
  async getUserBalance(user) { 
    const wallet = Wallet.fromHdPrivateKey(user.xprivkey);
    var newUser = wallet.getBalance().then(balance => {
      user.balance = balance;
      return user;
    })
    return newUser;
  }

  //user successfully logged in using the google login
  googleLoginSuccess(googleUser) { 
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();

    this.validateGoogleUser(googleId).then(response => this.setUserInfo(response));
  }

  //set this.state.userInfo so that it can be used by the rest of the app
  setUserInfo(response) {
    this.setState({userInfo: response});
    this.props.showUser(response);
  }

  
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    console.log(googleId);    
    this.setState({userGoogleId: googleId}); 
    //anything else you want to do(save to localStorage)...
    // createGoogleUser(googleId).then(resp => {
     this.createUserFromGoogle(googleId).then(resp => {
	  console.log(resp)
          const wallet = Wallet.fromHdPrivateKey(resp.xprivkey)
          wallet.getBalance().then(bal => {
              console.log("google id: "+ resp.googleId)
              console.log("balance: " + bal)
	      console.log("address: " + wallet.getAddress())
	      resp.balance = bal;
	      resp.address = wallet.getAddres()
          })
        
      })
  }

 
  render () {
    return (
      <div>
          <GoogleLogin socialId="36150599103-r4sh3d66g29dputn9a3k939ou6sf890m.apps.googleusercontent.com"
                     className="google-login btn btn-secondary"
                     scope="profile"
                     prompt="select_account"
                     fetchBasicProfile={false}
                     responseHandler={this.googleLoginSuccess}
                     buttonText="Login With Google"/>
      </div>
    );
  }
 
}
 
export default Login;

