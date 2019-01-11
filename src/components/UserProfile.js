import React, { Component } from 'react';
import './UserProfile.css';

const UserProfile = (props) =>  {
    return (
      <div className="user-profile">
        <img src={props.avatar} alt="User profile image" />
        <p>{props.email}</p>
      </div>
    );
}

export default UserProfile;