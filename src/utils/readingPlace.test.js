import { loadReadingPlace, saveReadingPlace, initialChapterFilter } from './readingPlace';

const chapters = [{ id: 'ch1' }, { id: 'ch2' }];

describe('reading place storage', () => {
  beforeEach(() => localStorage.clear());

  it('remembers a chapter, or the whole book, per book', () => {
    saveReadingPlace('bookA', 'ch2');
    saveReadingPlace('bookB', null);
    expect(loadReadingPlace('bookA')).toBe('ch2');
    expect(loadReadingPlace('bookB')).toBe('all');
    expect(loadReadingPlace('bookC')).toBeNull();
  });

  it('copes with unreadable storage', () => {
    localStorage.setItem('readingPlace', 'not json');
    expect(loadReadingPlace('bookA')).toBeNull();
  });
});

describe('initialChapterFilter', () => {
  it('prefers the URL, then the saved place', () => {
    expect(initialChapterFilter({ urlChapter: 'ch1', savedPlace: 'ch2', chapters })).toBe('ch1');
    expect(initialChapterFilter({ urlChapter: null, savedPlace: 'ch2', chapters })).toBe('ch2');
    expect(initialChapterFilter({ urlChapter: null, savedPlace: 'all', chapters, startSpoilerFree: true })).toBeNull();
  });

  it('ignores chapters the book does not have', () => {
    expect(initialChapterFilter({ urlChapter: 'ch9', savedPlace: 'ch8', chapters })).toBeNull();
  });

  it('starts spoiler-free books at the first chapter when nothing is saved', () => {
    expect(initialChapterFilter({ chapters, startSpoilerFree: true })).toBe('ch1');
    expect(initialChapterFilter({ chapters })).toBeNull();
  });
});
