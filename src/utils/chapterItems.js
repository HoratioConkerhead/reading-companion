// List items that belong to a chapter.
//
// Lists in the data (a character's development, a clue's examples, a mystery's clues,
// a location's significance...) can mix plain strings with { text, chapter } items.
// A string is always shown; an item with a chapter is shown only once the reader's
// chapter filter has reached it, so later facts stay hidden while reading.

/** The text of a list item (a string, or an object with text/description) */
export const itemText = (item) => {
  if (typeof item === 'string') return item;
  if (!item || typeof item !== 'object') return '';
  if (item.text) return item.text;
  return [item.phase, item.description].filter(Boolean).join(': ');
};

/** Index of the last chapter the reader can see (the whole book without a filter) */
export const lastVisibleChapterIndex = (chapters = [], chapterFilterId = null) => {
  const filterIndex = chapterFilterId ? chapters.findIndex(ch => ch.id === chapterFilterId) : -1;
  return filterIndex === -1 ? chapters.length - 1 : filterIndex;
};

/** Has the reader reached this chapter? Unknown or missing chapters count as reached. */
export const isChapterReached = (chapterId, chapters = [], chapterFilterId = null) => {
  if (!chapterId || !chapterFilterId) return true;
  const index = chapters.findIndex(ch => ch.id === chapterId);
  if (index === -1) return true;
  return index <= lastVisibleChapterIndex(chapters, chapterFilterId);
};

/** The items of a list that the reader can see */
export const visibleItems = (items, chapters = [], chapterFilterId = null) => {
  if (!Array.isArray(items)) return [];
  return items.filter(item => typeof item === 'string' || isChapterReached(item?.chapter, chapters, chapterFilterId));
};

/**
 * What the reader knows about each character at their chapter:
 * - `coverName` is shown in place of `name` (and `title` is hidden) until the reader
 *   reaches `nameRevealedInChapter`;
 * - `reveals` ([{ chapter, role?, background?, group?, ... }]) replace those fields once
 *   the reader reaches each chapter, in order (e.g. a guest turns out to be an officer).
 */
export const applyCoverNames = (characters = [], chapters = [], chapterFilterId = null) => characters.map(character => {
  let shown = character;
  (character.reveals || []).forEach(({ chapter, ...fields }) => {
    if (isChapterReached(chapter, chapters, chapterFilterId)) shown = { ...shown, ...fields };
  });
  if (character.coverName && !isChapterReached(character.nameRevealedInChapter, chapters, chapterFilterId)) {
    shown = { ...shown, name: character.coverName, title: undefined };
  }
  return shown;
});
