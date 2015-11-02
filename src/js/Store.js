import { combineReducers, createStore } from 'redux';
import BattleReducer from './reducers/Battle';
import SearchReducer from './reducers/Search';
import TeamReducer from './reducers/Team';

let reducer = combineReducers({ 
	battle: BattleReducer,
	search: SearchReducer,
	team: TeamReducer
});
export default createStore(reducer);