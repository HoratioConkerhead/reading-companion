import { itemText, isChapterReached, visibleItems, lastVisibleChapterIndex } from './chapterItems';

const chapters = [{ id: 'ch1' }, { id: 'ch2' }, { id: 'ch3' }];

describe('itemText', () => {
  it('reads strings, text items and development items', () => {
    expect(itemText('plain')).toBe('plain');
    expect(itemText({ text: 'tagged', chapter: 'ch2' })).toBe('tagged');
    expect(itemText({ phase: 'Phase', description: 'what happened' })).toBe('Phase: what happened');
    expect(itemText(null)).toBe('');
  });
});

describe('isChapterReached', () => {
  it('treats everything as reached without a filter', () => {
    expect(isChapterReached('ch3', chapters, null)).toBe(true);
  });

  it('compares chapter positions with the filter', () => {
    expect(isChapterReached('ch2', chapters, 'ch2')).toBe(true);
    expect(isChapterReached('ch3', chapters, 'ch2')).toBe(false);
  });

  it('treats missing or unknown chapters as reached', () => {
    expect(isChapterReached(undefined, chapters, 'ch1')).toBe(true);
    expect(isChapterReached('nowhere', chapters, 'ch1')).toBe(true);
  });
});

describe('visibleItems', () => {
  const items = ['always', { text: 'second', chapter: 'ch2' }, { text: 'third', chapter: 'ch3' }];

  it('keeps strings and items up to the filter', () => {
    expect(visibleItems(items, chapters, 'ch2').map(itemText)).toEqual(['always', 'second']);
  });

  it('keeps everything without a filter, and copes with missing lists', () => {
    expect(visibleItems(items, chapters, null)).toHaveLength(3);
    expect(visibleItems(undefined, chapters, 'ch1')).toEqual([]);
  });
});

describe('lastVisibleChapterIndex', () => {
  it('is the filter chapter, or the last chapter without one', () => {
    expect(lastVisibleChapterIndex(chapters, 'ch2')).toBe(1);
    expect(lastVisibleChapterIndex(chapters, null)).toBe(2);
  });
});
