import React, { Component, Fragment } from 'react';
import Quote from './Quote';
import axios from "axios";
const config = require('../config.json');

export default class QuoteAdmin extends Component {

  state = {
    newquote: {
      "phrase": "",
      "id": ""
    },
    quotes: []
  }

  handleAddQuote = (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add quote endpoint here
    this.setState({ quotes: [...this.state.quotes, this.state.newquote] })
    this.setState({ newquote: { "phrase": "", "id": "" } });
  }

  handleUpdateQuote = (id, name) => {
    // add call to AWS API Gateway update quote endpoint here
    const quoteToUpdate = [...this.state.quotes].find(quote => quote.id === id);
    const updatedQuotes = [...this.state.quotes].filter(quote => quote.id !== id);
    quoteToUpdate.phrase = name;
    updatedQuotes.push(quoteToUpdate);
    this.setState({ quotes: updatedQuotes });
  }

  handleDeleteQuote = (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete quote endpoint here
    const updatedQuotes = [...this.state.quotes].filter(quote => quote.id !== id);
    this.setState({ quotes: updatedQuotes });
  }

  fetchQuotes = () => {
    // add call to AWS API Gateway to fetch quotes here
    // then set them in state
  }

  onAddPhraseChange = event => this.setState({ newquote: { ...this.state.newquote, "phrase": event.target.value } });
  onAddQuoteIdChange = event => this.setState({ newquote: { ...this.state.newquote, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchQuotes();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Quote Admin</h1>
            <p className="subtitle is-5">Add and remove quotes using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddQuote(this.state.newquote.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter name"
                        value={this.state.newquote.quotename}
                        onChange={this.onAddPhraseChange}
                      />
                    </div>
                    <div className="control">
                      <input
                        className="input is-medium"
                        type="text"
                        placeholder="Enter id"
                        value={this.state.newquote.id}
                        onChange={this.onAddQuoteIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add quote
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    {
                      this.state.quotes.map((quote, index) =>
                        <Quote
                          isAdmin={true}
                          handleUpdateQuote={this.handleUpdateQuote}
                          handleDeleteQuote={this.handleDeleteQuote}
                          name={quote.phrase}
                          id={quote.id}
                          key={quote.id}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
