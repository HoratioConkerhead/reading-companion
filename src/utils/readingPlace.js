// The chapter each book's reader has got up to, remembered in this browser.
// Stored as { [bookKey]: chapterId | 'all' } ('all' = the reader chose the whole book).
// Storage can be unavailable (private mode, blocked site data), so every access is guarded.

const STORAGE_KEY = 'readingPlace';

const readAll = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
};

/** The saved place for a book: a chapter id, 'all', or null if none was saved */
export const loadReadingPlace = (bookKey) => {
  const value = readAll()[bookKey];
  return typeof value === 'string' ? value : null;
};

/** Save a book's place (a chapter id, or null for the whole book) */
export const saveReadingPlace = (bookKey, chapterId) => {
  try {
    const all = readAll();
    all[bookKey] = chapterId || 'all';
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // storage unavailable: the place just isn't remembered
  }
};

/**
 * The chapter filter to start a book with: a chapter named in the URL, else the saved
 * place, else the first chapter for books that start spoiler-free, else the whole book.
 */
export const initialChapterFilter = ({ urlChapter, savedPlace, chapters = [], startSpoilerFree = false }) => {
  const isChapter = (id) => Boolean(id) && chapters.some(ch => ch.id === id);
  if (isChapter(urlChapter)) return urlChapter;
  if (savedPlace === 'all') return null;
  if (isChapter(savedPlace)) return savedPlace;
  return startSpoilerFree ? (chapters[0]?.id || null) : null;
};
