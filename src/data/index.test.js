import { getAvailableBookMetadata, getAvailableBookKeys, loadBookData, defaultBookKey } from './index';
import { assembleBook, normalizeBook } from './bookAssembly';

describe('book catalog', () => {
  it('returns the same catalog object on every call', () => {
    expect(getAvailableBookMetadata()).toBe(getAvailableBookMetadata());
  });

  it('hides draft books and defaults to the book flagged isDefault', () => {
    const keys = getAvailableBookKeys();
    expect(keys).not.toContain('MattParry_StitchedUp_v3');
    expect(defaultBookKey).toBe('MattParry_StitchedUp_v2');
  });
});

describe('loadBookData', () => {
  it.each([
    'MattParry_StitchedUp_v1',
    'MattParry_StitchedUp_v2',
    'RobertLouisStevenson_JekyllAndHyde'
  ])('loads %s with characters, chapters and categorised relationships', async (bookKey) => {
    const book = await loadBookData(bookKey);
    expect(book.bookMetadata.title).toBeTruthy();
    expect(book.characters.length).toBeGreaterThan(0);
    expect(book.chapters.length).toBeGreaterThan(0);
    expect(book.relationships.length).toBeGreaterThan(0);
    book.relationships.forEach(rel => expect(rel.category).toBeTruthy());
  });

  it('assembles a book without an index.js (the v3 scaffold) instead of crashing', async () => {
    const book = await loadBookData('MattParry_StitchedUp_v3');
    expect(book.bookMetadata.title).toBe('Stitched Up (v3)');
    expect(book.characters).toEqual([]);
    expect(book.timeline).toEqual([]);
  });

  it('rejects an unknown book', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await expect(loadBookData('No_Such_Book')).rejects.toThrow('Unknown book');
  });
});

describe('bookAssembly', () => {
  it('fills in missing parts with empty values', () => {
    const book = normalizeBook({ bookMetadata: { title: 'T' } });
    expect(book.events).toEqual([]);
    expect(book.locationPositions).toEqual({});
    expect(book.mapBoundaries).toBeNull();
  });

  it('derives relationships from character relations when none are listed', () => {
    const book = assembleBook({
      fileModules: [{
        characters: [
          { id: 'a', relations: [{ characterId: 'b', type: 'friend' }] },
          { id: 'b', relations: [{ characterId: 'a', type: 'friend' }] }
        ]
      }, { bookMetadata: { title: 'T' }, unrelatedExport: 1 }]
    });
    expect(book.relationships).toEqual([
      { from: 'a', to: 'b', type: 'friend', category: 'Friend', introducedInChapter: null }
    ]);
    expect(book.unrelatedExport).toBeUndefined();
  });

  it('gives locations and objects one shape across books', () => {
    const book = normalizeBook({
      locations: [{ id: 'l', significance: 'Where it happens' }],
      objects: [{ id: 'o', significance: 'Evidence', events: ['e1'], characters: ['c1'] }]
    });
    expect(book.locations[0].significance).toEqual(['Where it happens']);
    expect(book.objects[0]).toMatchObject({ significance: ['Evidence'], related_events: ['e1'], related_characters: ['c1'] });
  });

  it('normalises both mystery vocabularies', () => {
    const book = normalizeBook({ mysteryElements: [{ id: 'm', introducedInChapter: 'ch1', resolvedInChapter: 'ch3' }] });
    expect(book.mysteryElements[0]).toMatchObject({ firstMentioned: 'ch1', revealedInChapter: 'ch3' });
  });
});
