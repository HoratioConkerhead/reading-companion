// Automatic book discovery and lightweight selection metadata
// We discover books by scanning for per-book metadata and index files.
// Note: We intentionally import only each book's metadata for selection (small),
// and load the full book data on demand from its index.js when selected.

// eslint-disable-next-line no-undef
const metadataContext = require.context('./', true, /metadata\.js$/);
// eslint-disable-next-line no-undef
const indexContext = require.context('./', true, /index\.js$/);
// eslint-disable-next-line no-undef
const allJsContext = require.context('./', true, /\.js$/);

const toBookKey = (p) => {
  // p looks like './BookKey/metadata.js' → return 'BookKey'
  const parts = p.split('/');
  // ['.', 'BookKey', 'metadata.js']
  return parts.length >= 3 ? parts[1] : null;
};

const discoverSelectionMetadata = () => {
  const result = {};
  metadataContext.keys().forEach((k) => {
    const bookKey = toBookKey(k);
    if (!bookKey) return;
    try {
      const mod = metadataContext(k);
      const meta = mod.bookMetadata || mod.default || {};
      if (meta && (meta.title || meta.author)) {
        result[bookKey] = {
          key: bookKey,
          title: meta.title || bookKey,
          author: meta.author || '',
          shortDescription: meta.shortDescription || ''
        };
      }
    } catch (e) {
      // Ignore broken metadata files
      // console.warn('Failed to read metadata for', bookKey, e);
    }
  });
  return result;
};

// Helper: all available book keys discovered from metadata files
export const getAvailableBookKeys = () => Object.keys(discoverSelectionMetadata());

// Helper: selection metadata per book (lightweight)
export const getAvailableBookMetadata = () => discoverSelectionMetadata();

// Load a specific book's full data from its index.js
export const loadBookData = async (bookKey) => {
  try {
    // Try to load via index.js if present
    const indexPath = `./${bookKey}/index.js`;
    let bookModule = null;
    if (indexContext.keys().includes(indexPath)) {
      bookModule = indexContext(indexPath);
    }

    // Prefer neutral export name 'book', then 'stitchedUp', then default
    if (bookModule.book) {
      return bookModule.book;
    }
    if (bookModule.stitchedUp) {
      return bookModule.stitchedUp;
    }
    if (bookModule.default) {
      return bookModule.default;
    }

    // Fallback: construct object by aggregating per-file exports within the book folder
    const constructed = {};
    const wantedKeys = new Set([
      'bookMetadata', 'characters', 'events', 'locations', 'objects', 'relationships', 'chapters', 'timeline',
      'mysteryElements', 'themeElements', 'spycraftEntries', 'locationPositions', 'eventPositions',
      'characterPositions', 'objectPositions', 'mapBoundaries'
    ]);
    const files = allJsContext.keys().filter(k => k.startsWith(`./${bookKey}/`) && !k.includes('/extractions/'));
    files.forEach((filePath) => {
      const mod = allJsContext(filePath);
      Object.keys(mod).forEach((exp) => {
        if (wantedKeys.has(exp) && constructed[exp] == null) {
          constructed[exp] = mod[exp];
        }
      });
    });
    if (!constructed.timeline) constructed.timeline = [];
    return constructed;
  } catch (error) {
    console.error(`Failed to load book "${bookKey}":`, error);
    throw error;
  }
};

// Default book key (choose preferred if present, else first discovered)
const computeDefaultBookKey = () => {
  const keys = getAvailableBookKeys().sort();
  if (keys.includes('MattParry_StitchedUp_v2')) return 'MattParry_StitchedUp_v2';
  return keys[0] || '';
};

export const defaultBookKey = computeDefaultBookKey();