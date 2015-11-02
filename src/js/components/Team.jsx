import React from 'react';
import Character from './Character.jsx';
import Store from '../Store';
import Config from '../Config';
import { Link } from 'react-router';

export default React.createClass({

  getInitialState() {
    return Store.getState();
  },

  componentDidMount() {
    this.unsubscribe = Store.subscribe(this._onChange);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  _onChange() {
    this.setState(Store.getState())
  },

  renderTeam() {
    return this.state.team.map(function(character) {
      return (<Character character={character} key={character.id} />);
    });
  },

  render() {
    return (
      <div className="team">
        {this.renderTeam()}
      </div>
    );
  }
});
