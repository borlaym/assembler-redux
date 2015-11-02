import { ActionTypes } from '../Constants';
import Config from '../Config';
import URL from 'url';
import async from 'async';

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
            return self.fight.bind(self, character, villain, dispatch)
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

  // /**
  //  * Check if the two characters had a common comic
  //  */
  fight(character, villain, dispatch, callback) {

    var ids = [character.id, villain.id].join(',');

    var url = URL.format({
      host: Config.MARVEL_API_URI_HOST,
      pathname: Config.MARVEL_API_URI_PATHNAME + Config.MARVEL_API_URI_COMICS,
      query: {
        sharedAppearances: ids,
        apikey: Config.MARVEL_API_PUBLIC_KEY,
        format: 'comic',
        formatType: 'comic',
        noVariants: true
      }
    });

    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      if (json.data.total >= Config.COMICS_NEEDED_TO_WIN) {
        dispatch({
          type: ActionTypes.BATTLE_RESULTS,
          villain
        });
        return setTimeout(callback.bind(null, true), 2000);
      } else {
        dispatch({
          type: ActionTypes.BATTLE_RESULTS,
          hero: character
        });
        return setTimeout(callback, 2000);
      }
    })
    .catch((err) => console.log(err));

  },

  reset() {
    return {
      type: ActionTypes.BATTLE_RESET
    };
  }

};
