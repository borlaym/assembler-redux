import React from 'react';
import ActionCreators from '../actions/SearchCharacterActionCreators';
import Config from '../Config';
import Store from '../stores/SearchStore';

export default React.createClass({

  TYPING_COOLDOWN_DURATION: 200,

  getInitialState() {
    return Store.getState();
  },

  componentDidMount() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(Store.getState())
  },

  typingCooldown: null,

  /**
   * When typing in the search area, sends a request to the Marvel api.
   * Waits at least TYPING_COOLDOWN_DURATION milliseconds between requests
   */
  onInputChange(event) {
    if (this.typingCooldown) {
      clearTimeout(this.typingCooldown);
    }
    this.typingCooldown = setTimeout(() => {
      ActionCreators.startSearch(this.refs.search.getDOMNode().value);
    }, this.TYPING_COOLDOWN_DURATION);
  },

  /**
   * Renders a loading indicator while we are fetching results from the server, nothing otherwise
   */
  renderLoadingIndicator() {
    if (this.state.isLoading) {
      return (<div class="loadingIndicator">Loading...</div>);
    }
    return "";
  },

  /**
   * Renders all results below the search field
   */
  renderResults() {
    return this.state.results.map((character) => {
      return (
        <div class='characterSearchResult'>
          <img src={character.thumbnail} />
          <h2>{character.name}</h2>
        </div>
      );
    });
  },

  render() {
    return (
      <div class="characterSearch">
        <input type="search" placeholder="Search for a character..." onChange={this.onInputChange} ref="search" />
        {this.renderLoadingIndicator()}
        {this.renderResults()}
      </div>
    );
  }
});