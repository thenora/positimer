import React, { Component, Fragment } from "react";
import Quote from "./Quote";
import axios from "axios";
import { random } from "lodash";
const config = require("../config.json");

export default class ShowQuote extends Component {
  state = {
    quotes: [],
    randomQuote: null,
    selectedQuoteIndex: null
  };

  

  // TODO DRY up code and create a wrapper
  fetchQuotes = async () => {
    try {
      const res = await axios.get(`${config.api.invokeUrl}/quotes`);
      this.setState({ quotes: res.data });
      console.log("line 35 this.state.quotes: " + this.state.quotes);
      const index = random(0, this.state.quotes.length - 1);
      this.setState({ selectedQuoteIndex: index});
      console.log("l37 index " + index);
      this.setState({ randomQuote: this.state.quotes[index]});
      console.log("l39 this.state.randomQuote " + this.state.randomQuote);
      console.log(this.state.randomQuote.id + " " + this.state.randomQuote.phrase );


    } catch (err) {
      console.log(`Oops! There was an error: ${err}`);
    }
  };

  // TODO move things out of fetch quotes
  // selectQuoteIndex() {
  //   if (!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)) {
  //     return undefined;
  //   }
  //   return this.state.quotes[this.state.selectedQuoteIndex];
  // }

  componentDidMount = () => {
    this.fetchQuotes();
  };

  render() {
    console.log("******")
    console.log(this.state)


    return (
      <Fragment>
        <section className="section">
          <div className="container">
            {/* <p className="subtitle is-5">Get motivated:</p> */}

            <div className="tile is-ancestor">
              <div className="tile is-parent is-vertical">
                {/* TODO This was how I did it in Quotes */}
              {/* {this.state.quotes && this.state.quotes.length > 0 ? (
                  this.state.quotes.map((quote) => (
                    <Quote quote={quote.phrase} id={quote.id} key={quote.id} />
                  )) */}

                {/* {this.state.randomQuote !== null && this.state.randomQuote.quote} */}
                {this.state.randomQuote ? (
                  // <p>"Quotes go here!"</p>
                  // <div>{ this.state.randomQuote.phrase }</div>
                  // TODO - why doesn't this work?
                  <Quote quote={this.state.randomQuote.phrase} id={this.state.randomQuote.id} key={this.state.randomQuote.id} />
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
