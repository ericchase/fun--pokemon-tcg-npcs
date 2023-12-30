/**
 * @typedef Club
 * @property {string} name
 */

/**
 * @typedef Character
 * @property {string} club
 * @property {string} name
 * @property {string} pack
 */

/**
 * @typedef Data
 * @property {Club[]} clubs
 * @property {Character[]} characters
 */

/** @param {string} query */
function getTemplate(query) {
  const el = document.querySelector(query);
  if (el instanceof HTMLTemplateElement) {
    return el;
  }
  throw `"${query}" not HTMLTemplateElement`;
}

const templateClub = getTemplate('#template-club');
const templateCharacter = getTemplate('#template-character');

async function main() {
  const response = await fetch('./data.json');
  const data = /** @type Data */ (await response.json());
  for (const club of data.clubs) {
    addClubElement(club);
  }
  for (const character of data.characters) {
    addCharacter(character);
  }
}
main();

const mapClubNameToCharacterList = /** @type {Map<string,HTMLDivElement>}*/ (new Map());

/** @param {Club} club */
function addClubElement(club) {
  const clone = /** @type {DocumentFragment} */ (templateClub.content.cloneNode(true));
  const imgClub = /** @type {HTMLImageElement} */ (clone.querySelector('.club-image'));
  imgClub.src = `./Club${club.name}.png`;
  const divCharacterList = /** @type {HTMLDivElement} */ (clone.querySelector('.character-list'));
  mapClubNameToCharacterList.set(club.name, divCharacterList);
  document.body.append(clone);
}

/** @param {Character} character */
function addCharacter(character) {
  const clone = /** @type {DocumentFragment} */ (templateCharacter.content.cloneNode(true));
  const imgCharacter = /** @type {HTMLImageElement} */ (clone.querySelector('.character-image'));
  imgCharacter.src = `./Club${character.club}_${character.name}.png`;
  const divNamePack = /** @type {HTMLDivElement} */ (clone.querySelector('.name-pack'));
  divNamePack.textContent = `${character.name} -- ${character.pack} Pack`;
  const divCharacterList = mapClubNameToCharacterList.get(character.club);
  if (divCharacterList) {
    divCharacterList.append(clone);
  }
}
