import React, { Component } from 'react';
import GoogleBtn from '../GoogleBtn';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      accessToken: '',
      googleName: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login(response) {
    if (response.accessToken) {
      console.log(response)
      this.setState(state => ({
        isLoggedIn: true,
        accessToken: response.accessToken,
        googleName: response.profileObj.givenName
      }));
    }
  }

  logout(response) {
    this.setState(state => ({
      isLoggedIn: false,
      accessToken: ''
    }));
  }

  handleLoginFailure(response) {
    alert('Failed to log in')
  }

  handleLogoutFailure(response) {
    alert('Failed to log out')
  }


  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="picon.png" alt="positimer icon" />
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Positimer
            </a>
            <a href="/about" className="navbar-item">
              About
            </a>
            <a href="/quotes" className="navbar-item">
              Quotes
            </a>
            <a href="/admin" className="navbar-item">
              Edit
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
                <GoogleBtn
                isLoggedIn={this.state.isLoggedIn}
                googleName={this.state.googleName}
                login={this.login}
                logout={this.logout}
                accessToken={this.state.accessToken}
                />
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
