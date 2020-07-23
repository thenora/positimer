import React, { Component, Fragment } from "react";
import Quote from "./Quote";
import axios from "axios";
import Pagination from 'bulma-pagination-react';
const config = require("../config.json");

export default class Quotes extends Component {
  state = {
    newquote: null,
    quotes: [],
  };

  // TODO DRY up code and create a wrapper
  fetchQuotes = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/quotes`);
      this.setState({ quotes: res.data });
    } catch (err) {
      console.log(`Oops! There was an error: ${err}`);
    }
  };

  componentDidMount = () => {
    this.fetchQuotes();
  };

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1 className="title">Words to Motivate</h1>
            <div className="columns">
              <div className="column"></div>
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-parent is-vertical">
                    {this.state.quotes && this.state.quotes.length > 0 ? (
                      this.state.quotes.map((quote) => (
                        <Quote
                          quote={quote.phrase}
                          id={quote.id}
                          key={quote.id}
                        />
                      ))
                    ) : (
                      <div className="tile notification is-warning">
                        No quotes available...
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="column"></div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
