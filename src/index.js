import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Form from './Form';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<div>
  <div class="page-header text-center">
    <h1>The tickets must flow</h1>
  </div>
  <div class="jumbotron text-center">
    <h1>Welcome to Jacurutu Ticketing!</h1>
  </div>
  <br />
  <div class="jumbotron text-center">
    <App />
  </div>
  <div class="jumbotron text-center">
    <Form />
  </div>
</div>,
  document.getElementById('root')
);
registerServiceWorker();
