export const bookMetadata = {
  title: "Stitched Up (v4)",
  // v4: rebuilt chapter by chapter from the text. A draft until reviewed (open the app with ?drafts)
  draft: true,
  // A thriller with reveals: start new readers at the preface rather than the whole book
  startSpoilerFree: true,
  author: "Matt Parry",
  genre: "Spy Thriller / Historical Fiction",
  setting: "England and Germany, 1932-1943",
  description: "A gripping spy thriller set during WWII, following Lady Cynthia Childreth as she becomes embroiled in British intelligence operations to uncover a network of Nazi sympathizers known as 'the knitters'.",
  publisher: "Self-Published",
  publicationYear: 2023,
  series: "Stitched Up",
  seriesOrder: 1,
  
  // App-specific metadata
  appTitle: "Stitched Up (v4) - Interactive Companion",
  appSubtitle: "Explore the world of Matt Parry's WWII spy thriller",
  welcomeMessage: "Welcome to the Stitched Up Interactive Companion",
  welcomeDescription: "Navigate the complex web of characters, relationships, and espionage in this gripping WWII spy thriller. Use the tabs below to explore different aspects of the story.",
  aboutApp: "This interactive companion helps readers explore the complex narrative of 'Stitched Up', tracking characters, relationships, locations, and plot developments through an intuitive interface.",
  aboutBook: "'Stitched Up' follows Lady Cynthia Childreth as she becomes involved in British intelligence operations during WWII, uncovering a network of Nazi sympathizers while navigating the dangerous world of espionage.",
  tourWelcome: "Welcome to the Stitched Up Interactive Companion! Let's take a tour of the key features.",
  tourConclusion: "You're now ready to explore the world of Stitched Up! Use the tabs to navigate through different aspects of the story.",
  
  // Groups say where people belong in the story, not which side they turn out to be on
  characterGroups: {
    'The Childreths': 'Cynthia, Richard and their household',
    'Denleigh Party': 'Hosts and guests of the 1932 house party at Denleigh Manor',
    'British Intelligence': 'Bill Laurie\'s organisation and its helpers',
    'Special Branch & Police': 'Scotland Yard and the police',
    'Berlin': 'Germans met in Berlin, and Germany\'s agents',
    'Village Life': 'Shopkeepers and neighbours in the Berkshire villages',
    'Historical Figures': 'Real people of the time'
  },
  characterGroupStyles: {
    'The Childreths': 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
    'Denleigh Party': 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200',
    'British Intelligence': 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100',
    'Special Branch & Police': 'bg-teal-200 text-teal-800 dark:bg-teal-800 dark:text-teal-200',
    'Berlin': 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
    'Village Life': 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
    'Historical Figures': 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
  },
  characterGroupColors: {
    'The Childreths': '#3182CE',
    'Denleigh Party': '#805AD5',
    'British Intelligence': '#4A5568',
    'Special Branch & Police': '#319795',
    'Berlin': '#D69E2E',
    'Village Life': '#38A169',
    'Historical Figures': '#E53E3E'
  },
  // Optional: colors for relationship categories used by RelationshipWeb
  relationshipCategoryColors: {
    'Spouse': '#805AD5',
    'Handler/Asset': '#3182CE',
    'Conspirator/Enemy': '#E53E3E',
    'Colleague/Partner': '#38A169',
    'Superior/Subordinate': '#DD6B20',
    'Friend': '#4299E1',
    'Informant/Double-Agent': '#D53F8C',
    'Family': '#319795',
    'Romantic': '#B83280',
    'Other': '#718096'
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
      'The Childreths': 15,
      'Denleigh Party': 12,
      'British Intelligence': 10,
      'Special Branch & Police': 8,
      'Berlin': 8,
      'Village Life': 4,
      'Historical Figures': 4
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

  // Footer copyright
  copyright: "© 2023 Matt Parry. All rights reserved."
};
