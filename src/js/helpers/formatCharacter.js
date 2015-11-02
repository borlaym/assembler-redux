/**
 * Formats the JSON response from the Marvel API into character profiles used by the application
 */
export default function(character) {
  return {
    id: character.id,
    strenght: character.comics.available,
    description: character.description,
    name: character.name,
    thumbnail: character.thumbnail.path + '/portrait_xlarge.' + character.thumbnail.extension,
    isFighting: false
  }
}