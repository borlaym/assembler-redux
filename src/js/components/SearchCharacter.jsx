import React, {PropTypes} from 'react';
import ActionCreators from '../actions/SearchCharacterActionCreators';
import Config from '../Config';
import Store from '../Store';

export default React.createClass({

  propTypes: {
    onSelect: PropTypes.func.isRequired,
  },

  TYPING_COOLDOWN_DURATION: 600,

  getInitialState() {
    return Store.getState().search.toJSON();
  },

  componentDidMount() {
    this.unsubscribe = Store.subscribe(this._onChange);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  _onChange() {
    this.setState(Store.getState().search.toJSON());
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
      Store.dispatch(ActionCreators.startSearch(this.refs.search.value));
    }, this.TYPING_COOLDOWN_DURATION);
  },

  resetSearch() {
    this.refs.search.value = '';
    Store.dispatch(ActionCreators.startSearch(""));
  },

  /**
   * Renders a loading indicator while we are fetching results from the server, nothing otherwise
   */
  renderLoadingIndicator() {
    if (this.state.isLoading) {
      return (<div className="loadingIndicator">Loading...</div>);
    }
    return "";
  },

  /**
   * Select a character, also reset search value
   */
  selectCharacter(character, event) {
    this.resetSearch();
    this.props.onSelect(character);
  },

  /**
   * Renders all results below the search field
   */
  renderResults() {
    return this.state.results.map((character) => {
      return (
        <div className='characterSearchResult' key={character.id} onClick={this.selectCharacter.bind(this, character)}>
          <img src={character.thumbnail} />
          <h2>{character.name}</h2>
        </div>
      );
    });
  },

  /**
   * Checks of you reached the team size limit
   */
  canAddNewMember() {
    return Store.getState().team.count() < Config.TEAM_MAX_SIZE;
  },

  searchPlaceholder() {
    if (this.canAddNewMember()) return "Search to add a character...";
    else return "You reached the maximum team size."
  },

  isDisabled() {
    if (!this.canAddNewMember()) return "disabled";
  },

  render() {
    return (
      <div className="characterSearch">
        <input  type="search" 
                placeholder={this.searchPlaceholder()} 
                onChange={this.onInputChange} 
                ref="search" 
                disabled={this.isDisabled()}/>
        {this.renderLoadingIndicator()}
        <div className='searchResults'>
          {this.renderResults()}
        </div>
      </div>
    );
  }
});
