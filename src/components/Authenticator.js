import React from 'react';
import { Redirect } from 'react-router-dom';
import { getQueryParams } from '../utils';

const Authenticator = (props) => {
  const params = getQueryParams();
  let { token } = params;
  let { uid }   = params;

  if (token) {
    props.updateUserCallback( { 
      token: params.token,
      uid, 
    });

    localStorage.setItem('jwt-token', params.token);
    localStorage.setItem('uid', uid);
  }
  else {
    token = localStorage.getItem('jwt-token');
    uid = localStorage.getItem('uid')

    if(token && token !== "undefined") {  
      this.state = {
        token,
        uid,
      };
    }
  }

  if (token) {
    props.setToken(token);
    return (
      <Redirect to="/dashboard"/>
    );
  }
  else {
    return <Redirect to="/" />
  }
}

export default Authenticator;
