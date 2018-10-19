import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login-component';

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
  }
 
  responseGoogle (googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var googleId = googleUser.getId();
    
      //anything else you want to do(save to localStorage)...
      createGoogleUser(googleId).then(resp => {
          console.log(resp)
          const wallet = Wallet.fromHdPrivateKey(resp.xprivkey)
          wallet.getBalance().then(bal => {
              console.log("google id: "+ resp.googleId)
              console.log("balance: " + bal)

          })
        
      })
  }

 
  render () {
    return (
      <div>
          <GoogleLogin socialId="36150599103-r4sh3d66g29dputn9a3k939ou6sf890m.apps.googleusercontent.com"
                     className="google-login"
                     scope="profile"
                     prompt="select_account"
                     fetchBasicProfile={false}
                     responseHandler={this.responseGoogle}
                     buttonText="Login With Google"/>
      </div>
    );
  }
 
}
 
export default Login;

