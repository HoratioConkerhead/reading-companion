import { filterByChapter, filterRelationshipsByChapter, filterEventsByChapter } from './chapterFilter';

const chapters = [{ id: 'ch1', events: ['e_listed'] }, { id: 'ch2' }, { id: 'ch3' }];

describe('filterByChapter', () => {
  const items = [
    { id: 'a', introducedInChapter: 'ch1' },
    { id: 'b', introducedInChapter: 'ch2' },
    { id: 'c', introducedInChapter: 'ch3' },
    { id: 'no_intro' }
  ];
  const intro = (item) => item.introducedInChapter;

  it('returns everything when no chapter is selected', () => {
    expect(filterByChapter(items, chapters, null, intro)).toBe(items);
  });

  it('keeps items introduced at or before the selected chapter', () => {
    const ids = filterByChapter(items, chapters, 'ch2', intro).map(i => i.id);
    expect(ids).toEqual(['a', 'b', 'no_intro']);
  });

  it('ignores an unknown chapter id', () => {
    expect(filterByChapter(items, chapters, 'missing', intro)).toBe(items);
  });
});

describe('filterRelationshipsByChapter', () => {
  const characters = [
    { id: 'x', introducedInChapter: 'ch1' },
    { id: 'y', introducedInChapter: 'ch3' },
    { id: 'z' }
  ];

  it('uses the relation-level chapter when present', () => {
    const rels = [{ from: 'x', to: 'y', introducedInChapter: 'ch2' }];
    expect(filterRelationshipsByChapter(rels, characters, chapters, 'ch1')).toEqual([]);
    expect(filterRelationshipsByChapter(rels, characters, chapters, 'ch2')).toEqual(rels);
  });

  it('falls back to the earliest character introduction', () => {
    const rels = [{ from: 'x', to: 'y' }];
    expect(filterRelationshipsByChapter(rels, characters, chapters, 'ch1')).toEqual(rels);
  });

  it('hides relationships whose chapter cannot be determined', () => {
    const rels = [{ from: 'z', to: 'unknown' }];
    expect(filterRelationshipsByChapter(rels, characters, chapters, 'ch3')).toEqual([]);
  });
});

describe('filterEventsByChapter', () => {
  it('uses introducedInChapter, then the chapter event list, then event.chapter', () => {
    const events = [
      { id: 'e_intro', introducedInChapter: 'ch3' },
      { id: 'e_listed' },
      { id: 'e_chapter', chapter: 'ch2' },
      { id: 'e_unknown' }
    ];
    const ids = filterEventsByChapter(events, chapters, 'ch1').map(e => e.id);
    expect(ids).toEqual(['e_listed', 'e_unknown']);
  });
});
