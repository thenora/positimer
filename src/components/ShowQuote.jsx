import React, { Component, Fragment } from "react";
import Quote from "./Quote";
import axios from "axios";
const config = require("../config.json");

export default class ShowQuote extends Component {
  state = {
    newquote: null,
    quotes: [],
  };

  // TODO DRY up code and create a wrapper
  fetchQuotes = async () => {
    // add call to AWS API Gateway to fetch quotes here
    // then set them in state

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
            <h1>Words of Inspiration</h1>
            {/* <p className="subtitle is-5">Get motivated:</p> */}
            <br />

            <div className="tile is-ancestor">
              <div className="tile is-parent is-vertical">
                {this.state.quotes && this.state.quotes.length > 0 ? (
                  this.state.quotes.map((quote) => (
                    <Quote quote={quote.phrase} id={quote.id} key={quote.id} />
                  ))
                ) : (
                  <div className="tile notification is-warning">
                    No quotes available...
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
