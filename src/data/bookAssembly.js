// Turning a book folder's exports into the book object the app uses.
// Shared by the app's loader (src/data/index.js) and the Node data scripts,
// so both see books the same way. No bundler-specific code in here.
import { deriveRelationshipsFromCharacters, toRelationshipCategory } from '../utils/relationships.js';

export const BOOK_ARRAY_KEYS = [
  'characters', 'events', 'locations', 'objects', 'relationships', 'chapters', 'timeline',
  'mysteryElements', 'themeElements', 'spycraftEntries'
];
export const BOOK_OBJECT_KEYS = ['locationPositions', 'eventPositions', 'characterPositions', 'objectPositions'];
const BOOK_EXPORTS = new Set(['bookMetadata', 'mapBoundaries', ...BOOK_ARRAY_KEYS, ...BOOK_OBJECT_KEYS]);

// Books describe mysteries with two vocabularies (firstMentioned/revealedInChapter
// and introducedInChapter/resolvedInChapter); give every mystery both
const normalizeMystery = (mystery) => ({
  ...mystery,
  introducedInChapter: mystery.introducedInChapter ?? mystery.firstMentioned ?? null,
  firstMentioned: mystery.firstMentioned ?? mystery.introducedInChapter ?? null,
  revealedInChapter: mystery.revealedInChapter ?? mystery.resolvedInChapter ?? null
});

// Books store some fields as text or as lists, and objects' links under two names;
// give the UI one shape
const toList = (value) => (Array.isArray(value) ? value : (value ? [value] : []));
const normalizeLocation = (location) => ({ ...location, significance: toList(location.significance) });
const normalizeObject = (object) => ({
  ...object,
  significance: toList(object.significance),
  related_events: object.related_events ?? object.events ?? [],
  related_characters: object.related_characters ?? object.characters ?? []
});

/**
 * Fill in missing parts with empty values, derive relationships from
 * characters[].relations when a book has no relationships list, make sure
 * every relationship has a general category, and normalise field shapes that
 * differ between books (mysteries, locations, objects).
 */
export const normalizeBook = (book = {}) => {
  const result = { ...book, bookMetadata: book.bookMetadata || {} };
  BOOK_ARRAY_KEYS.forEach((key) => {
    if (!Array.isArray(result[key])) result[key] = [];
  });
  BOOK_OBJECT_KEYS.forEach((key) => {
    if (!result[key] || typeof result[key] !== 'object') result[key] = {};
  });
  if (result.mapBoundaries === undefined) result.mapBoundaries = null;

  const hasCharacterRelations = result.characters.some(c => Array.isArray(c.relations) && c.relations.length > 0);
  if (result.relationships.length === 0 && hasCharacterRelations) {
    result.relationships = deriveRelationshipsFromCharacters(result.characters, result.chapters);
  }
  result.relationships = result.relationships.map(rel => (
    rel.category ? rel : { ...rel, category: toRelationshipCategory(rel.type) }
  ));
  result.mysteryElements = result.mysteryElements.map(normalizeMystery);
  result.locations = result.locations.map(normalizeLocation);
  result.objects = result.objects.map(normalizeObject);
  return result;
};

/**
 * Build a book from a book folder's module namespaces: either its index.js
 * (exporting `book` or a default), or each of its per-file modules.
 */
export const assembleBook = ({ indexModule = null, fileModules = [] }) => {
  const consolidated = indexModule && (indexModule.book || indexModule.default);
  if (consolidated) return normalizeBook(consolidated);

  const book = {};
  fileModules.forEach((mod) => {
    Object.keys(mod).forEach((name) => {
      if (BOOK_EXPORTS.has(name) && book[name] == null) book[name] = mod[name];
    });
  });
  return normalizeBook(book);
};
