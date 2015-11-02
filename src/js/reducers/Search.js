import { ActionTypes } from '../Constants';
import _ from 'lodash';
import Immutable from 'immutable';
import formatCharacter from '../helpers/formatCharacter';

// data storage
const defaultState = Immutable.Map({
  isLoading: false,
  error: null,
  results: []
});

export default function(state = defaultState, action) {

  switch (action.type) {
  case ActionTypes.CHARACTER_SEARCH_CLEAR:
    return state.merge({
      isLoading: false,
      results: []
    });
  case ActionTypes.CHARACTER_SEARCH_STARTED:
    return state.merge({
      isLoading: true,
      results: []
    });
  case ActionTypes.CHARACTER_SEARCH_FINISHED:
  case ActionTypes.CHARACTER_SEARCH_FAILED:
    return state.merge({
      isLoading: false,
      results: action.data.map( (data) => formatCharacter(data))
    });
  default:
    return state;
  }

}