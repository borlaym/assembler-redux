import React from 'react';
import TeamActionCreators from '../actions/TeamActionCreators';

export default React.createClass({

  removeCharacter() {
    TeamActionCreators.removeCharacter(this.props.character);
  },

  render() {
    return (
      <div className='character'>
        <img src={this.props.character.thumbnail} />
        <span onClick={this.removeCharacter}>&times;</span>
      </div>
    );
  }
});