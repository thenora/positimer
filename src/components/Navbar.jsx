import React, { Component } from "react";
import GoogleBtn from "../GoogleBtn";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: localStorage.getItem("isLoggedIn") || false,
      accessToken: "",
      googleName: localStorage.getItem("googleName") || "",
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login(response) {
    if (response.accessToken) {
      console.log(response);
      this.setState((state) => ({
        isLoggedIn: true,
        accessToken: response.accessToken,
        googleName: response.profileObj.givenName,
      }));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("googleName", response.profileObj.givenName);
    }
  }

  logout(response) {
    this.setState((state) => ({
      isLoggedIn: false,
      accessToken: "",
    }));
    localStorage.clear();
  }

  handleLoginFailure(response) {
    alert("Failed to log in");
  }

  handleLogoutFailure(response) {
    alert("Failed to log out");
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
            {this.state.isLoggedIn && (
              <a href="/quotes" className="navbar-item">
                Quotes
              </a>
            )}
            {/* TODO create user types and make this user an admin, not just be named Nora */}
            {this.state.isLoggedIn && this.state.googleName === "Nora" && (
              <a href="/admin" className="navbar-item">
                Edit
              </a>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.state.isLoggedIn && this.state.googleName &&
                <p>Hiya {this.state.googleName}!</p>
              }
            </div>
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
    );
  }
}
