import React from 'react';
import Button from 'react-toolbox/lib/button/Button';
import {GithubIcon} from '../utils';
import './LoginButton.css';

const authorizeUrl = 'https://github.com/login/oauth/authorize'
const clientId = '2ac4d884e88111f2468c'
const scope = 'read:user,write:discussion'

const LoginButton = () => {
  return (
    <Button
      raised
      accent
      href={`${authorizeUrl}?client_id=${clientId}&scope=${scope}`}
    >
      <GithubIcon />
      {' '}
      Login with GitHub
    </Button>
  );
}

export default LoginButton;