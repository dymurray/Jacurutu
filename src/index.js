import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Form from './Form';
import TicketProps from './TicketProps';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div><App /><Form /><TicketProps /></div>, document.getElementById('root'));
//ReactDOM.render(<TicketType />, document.getElementById('root'));
registerServiceWorker();
