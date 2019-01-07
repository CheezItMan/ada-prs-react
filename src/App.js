import React, { Component } from 'react';
import Main from './components/Main';
import Login from './components/Login';
import Authenticator from './components/Authenticator';
import { BrowserRouter as Router, Route } from "react-router-dom";
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

  setToken = (token) => {
    this.setState({
      token,
    });
  }

  logout = () => {
    this.setState({
      token: '',
    });
    // TODO
    // do API call to clear the permissions
  }

  render() {
    return (
      <div className="App">
      <header>
        {this.isLoggedIn() ? <h1>Welcome</h1> : <Login />  }
      </header>
      <Router>
        <div>
        <Route exact path="/" render={() => {
          return <h2>Please Log in Above</h2>
        }} />

        <Route path="/auth" render={() => {
          console.log('in auth path');
          return (
            <Authenticator setToken={this.setToken} />
          );
        }} />

        <Route path="/dashboard" render={() => <Main token={this.state.token} />} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
