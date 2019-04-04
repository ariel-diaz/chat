import React, { Component } from 'react';
import {BrowserRouter as Router, Route ,Link} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Chat from './components/chat';

class App extends Component {
  render() {
    return (
    <Router> 
      <Route exact path="/" component={Login} /> 
      <Route exact path="/chat" component={Chat} /> 
    </Router>
    );
  }
}

export default App;
