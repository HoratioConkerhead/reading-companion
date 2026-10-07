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

/**
 * Fill in missing parts with empty values, derive relationships from
 * characters[].relations when a book has no relationships list, and make sure
 * every relationship has a general category.
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
