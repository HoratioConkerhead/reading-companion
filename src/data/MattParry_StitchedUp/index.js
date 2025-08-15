// MattParry_StitchedUp data structure
import { characters } from './characters.js';
import { events } from './events.js';
import { locations } from './locations.js';
import { objects } from './objects.js';
import { relationships } from './relationships.js';
import { chapters } from './chapters.js';
import { timeline } from './timeline.js';
import { mysteryElements } from './mysteryElements.js';
import { themeElements } from './themeElements.js';
import { spycraftEntries } from './spycraftEntries.js';
import { bookMetadata } from './metadata.js';
import { locationPositions, eventPositions, characterPositions, objectPositions, mapBoundaries } from './positions.js';

// Export the complete book data structure
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

// Export individual modules for direct access if needed
export {
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
  bookMetadata,
  locationPositions,
  eventPositions,
  characterPositions,
  objectPositions,
  mapBoundaries
};
