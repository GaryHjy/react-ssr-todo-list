import React, { Component } from 'react';
import './index.less';

class LoginCard extends Component {
  render() {
    return (
      <div className="login-card">
        <h3 className="login-card__title">{this.props.title}</h3>
        { this.props.children }
      </div>
    );
  }
}

export default LoginCard;