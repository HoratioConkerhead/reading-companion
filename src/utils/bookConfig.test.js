import { getBookConfig, extractYear, eventInPeriod, getEventGroupColor } from './bookConfig';

describe('getBookConfig', () => {
  it('uses metadata groups in order, then groups only characters use', () => {
    const config = getBookConfig(
      { characterGroups: { Heroes: 'Good', Villains: 'Bad' }, characterGroupColors: { Heroes: '#111111' } },
      { characters: [{ id: 'a', group: 'Villains' }, { id: 'b', group: 'Bystanders' }] }
    );
    expect(config.groups.map(g => g.name)).toEqual(['Heroes', 'Villains', 'Bystanders']);
    expect(config.getGroupColor('Heroes')).toBe('#111111');
    // Groups without a colour get one from the fallback palette
    expect(config.getGroupColor('Villains')).toMatch(/^#[0-9A-F]{6}$/i);
    expect(config.getGroupColor('Unknown')).toBe('#718096');
  });

  it('has neutral defaults for a book with no configuration', () => {
    const config = getBookConfig();
    expect(config.timePeriods).toEqual([]);
    expect(config.mapViews).toEqual([]);
    expect(config.tabLabels.encyclopedia).toBe('Spycraft');
    expect(config.getLocationType('anything')).toEqual({ label: 'Locations', color: '#3182CE' });
  });

  it('takes tab labels and encyclopedia wording from metadata', () => {
    const config = getBookConfig({ encyclopedia: { tabLabel: 'Clues', listTitle: 'Clues' }, tabLabels: { plot: 'Story' } });
    expect(config.tabLabels.encyclopedia).toBe('Clues');
    expect(config.tabLabels.plot).toBe('Story');
    expect(config.encyclopedia.listTitle).toBe('Clues');
    expect(config.encyclopedia.searchPlaceholder).toBe('Search entries...');
  });

  it('falls back to the default location type', () => {
    const config = getBookConfig({ locationTypes: { german: { label: 'German', color: '#d69e2e' }, default: { label: 'UK', color: '#3182ce' } } });
    expect(config.getLocationType('german').label).toBe('German');
    expect(config.getLocationType(undefined).label).toBe('UK');
  });
});

describe('time periods', () => {
  it('extracts the year from free-form dates', () => {
    expect(extractYear('May 27, 1932')).toBe(1932);
    expect(extractYear('Summer 1943')).toBe(1943);
    expect(extractYear('N/A')).toBeNull();
  });

  it('matches events by year range, inclusive', () => {
    const period = { from: 1940, to: 1942 };
    expect(eventInPeriod({ date: 'June 1940' }, period)).toBe(true);
    expect(eventInPeriod({ date: '1942' }, period)).toBe(true);
    expect(eventInPeriod({ date: '1944' }, period)).toBe(false);
    expect(eventInPeriod({ date: 'Unspecified' }, period)).toBe(false);
    expect(eventInPeriod({ date: 'Unspecified' }, null)).toBe(true);
  });
});

describe('getEventGroupColor', () => {
  it('uses the first configured group among the characters involved', () => {
    const config = getBookConfig({ characterGroupColors: { Heroes: '#111111', Villains: '#222222' } });
    const characters = [{ id: 'h', group: 'Heroes' }, { id: 'v', group: 'Villains' }];
    expect(getEventGroupColor({ characters: [{ characterId: 'v' }, { characterId: 'h' }] }, characters, config)).toBe('#111111');
    expect(getEventGroupColor({ characters: [] }, characters, config)).toBe('#6b7280');
  });
});
