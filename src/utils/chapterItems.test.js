import { itemText, isChapterReached, visibleItems, lastVisibleChapterIndex, applyCoverNames } from './chapterItems';

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

describe('applyCoverNames', () => {
  const people = [{ id: 'bill', name: 'Bill Laurie', title: 'Wing-Commander', coverName: 'Mr Newton', nameRevealedInChapter: 'ch2' }, { id: 'amy', name: 'Amy' }];

  it('shows the cover name until the reveal', () => {
    const [bill, amy] = applyCoverNames(people, chapters, 'ch1');
    expect(bill.name).toBe('Mr Newton');
    expect(bill.title).toBeUndefined();
    expect(amy.name).toBe('Amy');
  });

  it('shows the real name from the reveal on, and without a filter', () => {
    expect(applyCoverNames(people, chapters, 'ch2')[0].name).toBe('Bill Laurie');
    expect(applyCoverNames(people, chapters, null)[0].name).toBe('Bill Laurie');
  });
});
