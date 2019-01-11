import React from 'react';

const Header = (props) => {
  if (props.user) {
    return (
      <header className="header">
        <div className="header-left"><h1>Ada Classroom App</h1></div>
        <div className="header-right">
          <h3 className="header-username">{this.state.user.name}</h3>
          <img className="header-avatar" src={this.state.user.avatarUrl} alt={this.state.user.name} />
        </div>
      </header>
    );
  } else {
    return (
      <header className="header">
        <div className="header-left"><h1>Ada Classroom App</h1></div>
        <div className="header-right" />
      </header>
    );
  }
};


export default Header;