// Automatic book discovery and loading.
// Every folder here with a metadata.js is a book. Metadata is loaded eagerly
// (it is small and feeds the book picker); the rest of a book's data is loaded
// on demand when it is selected, as its own chunk.
//
// Book metadata flags:
// - draft: true      hidden from the book picker unless the URL has ?drafts
//                    (for books still being written, e.g. an empty scaffold)
// - isDefault: true  the book shown to first-time visitors
import { assembleBook } from './bookAssembly.js';

const metadataModules = import.meta.glob('./*/metadata.js', { eager: true });
const indexLoaders = import.meta.glob('./*/index.js');
// Per-file modules for books without an index.js (metadata.js is already loaded above)
const bookFileLoaders = import.meta.glob(['./*/*.js', '!./*/index.js', '!./*/metadata.js']);

const showDrafts = typeof window !== 'undefined'
  && new URLSearchParams(window.location.search).has('drafts');

const toBookKey = (path) => path.split('/')[1]; // './BookKey/metadata.js' -> 'BookKey'

// Discovery is static, so compute the catalog once: callers get the same object
// every time (it is used as an effect dependency in App).
const bookCatalog = (() => {
  const catalog = {};
  Object.keys(metadataModules).forEach((path) => {
    const bookKey = toBookKey(path);
    const meta = metadataModules[path].bookMetadata || metadataModules[path].default || {};
    if (!meta.title && !meta.author) return;
    if (meta.draft && !showDrafts) return;
    catalog[bookKey] = {
      key: bookKey,
      title: meta.title || bookKey,
      author: meta.author || '',
      shortDescription: meta.shortDescription || '',
      draft: Boolean(meta.draft),
      isDefault: Boolean(meta.isDefault)
    };
  });
  return catalog;
})();

// All books available in the picker
export const getAvailableBookKeys = () => Object.keys(bookCatalog);

// Lightweight selection metadata per book (the same object on every call)
export const getAvailableBookMetadata = () => bookCatalog;

// Load a book's full data (from its index.js, or assembled from its individual files)
export const loadBookData = async (bookKey) => {
  try {
    if (!metadataModules[`./${bookKey}/metadata.js`]) {
      throw new Error(`Unknown book "${bookKey}"`);
    }
    const indexPath = `./${bookKey}/index.js`;
    if (indexLoaders[indexPath]) {
      const indexModule = await indexLoaders[indexPath]();
      if (indexModule.book || indexModule.default) return assembleBook({ indexModule });
    }

    const files = Object.keys(bookFileLoaders).filter(path => toBookKey(path) === bookKey);
    const fileModules = await Promise.all(files.map(path => bookFileLoaders[path]()));
    fileModules.push(metadataModules[`./${bookKey}/metadata.js`]);
    return assembleBook({ fileModules });
  } catch (error) {
    console.error(`Failed to load book "${bookKey}":`, error);
    throw error;
  }
};

// The book flagged isDefault, else the first alphabetically
const computeDefaultBookKey = () => {
  const keys = getAvailableBookKeys().sort();
  return keys.find(key => bookCatalog[key].isDefault) || keys[0] || '';
};

export const defaultBookKey = computeDefaultBookKey();
