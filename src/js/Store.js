import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import BattleReducer from './reducers/Battle';
import SearchReducer from './reducers/Search';
import TeamReducer from './reducers/Team';

let reducer = combineReducers({ 
	battle: BattleReducer,
	search: SearchReducer,
	team: TeamReducer
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore)

export default createStoreWithMiddleware(reducer);