import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import Main from './components/Main';
import Login from './components/Login'
import { getQueryParams } from './utils';


import './App.css';

class App extends Component {
  constructor() {
    super();
    const params = getQueryParams();
    this.state = { token: params.token };
  }

  isLoggedIn() {
    return !!this.state.token;
  }

  render() {
    return (
      <div className="App">
      {this.isLoggedIn() 
        ? <Main token={this.state.token } />
        : <Login />
      }
      </div>
    );
  }
}

export default App;