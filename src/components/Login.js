import React, { Component } from 'react';
import LoginButton from './LoginButton';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="Login-header">
          <h2 className="Login-title">
            Classroom App
          </h2>
          <p className="Login-intro">
            The Ada Classroom app
          </p>
        </div>
        <div className="Login-buttons">
          <LoginButton />
        </div>
      </div>
    );
  }
}

export default Login;