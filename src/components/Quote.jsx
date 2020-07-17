import React, { Component, Fragment }  from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class QuoteAdmin extends Component {

  state = {
    isEditMode: false,
    updatedphrase: this.props.name
  }

  handleQuoteEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateQuote(this.props.id, this.state.updatedphrase);
  }

  onAddPhraseChange = event => this.setState({ "updatedphrase": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleQuoteEdit} className="quote-edit-icon">
              {/* <FontAwesomeIcon icon="edit" /> */}Edit
            </a>
            <button onClick={event => this.props.handleDeleteQuote(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit phrase</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedphrase}
                onChange={this.onAddPhraseChange}
              />
              <p className="quote-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="quote-title">{ this.props.name }</p>
              <p className="quote-id">id: { this.props.id }</p>
            </div>
        }
      </div>
    )
  }
}
