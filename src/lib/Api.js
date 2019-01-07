import axios from 'axios';

class ApiWrapper {
  constructor(token) {
    this.token = token;
  }

  get(url, options) {
    return axios.get(url, { 
      ...options, 
      headers: { authorization: this.token }
    });
  }

  post(url, data, options) {
    return axios.post(url, data, {
      ...options,
      headers: { authorization: this.token}
    });
  } 
}

export default ApiWrapper;