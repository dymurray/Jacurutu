import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import Form from './Form';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
<div>
  <App />
  <br />
  <div class="row container-fluid"> 
  	<div class="card col-md-6 col-centered">
		<div class="card-body">
			<Form />
		</div>
  	</div>
  </div>
</div>,
  document.getElementById('root')
);
registerServiceWorker();
