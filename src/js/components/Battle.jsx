import React from 'react';
import Store from '../Store';
import { Link } from 'react-router';
import Config from '../Config';
import { BattleStates } from '../Constants';
import Team from './Team.jsx';
import Character from './Character.jsx';
import BattleActionCreators from '../actions/BattleActionCreators';

export default React.createClass({
  getInitialState() {
    var state = Store.getState();
    return {
      team: state.team.toArray(),
      battle: state.battle.toJS()
    }
  },

  componentDidMount() {
    this.unsubscribe = Store.subscribe(this._onChange);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  _onChange() {
    var state = Store.getState();
    this.setState({
      team: state.team.toArray(),
      battle: state.battle.toJS()
    });
  },


  /**
   * Determines if you're able to fight
   */
  canFight() {
    return this.state.team.length === Config.TEAM_MAX_SIZE;
  },

  /**
   * Render a "Team not available" view and a link to the Assembler
   */
  renderNoTeam() {
    return (
      <div>
        <h1>Save the Earth</h1>
        <p>You can´t fight without a team!</p>
        <Link to="">Avengers Assemble!</Link>
      </div>
    );
  },

  /**
   * Go to the next fight
   */
  nextFight() {
    Store.dispatch(BattleActionCreators.battleNextVillain(this.state.team));
  },

  /**
   * Renders either a Next Fight button or the villain you face
   */
  renderVillain() {
    if (this.state.battle.state === BattleStates.NO_BATTLE) return (
      <button className='btn' onClick={this.nextFight}>Next Fight</button>
    );
    else if (this.state.battle.state === BattleStates.LOADING) return (
      <p>Loading...</p>
    )
    else return (
      <div className="villain">
        <p className='vs'>- VS -</p>
        <Character character={this.state.battle.villain} />
      </div>
    );
  },

  toAssembler() {
    Store.dispatch(BattleActionCreators.reset());
    window.location.hash = "";
  },

  renderDefeat() {
    return (
      <div>
        <h1>Defeat!</h1>
        <p>You´ll need more powerful heroes next time.</p>
        <button className="btn" onClick={this.toAssembler}>Avengers Assemble!</button>
      </div>
    )
  },

  render() {
    if (this.state.battle.state === BattleStates.DEFEAT) return this.renderDefeat();
    if (!this.canFight()) return this.renderNoTeam();
    return (
      <div className="battle">
        <h1>Save the Earth</h1>
        <p>The rules are pretty simple. You´ll face random enemies one after another, and you can beat them if any of your 
        characters have appeared in the same comic as them. See how many you can defeat!</p>
        <Team characters={this.state.team.characters} store={Store} />
        {this.renderVillain()}
      </div>
    );
  }
});
