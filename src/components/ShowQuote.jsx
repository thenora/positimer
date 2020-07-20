import React, { Component, Fragment } from "react";
import Quote from "./Quote";
import axios from "axios";
import { random } from "lodash";
const config = require("../config.json");

export default class ShowQuote extends Component {
  state = {
    newquote: null,
    quotes: [],
    selectedQuoteIndex: null,
    // randomQuote: null,
  };

  // TODO DRY up code and create a wrapper
  fetchQuotes = async () => {
    // add call to AWS API Gateway to fetch quotes here
    // then set them in state

    try {
      const res = await axios.get(`${config.api.invokeUrl}/quotes`);
      this.setState({ quotes: res.data });
      console.log("line 21 this.state.quotes:" + this.state.quotes);
      // this.setState({ selectedQuoteIndex: })
    } catch (err) {
      console.log(`Oops! There was an error: ${err}`);
    }
  };

  randomQuoteHandler = () => {
    const randNumb = Math.floor(Math.random() * this.state.quotes.length);
    const randomQuote = this.state.quotes[randNumb];

    this.setState({
      randomQuote,
    });
  };

  // selectQuoteIndex() {
  //   if (!this.state.quotes.length || !Number.isInteger(selectedQuoteIndex)) {
  //     return undefined;
  //   }
  //   return quotes[selected];
  // }

  componentDidMount = () => {
    this.fetchQuotes();
  };

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            {/* <p className="subtitle is-5">Get motivated:</p> */}

            <div className="tile is-ancestor">
              <div className="tile is-parent is-vertical">
                {/* {this.state.randomQuote !== null && this.state.randomQuote.quote} */}
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
