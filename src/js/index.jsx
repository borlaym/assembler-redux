import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import Assembler from './components/Assembler.jsx';
import Battle from './components/Battle.jsx';

ReactDOM.render((
	<Router>
	  <Route path="/" component={Assembler} />
	  <Route path="/battle" component={Battle} />
	</Router>
), document.getElementById('main'));