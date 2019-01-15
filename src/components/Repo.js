import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ApiWrapper from '../lib/ApiWrapper';

import {REACT_APP_API_URL} from '../utils';

class Repo extends Component {
  constructor(props) {
    super(props);
    console.log('props');
    console.log(props);
    this.state = {
      prs: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const { class_id } = this.props.match.params;
    const apiWrapper = new ApiWrapper(this.props.token);
    console.log(`${REACT_APP_API_URL}/classes/${class_id}/repos/${id}`);

    apiWrapper.get(`${REACT_APP_API_URL}/classes/${class_id}/repos/${id}`)
      .then((response) => {
        console.log(response);
        const { prs } = response.data;

        console.log(prs);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status === 401 ) { // unauthorized 
          this.props.logoutCallback();
        }
      });
  }

  renderClassroomRepos = () => {
    return this.state.repos.map((repo) => {
      return (
      <Link key={repo.id} to={`/repos/${repo.id}`}>
        {repo.name}
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

export default Repo;