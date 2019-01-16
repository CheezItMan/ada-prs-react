import React, { Component } from 'react';
import Header from './Header';
import ApiWrapper from '../lib/ApiWrapper';
import { REACT_APP_API_URL } from '../utils';
import {Link} from 'react-router-dom';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.apiWrapper = new ApiWrapper(props.token);

    this.state = {
      repos: [],
      loading: true,
    };
  }

  componentDidMount() {
    const USER_DETAILS_URL = `${REACT_APP_API_URL}/users/${this.props.uid}`;
    const PR_LIST_URL = `${REACT_APP_API_URL}/pull_requests`;

    this.apiWrapper.get(USER_DETAILS_URL)
      .then((response) => {

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
        console.log(error);
        console.log(error.response.status);
        if (error.response.status === 401 ) // unauthorized
          this.props.logoutCallback();
      });

    this.apiWrapper.get(PR_LIST_URL)
      .then((response) => {
        console.log(response.data);
        if (response.data && response.data.repos) {
          this.setState({
            repos: response.data.repos,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.status);
        if (error.response.status === 401 ) // unauthorized
          this.props.logoutCallback();
      });
  }

  renderClasses = () => {
    return this.state.repos.map((repo) => {
      return (
        <tr key={repo.repo_url}>
          <td>{repo.repo_url}</td>
          <td>
            {repo.cohorts.map((cohort) => <p key={`${repo.id}-${cohort.id}`}><Link to={`/repos/${repo.id}/cohort/${cohort.id}`}>{cohort.cohort_name}</Link></p>)}
          </td>
          <td>
            <a href={`https://github.com/${repo.repo_url}`} rel="noopener noreferrer" target="_blank">
              Github
            </a>
          </td>
          <td>
            {repo.created_at}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} />
        <main>
          <table>
            <tbody>
            <tr>
              <th>Repo Name</th>
              <th>Student Submissions</th>
              <th>View on Github</th>
              <th>Created</th>
            </tr>
            {this.renderClasses()}
            </tbody>
          </table>
        </main>
      </div>);
  }
}

export default Dashboard;
