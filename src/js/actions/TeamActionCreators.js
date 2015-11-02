import Constants from '../Constants';

/* eslint-disable no-console */

export default {

  /**
   * Add a character to the team!
   */
  addCharacter(character) {
    return {
      type: Constants.ActionTypes.TEAM_ADD_CHARACTER,
      character
    };
  },

  removeCharacter(character) {
  	return {
      type: Constants.ActionTypes.TEAM_REMOVE_CHARACTER,
      character
    };
  }

};
