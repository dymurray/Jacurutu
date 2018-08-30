import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TicketType from './TicketType';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div><App /><TicketType /></div>, document.getElementById('root'));
//ReactDOM.render(<TicketType />, document.getElementById('root'));
registerServiceWorker();
