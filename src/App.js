import React, { Component } from 'react';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';
import Authenticator from './components/Authenticator';
import Classroom from './components/Classroom';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const token = localStorage.getItem('jwt-token');
    const uid = localStorage.getItem('uid');

    this.state = {
      token,
      uid,
    };

  }

  isLoggedIn() {
    return !!this.state.token;
  }

  updateUserState = (userState) => {
    this.setState(userState);
  }

  logout = () => {
    console.log("logging out");
    this.setState({
      token: null,
      uid: null,
    });
    localStorage.clear();
    // TODO
    // do API call to clear the permissions
  }

  renderComponentIfAuthenticated = (Component, props) => {
    if (this.isLoggedIn()) {
      return ( <Component {...props} />);
    }
    else {
      return (<Redirect to="/" />)
    }
  }

  setToken = (token) => {
    this.setState({
      token,
    });
  }

  render() {
    const standardProps = {
      token: this.state.token,
      uid: this.state.uid, 
      logoutCallback: this.logout,
    }
    return (
      <div className="App">
      <Router>
        <div>
        <Route exact path="/" render={() => {         
          return this.isLoggedIn() ? <Redirect to="/dashboard" /> : <LoginScreen />
        }} />

        <Route path="/auth" render={() => {
          console.log('in auth path');
          return (
            <Authenticator 
              updateUserCallback={this.updateUserState} 
              setToken={this.setToken} 
            />
          );
        }} />

        <Route path="/dashboard" render={(props) => { 
          return this.renderComponentIfAuthenticated(Dashboard, {...props, ...standardProps});
          }} 
        />
        <Route exact path="/classes/:id" render={(props) => {
          return this.renderComponentIfAuthenticated(Classroom, {...props, ...standardProps});
        }}
        />
        <Route exact path="/classes/:class_id/repos/:id" render={(props) => {
                    return this.renderComponentIfAuthenticated(Classroom, {...props, ...standardProps});
        }}
        />
        </div>
      </Router>
      </div>
    );
  }
}

// Using withRouter so the App component gets access to the current
// route.
export default App;
