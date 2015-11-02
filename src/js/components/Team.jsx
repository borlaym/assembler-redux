import React from 'react';
import Character from './Character.jsx';
import Config from '../Config';
import { Link } from 'react-router';
import TeamActionCreators from '../actions/TeamActionCreators';

export default React.createClass({

  getInitialState() {
    return {
      team: this.props.store.getState().team.toArray()
    };
  },

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(this._onChange);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  _onChange() {
    this.setState({
      team: this.props.store.getState().team.toArray()
    });
  },

  removeCharacter(character) {
    this.props.store.dispatch(TeamActionCreators.removeCharacter(character));
  },

  renderTeam() {
    return this.state.team.map((character) => {
      return (<Character character={character} key={character.id} onRemove={this.removeCharacter.bind(this, character)} />);
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
