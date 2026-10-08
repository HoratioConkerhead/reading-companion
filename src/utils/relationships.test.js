import { deriveRelationshipsFromCharacters, toRelationshipCategory } from './relationships';

const chapters = [{ id: 'ch1' }, { id: 'ch2' }, { id: 'ch3' }];

describe('deriveRelationshipsFromCharacters', () => {
  it('merges reciprocal relations into one edge with a combined type', () => {
    const characters = [
      { id: 'handler', introducedInChapter: 'ch1', relations: [{ characterId: 'agent', type: 'handler', introducedInChapter: 'ch3' }] },
      { id: 'agent', introducedInChapter: 'ch2', relations: [{ characterId: 'handler', type: 'asset', introducedInChapter: 'ch2' }] }
    ];
    expect(deriveRelationshipsFromCharacters(characters, chapters)).toEqual([
      { from: 'agent', to: 'handler', type: 'asset-handler', category: 'Handler/Asset', introducedInChapter: 'ch2' }
    ]);
  });

  it('uses one type when both sides agree, and the earliest character intro when relations have none', () => {
    const characters = [
      { id: 'a', introducedInChapter: 'ch3', relations: [{ characterId: 'b', type: 'friend' }] },
      { id: 'b', introducedInChapter: 'ch2', relations: [{ characterId: 'a', type: 'friend' }] }
    ];
    expect(deriveRelationshipsFromCharacters(characters, chapters)).toEqual([
      { from: 'a', to: 'b', type: 'friend', category: 'Friend', introducedInChapter: 'ch2' }
    ]);
  });

  it('still produces an edge for a one-sided relation', () => {
    const characters = [
      { id: 'a', relations: [{ characterId: 'b', type: 'spouse' }] },
      { id: 'b' }
    ];
    expect(deriveRelationshipsFromCharacters(characters, chapters)).toHaveLength(1);
  });
});

describe('toRelationshipCategory', () => {
  it.each([
    ['spouse', 'Spouse'],
    ['handler-asset', 'Handler/Asset'],
    ['recruiter-target', 'Conspirator/Enemy'],
    ['colleague', 'Colleague/Partner'],
    ['superior-subordinate', 'Superior/Subordinate'],
    ['old friend', 'Friend'],
    ['double-agent', 'Informant/Double-Agent'],
    ['cousin', 'Family'],
    ['mother-son', 'Family'],
    ['grandfather-grandson', 'Family'],
    ['parson', 'Other'],
    ['lover', 'Romantic'],
    ['rival', 'Conspirator/Enemy'],
    ['killer-victim', 'Conspirator/Enemy'],
    ['acquaintance', 'Other'],
    [undefined, 'Other']
  ])('%s -> %s', (type, category) => {
    expect(toRelationshipCategory(type)).toBe(category);
  });
});
