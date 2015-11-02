import { ActionTypes } from '../Constants';
import Config from '../Config';
import URL from 'url';

/* eslint-disable no-console */

export default {

  /**
   * Initiate a search for a character on the Marvel api
   */
  startSearch(text) {

    var text = text.trim();
    var url = URL.format({
      host: Config.MARVEL_API_URI_HOST,
      pathname: Config.MARVEL_API_URI_PATHNAME + Config.MARVEL_API_URI_CHARACTERS,
      query: {
        nameStartsWith: text,
        apikey: Config.MARVEL_API_PUBLIC_KEY
      }
    });

    //Thunk!
    return function(dispatch) {

      if (text === "") {
        dispatch({
          type: ActionTypes.CHARACTER_SEARCH_CLEAR
        });
      } else {
        dispatch({
          type: ActionTypes.CHARACTER_SEARCH_STARTED
        });
      }

      return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: ActionTypes.CHARACTER_SEARCH_FINISHED,
          data: json.data.results
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.CHARACTER_SEARCH_FAILED,
          err: err
        });
      });
      
    }





  }
};
