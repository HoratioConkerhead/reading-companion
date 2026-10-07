export const bookMetadata = {
  title: 'Stitched Up (v3)',
  // Empty scaffold for the next extraction: hidden from the book picker (open with ?drafts)
  draft: true,
  author: 'Matt Parry',
  characterGroups: {
    'Protagonists': 'Main characters working for British intelligence',
    'Fifth Columnists': 'Nazi sympathizers and traitors',
    'German Connection': 'German agents and sympathizers',
    'Supporting Characters': 'Secondary/supporting roles',
    'Military': 'British military and intelligence',
    'Historical Figures': 'Real-world figures referenced'
  },
  characterGroupStyles: {
    'Protagonists': 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
    'Fifth Columnists': 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
    'German Connection': 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
    'Supporting Characters': 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
    'Military': 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100',
    'Historical Figures': 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200'
  },
  characterGroupColors: {
    'Protagonists': '#3182CE',
    'Fifth Columnists': '#E53E3E',
    'German Connection': '#D69E2E',
    'Supporting Characters': '#38A169',
    'Military': '#4A5568',
    'Historical Figures': '#805AD5'
  },
  // Optional: character importance weighting configuration used by RelationshipWeb
  importanceWeights: {
    keyScenes: { perItem: 6, max: 30 },
    eventParticipation: { perItem: 2.5, max: 25 },
    relationships: { perItem: 2, max: 20 },
    development: { perItem: 2.5, max: 10 },
    defaultGroupBonus: 3,
    // Per-group bonus overrides
    groupBonuses: {
      'Protagonists': 15,
      'Fifth Columnists': 12,
      'Military': 10,
      'Historical Figures': 10,
      'German Connection': 8,
      'Supporting Characters': 5
    }
  },
  
  // Literary analysis for Plot Navigator
  literaryAnalysis: {
    title: 'Literary Analysis',
    paragraphs: [
      'The book uses the spy thriller genre to explore broader themes of loyalty, deception, class division, and the moral compromises made during wartime. The novel\'s structure mirrors the complexity of intelligence work itself, with information revealed gradually and perspectives shifting as characters\' true motivations come to light.',
      'The book\'s title operates on multiple levels, referring both to the knitting motif throughout the story and the way characters find themselves betrayed or trapped by circumstances and the actions of others.'
    ]
  },

  // Time-period filters on the Timeline and Map (years, inclusive)
  timePeriods: [
    { id: 'early', label: '1932-1939', from: 1932, to: 1939 },
    { id: 'mid', label: '1940-1942', from: 1940, to: 1942 },
    { id: 'late', label: '1943-1944', from: 1943, to: 1944 }
  ],

  // Map views; locations of the listed types are hidden in that view
  mapViews: [
    { id: 'uk', label: 'UK', center: [54, -4], zoom: 6, hideLocationTypes: ['german'] },
    { id: 'europe', label: 'Europe', center: [50, 4], zoom: 5, hideLocationTypes: ['irish'] }
  ],

  // Map marker colours and legend labels by location type (positions.js `type`)
  locationTypes: {
    uk: { label: 'UK Locations', color: '#3182ce' },
    german: { label: 'German Locations', color: '#d69e2e' },
    irish: { label: 'Irish Locations', color: '#38a169' },
    default: { label: 'Locations', color: '#3182ce' }
  },

  // Wording for the encyclopedia tab (spycraftEntries)
  encyclopedia: {
    tabLabel: 'Spycraft',
    intro: 'Explore the spy techniques and methods used in the book and learn about their historical context in WWII espionage.',
    searchPlaceholder: 'Search spy techniques...',
    listTitle: 'Techniques',
    emptyPrompt: 'Select a spy technique to view details',
    historicalNote: 'The intelligence tactics portrayed in the book are based on real methods used during WWII. The British intelligence services were particularly adept at counter-espionage and the running of double agents.'
  },
};
