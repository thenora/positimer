import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';


class GoogleBtn extends Component {
  
  render(
  ) {
    return (
      <div>
        {(this.props.isLoggedIn && this.props.googleName) ? <p>Hiya { this.props.googleName }!</p> : null }
        {this.props.isLoggedIn ?
          <GoogleLogout
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText='Logout'
            onLogoutSuccess={this.props.logout}
            onFailure={this.handleLogoutFailure}
          >
          </GoogleLogout> : <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText='Login'
            onSuccess={this.props.login}
            onFailure={this.handleLoginFailure}
            cookiePolicy={'single_host_origin'}
            responseType='code,token'
          />
        }
        <div>
          {/* { this.state.accessToken ? <h5>Your Access Token: <br/><br/> { this.state.accessToken }</h5> : null } */}
        </div>
      </div>
    )
  }
}

export default GoogleBtn;