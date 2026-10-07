// Per-book configuration for the parts of the UI that depend on the book
// (character groups, time periods, map views, tab labels...). Everything is
// read from the book's metadata.js, with defaults that suit any book, so a new
// book only needs to set what differs. See docs/data_format_documentation.md.

const FALLBACK_GROUP_COLORS = ['#3182CE', '#E53E3E', '#D69E2E', '#38A169', '#805AD5', '#DD6B20', '#319795', '#D53F8C'];
const DEFAULT_GROUP_STYLE = 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
const DEFAULT_LOCATION_TYPE = { label: 'Locations', color: '#3182CE' };

export const DEFAULT_TAB_LABELS = {
  characters: 'Characters',
  relationships: 'Relationships',
  timeline: 'Timeline',
  locations: 'Locations',
  map: 'Map',
  plot: 'Plot',
  objects: 'Objects',
  encyclopedia: 'Spycraft'
};

const DEFAULT_ENCYCLOPEDIA = {
  tabLabel: DEFAULT_TAB_LABELS.encyclopedia,
  intro: 'Explore the techniques and ideas referenced in the book and their historical context.',
  searchPlaceholder: 'Search entries...',
  listTitle: 'Entries',
  emptyPrompt: 'Select an entry to view details',
  historicalNote: null
};

/** First four-digit year in a date string ("May 27, 1932" -> 1932), or null */
export const extractYear = (dateString) => {
  const match = String(dateString || '').match(/\b(\d{4})\b/);
  return match ? parseInt(match[1], 10) : null;
};

/** Does an event fall in a time period ({ from, to } years, inclusive)? */
export const eventInPeriod = (event, period) => {
  if (!period) return true;
  const year = extractYear(event.date);
  return year !== null && year >= period.from && year <= period.to;
};

/**
 * Build the UI configuration for a book.
 * @param {Object} metadata - the book's bookMetadata
 * @param {Object} data - the loaded book (used to fill gaps, e.g. groups no metadata lists)
 */
export const getBookConfig = (metadata = {}, data = {}) => {
  const characters = data.characters || [];

  // Character groups: metadata order first, then any other groups characters use
  const groupNames = Object.keys(metadata.characterGroups || metadata.characterGroupColors || {});
  characters.forEach((c) => {
    if (c.group && !groupNames.includes(c.group)) groupNames.push(c.group);
  });
  const groups = groupNames.map((name, index) => ({
    name,
    description: metadata.characterGroups?.[name] || '',
    color: metadata.characterGroupColors?.[name] || FALLBACK_GROUP_COLORS[index % FALLBACK_GROUP_COLORS.length],
    style: metadata.characterGroupStyles?.[name] || DEFAULT_GROUP_STYLE
  }));
  const groupByName = new Map(groups.map(g => [g.name, g]));

  const encyclopedia = { ...DEFAULT_ENCYCLOPEDIA, ...(metadata.encyclopedia || {}) };
  const tabLabels = { ...DEFAULT_TAB_LABELS, encyclopedia: encyclopedia.tabLabel, ...(metadata.tabLabels || {}) };

  const locationTypes = metadata.locationTypes || {};

  return {
    groups,
    getGroupColor: (name) => groupByName.get(name)?.color || '#718096',
    getGroupStyle: (name) => groupByName.get(name)?.style || DEFAULT_GROUP_STYLE,

    // [{ id, label, from, to }]; empty means the book has no time-period filter
    timePeriods: metadata.timePeriods || [],

    // [{ id, label, center: [lat, lng], zoom, hideLocationTypes: [] }]; empty means
    // a single view fitted to the book's locations
    mapViews: metadata.mapViews || [],
    locationTypes,
    getLocationType: (type) => locationTypes[type] || locationTypes.default || DEFAULT_LOCATION_TYPE,

    tabLabels,
    encyclopedia
  };
};

/** The color of an event: the first configured group among the characters involved */
export const getEventGroupColor = (event, characters, config) => {
  const groupsInvolved = new Set((event.characters || []).map(ref => characters.find(c => c.id === ref.characterId)?.group));
  const group = config.groups.find(g => groupsInvolved.has(g.name));
  return group ? group.color : '#6b7280';
};
