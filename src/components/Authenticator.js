import React from 'react';
import { Redirect } from 'react-router-dom';
import { getQueryParams } from '../utils';

const Authenticator = (props) => {
  const params = getQueryParams();
  const { token } = params;
  console.log('In Authenticator');

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