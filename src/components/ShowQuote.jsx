import React, { Component, Fragment } from "react";
import Quote from "./Quote";
import axios from "axios";
import { random } from "lodash";
const config = require("../config.json");

export default class ShowQuote extends Component {
  state = {
    quotes: [],
    randomQuote: null,
    selectedQuoteIndex: null,
  };

  // TODO DRY up code and create a wrapper
  fetchQuotes = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/quotes`);
      this.setState({ quotes: res.data });
      console.log("line 35 this.state.quotes: " + this.state.quotes);
      const index = random(0, this.state.quotes.length - 1);
      this.setState({ selectedQuoteIndex: index });
      console.log("l37 index " + index);
      this.setState({ randomQuote: this.state.quotes[index] });
      console.log("l39 this.state.randomQuote " + this.state.randomQuote);
      console.log(
        this.state.randomQuote.id + " " + this.state.randomQuote.phrase
      );
    } catch (err) {
      console.log(`Oops! There was an error: ${err}`);
    }
  };

  componentDidMount = () => {
    this.fetchQuotes();
  };

  render() {
    console.log("******");
    console.log(this.state);

    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <div className="tile is-ancestor">
              <div className="tile is-parent is-vertical">
                {this.state.randomQuote && (
                  <Quote
                    quote={this.state.randomQuote.phrase}
                    id={this.state.randomQuote.id}
                    key={this.state.randomQuote.id}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
