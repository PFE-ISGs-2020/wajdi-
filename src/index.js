import React from 'react';
import ReactDOM from 'react-dom';
 
import 'font-awesome/css/font-awesome.css';
import 'font-awesome/css/font-awesome.css.map';
import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/fontawesome-free/js/all.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import 'bootstrap-social/assets/css/font-awesome.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
