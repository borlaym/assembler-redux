import { ActionTypes } from '../Constants';
import Config from '../Config';
import URL from 'url';
import async from 'async';
import commonComic from '../helpers/commonComic';

/* eslint-disable no-console */

export default {


  /**
   * Fight a random villain
   */
  battleNextVillain(characters) {

    var self = this;

    //Get a random villain url
    var offset = Math.floor(Math.random() * 1485);
    var url = URL.format({
      host: Config.MARVEL_API_URI_HOST,
      pathname: Config.MARVEL_API_URI_PATHNAME + Config.MARVEL_API_URI_CHARACTERS,
      query: {
        limit: 1,
        offset,
        apikey: Config.MARVEL_API_PUBLIC_KEY
      }
    });

    //Thunk!
    return function(dispatch) {

      dispatch({
        type: ActionTypes.BATTLE_LOADING,
      });
      
      fetch(url)
      .then((response) => response.json())
      .then((json) => {

        var villain = json.data.results[0];

        dispatch({
          type: ActionTypes.BATTLE_START,
          villain
        });

        //Then figth with all characters
        setTimeout(() => {
          async.series(characters.map((character) => {
            return function(characterFinished) {
              commonComic(character, villain, function(won) {
                if (won) {
                  dispatch({
                    type: ActionTypes.BATTLE_RESULTS,
                    villain
                  });
                  return setTimeout(characterFinished.bind(null, true), 2000);
                } else {
                  dispatch({
                    type: ActionTypes.BATTLE_RESULTS,
                    hero: character
                  });
                  return setTimeout(characterFinished, 2000);
                }
              });
            };

          }), function(victory) {
            if (victory) return dispatch({
                type: ActionTypes.BATTLE_VICTORY,
              });
            return dispatch({
              type: ActionTypes.BATTLE_DEFEAT,
            });
          });
        }, 1500);

      })
      .catch((err) => {
        console.log(err);
      });

    }

  },

  reset() {
    return {
      type: ActionTypes.BATTLE_RESET
    };
  }

};
