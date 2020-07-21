import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';


class GoogleBtn extends Component {
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

  render(
  ) {
    return (
      <div>
        {this.state.isLoggedIn ?
          <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={this.logout}
            onFailure={this.handleLogoutFailure}
          >
          </GoogleLogout> : <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText='Login'
            onSuccess={this.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
          />
        }
        <div>
          {this.state.googleName ? <p>Hiya { this.state.googleName }!</p> : null }
          {/* { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null } */}
        </div>
      </div>
    )
  }
}

export default GoogleBtn;