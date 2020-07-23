import React, { Component, Fragment } from "react";
import Quote from "./Quote";
import axios from "axios";
const config = require("../config.json");

export default class QuoteAdmin extends Component {
  state = {
    maxID: null,
    newquote: {
      phrase: "",
      id: "",
    },
    quotes: [],
  };

  handleAddQuote = async (id, event) => {
    event.preventDefault();

    try {
      const params = {
        id: id,
        phrase: this.state.newquote.phrase,
      };
      await axios.post(`${config.api.invokeUrl}/quotes/${id}`, params);
      this.setState({ newquote: { phrase: "", id: "" } });
      this.fetchQuotes();
    } catch (err) {
      console.log(`Oops! There was an error: ${err}`);
    }
  };

  // handleUpdateQuote = async (id, quote) => {
  //   // add call to AWS API Gateway update quote endpoint here

  //   try {
  //     const params = {
  //       id: id,
  //       phrase: quote,
  //     };
  //     await axios.patch(`${config.api.invokeUrl}/quotes/${id}`, params);
  //     const quoteToUpdate = [...this.state.quotes].find(
  //       (quote) => quote.id === id
  //     );
  //     const updatedQuotes = [...this.state.quotes].filter(
  //       (quote) => quote.id !== id
  //     );
  //     quoteToUpdate.phrase = quote;
  //     updatedQuotes.push(quoteToUpdate);
  //     this.setState({ quotes: updatedQuotes });
  //   } catch (err) {
  //     console.log(`Oops! There was an error updating the quote: ${err}`);
  //   }
  // };

  handleDeleteQuote = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete quote endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/quotes/${id}`);
      const updatedQuotes = [...this.state.quotes].filter(
        (quote) => quote.id !== id
      );
      this.setState({ quotes: updatedQuotes });
    } catch (err) {
      console.log(`Oops! We couldn't delete: ${err}`);
    }
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

  // findMaxID = () => {
  //   Math.max.apply(Math, this.state.quotes.map(function(quote) { return}
  //     if (parseInt(quote.id, 10))
  //   ));
  // };

  onAddPhraseChange = (event) =>
    this.setState({
      newquote: { ...this.state.newquote, phrase: event.target.value },
    });
  onAddQuoteIdChange = (event) =>
    this.setState({
      newquote: { ...this.state.newquote, id: event.target.value },
    });

  componentDidMount = () => {
    this.fetchQuotes();
  };

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column"></div>
              <div className="column">
                <h1 className="title">Quote Admin</h1>
                <form
                  onSubmit={(event) =>
                    this.handleAddQuote(this.state.newquote.id, event)
                  }
                >
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter quote"
                        value={this.state.newquote.phrase}
                        onChange={this.onAddPhraseChange}
                      />
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter author"
                        value={this.state.newquote.id}
                        onChange={this.onAddQuoteIdChange}
                      />
                      <button
                        type="submit"
                        className="button is-primary is-medium"
                      >
                        Add quote
                      </button>
                    </div>
                  </div>
                </form>
                <div className="tile is-ancestor">
                  <div className="tile is-parent is-vertical">
                    {this.state.quotes.map((quote) => (
                      <Quote
                        isAdmin={true}
                        // handleUpdateQuote={this.handleUpdateQuote}
                        handleDeleteQuote={this.handleDeleteQuote}
                        quote={quote.phrase}
                        id={quote.id}
                        key={quote.id}
                      />
                    ))}
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
