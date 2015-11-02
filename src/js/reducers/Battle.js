import { ActionTypes, BattleStates } from '../Constants';
import formatCharacter from '../helpers/formatCharacter';
import Immutable from 'immutable';

const defaultState = Immutable.Map({
  villain: null,
  state: BattleStates.NO_BATTLE
});

export default function(state = defaultState, action) {
  
    switch (action.type) {
    case ActionTypes.BATTLE_RESET:
      return state.set('state', BattleStates.NO_BATTLE);
    case ActionTypes.BATTLE_LOADING:
      return state.set('state', BattleStates.LOADING);
    case ActionTypes.BATTLE_START:
      return state.merge({
        villain: formatCharacter(action.villain),
        state: BattleStates.BATTLE
      });
    case ActionTypes.BATTLE_RESULTS:
      if (action.villain) return state.setIn(['villain', 'defeated'], true);
      else return state;
    case ActionTypes.BATTLE_VICTORY:
      return state.set('state', BattleStates.NO_BATTLE);
    case ActionTypes.BATTLE_DEFEAT:
      return state.set('state', BattleStates.DEFEAT);
    default:
      return state;
    }

}