import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ApiWrapper from '../lib/ApiWrapper';

import {REACT_APP_API_URL} from '../utils';

class Classroom extends Component {
  constructor(props) {
    super(props);
    console.log('props');
    console.log(props);
    this.state = {
      repos: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const apiWrapper = new ApiWrapper(this.props.token);
    console.log(`${REACT_APP_API_URL}/classes/${id}/repos`);

    apiWrapper.get(`${REACT_APP_API_URL}/classes/${id}/repos`)
      .then((response) => {
        console.log(response);
        const { repos } = response.data;

        console.log(repos);

        this.setState({
          repos,
        });
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401 ) { // unauthorized 
          this.props.logoutCallback();
        }
      });
  }

  renderClassroomRepos = () => {
    const { id } = this.props.match.params;
    return this.state.repos.map((repo) => {
      return (
      <Link key={repo.id} to={`/classrooms/${id}/repos/${repo.id}`}>
        {repo.repo_url.split('/')[1]}
      </Link>
      );
    });
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <h3>Classroom Details</h3>
        <ul className="classroom-repos">
          {this.renderClassroomRepos()}
        </ul>
     </div>
    )
  }
}

export default Classroom;