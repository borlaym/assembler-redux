import URL from 'url';
import Config from '../Config';

/**
* Check if two characters had a common comic
*/
export default function(character, villain, callback) {

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
    if (json.data.total >= Config.COMICS_NEEDED_TO_WIN) return callback(true);
    callback(false);
  })
  .catch((err) => console.log(err));

}