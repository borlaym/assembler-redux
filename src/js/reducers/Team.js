import { ActionTypes } from '../Constants';
import Immutable from 'immutable';

export default function(state = Immutable.Set(), action) {

  switch (action.type) {
  case ActionTypes.TEAM_ADD_CHARACTER:
    return state.add(action.character);
  case ActionTypes.TEAM_REMOVE_CHARACTER:
    return state.remove(action.character);
  case ActionTypes.BATTLE_START:
    return Immutable.Set(state.map((character) => {
      character.isFighting = true;
      return character;
    }));
  case ActionTypes.BATTLE_RESULTS:
    if (action.hero) return Immutable.Set(state.map((character) => {
      if (character.id === action.hero.id) {
        character.defeated = true;
        character.isFighting = false;
      } 
      return character;
    }));
  case ActionTypes.BATTLE_VICTORY:
    return state.map((character) => character.merge({
      isFighting: false,
      defeated: false
    }));
  case ActionTypes.BATTLE_DEFEAT:
    return Immutable.Set();
  default:
    return state;
  }

}



