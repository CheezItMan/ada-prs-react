import React, { Component } from 'react';
import Header from './Header';
import ApiWrapper from '../lib/ApiWrapper';
import { REACT_APP_API_URL } from '../utils';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.apiWrapper = new ApiWrapper(props.token);

    this.state = {
      classes: [],
      loading: true,
    };
  }

  componentDidMount() {
    console.log(REACT_APP_API_URL)
    const USER_DETAILS_URL = `${REACT_APP_API_URL}/users/${this.props.uid}`;
    const CLASSES_LIST_URL = `${REACT_APP_API_URL}/classes`;
    console.log(USER_DETAILS_URL);

    console.log(this.props);


    this.apiWrapper.get(USER_DETAILS_URL)
      .then((response) => {
        console.log(response);

        if (response.data && response.data.user && response.data.avatar_url && response.data.name && response.data.id) {
          const avatarUrl = response.data.avatar_url;
          const username = response.data.name;
          const id = response.data.id;

          this.setState({
            user: {
              avatarUrl,
              username,
              id
            }
          });
        } else {
          this.setState({
            user: null,
          });
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401 ) // unauthorized
          this.props.logoutCallback();
      });

    this.apiWrapper.get(CLASSES_LIST_URL)
      .then((response) => {
        console.log('Class List');
        console.log(response);
        if (response.data && response.data.classes) {
          this.setState({
            classes: response.data.classes,
          });
        }
      })
      .catch((error) => {
        console.log(error.status);
        if (error.status === 401 ) // unauthorized
          this.props.logoutCallback();
      });
  }

  changeURL = (url, event) => {
    event.preventDefault();
    console.log(url);
  }


  renderClasses = () => {
    return this.state.classes.map((classroom) => {
      return (
        <h3 key={`${classroom.cohort_number}:${classroom.name}`}>
          <a href={`${REACT_APP_API_URL}/classes/${classroom.id}`} onClick={(event) => {this.changeURL(`/classes/${classroom.id}`, event)} }>
            {classroom.cohort_number} : {classroom.name} 
          </a>
        </h3>
      );
    });
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} />
        <main>
          {this.renderClasses()}
        </main>
      </div>);
  }
}

export default Dashboard;