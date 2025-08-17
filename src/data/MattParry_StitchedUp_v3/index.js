import { characters } from './characters.js';
import { events } from './events.js';
import { locations } from './locations.js';
import { objects } from './objects.js';
import { chapters } from './chapters.js';
import { timeline } from './timeline.js';
import { mysteryElements } from './mysteryElements.js';
import { themeElements } from './themeElements.js';
import { spycraftEntries } from './spycraftEntries.js';
import { bookMetadata } from './metadata.js';
import { locationPositions, eventPositions, characterPositions, objectPositions, mapBoundaries } from './positions.js';
import { deriveRelationshipsFromCharacters } from '../../utils/relationships.js';

const relationships = deriveRelationshipsFromCharacters(characters, chapters);

export const stitchedUp = {
  bookMetadata,
  characters,
  events,
  locations,
  objects,
  relationships,
  chapters,
  timeline,
  mysteryElements,
  themeElements,
  spycraftEntries,
  locationPositions,
  eventPositions,
  characterPositions,
  objectPositions,
  mapBoundaries
};

export {
  characters,
  events,
  locations,
  objects,
  chapters,
  timeline,
  mysteryElements,
  themeElements,
  spycraftEntries,
  bookMetadata,
  locationPositions,
  eventPositions,
  characterPositions,
  objectPositions,
  mapBoundaries
};


