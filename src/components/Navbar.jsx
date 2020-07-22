import React, { Component } from 'react';
import GoogleBtn from '../GoogleBtn';

export default class Navbar extends Component {
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
              <div className="buttons">
                <GoogleBtn />
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
