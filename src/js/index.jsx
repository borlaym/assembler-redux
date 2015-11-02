import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'
import Assembler from './components/Assembler.jsx';
import Battle from './components/Battle.jsx'

    // <Route path="/battle" component={Battle} />
ReactDOM.render((
  <Router>
    <Route path="/" component={Assembler} />
  </Router>
), document.getElementById('main'));