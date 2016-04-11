import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import alt from './Alt';
import App from './components/App';
import {startSync} from './Storage'

startSync(alt, 'app');

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
