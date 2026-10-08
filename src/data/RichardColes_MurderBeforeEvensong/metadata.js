// Murder Before Evensong (Richard Coles, 2022). Companion data written from the text:
// facts and summaries in our own words, with no quotations. Still a draft until reviewed.
export const bookMetadata = {
  title: 'Murder Before Evensong',
  author: 'Richard Coles',
  genre: 'Crime fiction / Cosy mystery',
  publicationYear: 2022,
  publisher: 'Weidenfeld & Nicolson',
  series: 'Canon Clement Mysteries',
  seriesOrder: 1,
  setting: 'Champton, an English estate village, in the spring of 1988',
  shortDescription: 'A rector\'s plan to put a lavatory in his church divides an English village, and then a parishioner is found murdered in the pews.',

  // Hidden from the book picker until reviewed (open the app with ?drafts to see it)
  draft: true,

  // A whodunnit: start new readers at Chapter 1 rather than showing the whole book
  startSpoilerFree: true,

  appTitle: 'Murder Before Evensong - Interactive Companion',
  appSubtitle: "A companion to Richard Coles's village murder mystery",
  welcomeMessage: 'Welcome to the Murder Before Evensong Interactive Companion',
  welcomeDescription: 'Explore the people of Champton, their relationships, the events and the clues. The companion starts at Chapter 1: move the chapter on as you read, and nothing beyond it is shown.',
  aboutApp: "This companion maps the characters, relationships, events, places and clues of 'Murder Before Evensong' chapter by chapter, so you can follow the mystery without spoilers.",
  aboutBook: "'Murder Before Evensong' is the first of Richard Coles's Canon Clement mysteries. In the spring of 1988 Canon Daniel Clement, rector of Champton, proposes installing a lavatory in his church, setting off a quarrel about pews, and then a parishioner is found dead in the church.",
  tourWelcome: 'Welcome to the Murder Before Evensong Interactive Companion!',
  tourConclusion: 'You are ready to explore. Keep the chapter picker at the chapter you have reached to keep the solution hidden.',

  // Groups describe where people belong in Champton, not their part in the mystery,
  // so the groups themselves give nothing away
  characterGroups: {
    'The Rectory': 'Daniel Clement, his family and his dogs',
    'The de Floures Family': 'The family at Champton House',
    'Estate & House': 'People who work, or once worked, for the house and estate',
    'Village & Church': 'Parishioners and villagers of Champton',
    'Police': 'The murder investigation',
    'Clergy': 'The wider Church of England',
    'Wartime Champton': 'People from Champton\'s past'
  },
  characterGroupStyles: {
    'The Rectory': 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
    'The de Floures Family': 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200',
    'Estate & House': 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
    'Village & Church': 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
    'Police': 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100',
    'Clergy': 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
    'Wartime Champton': 'bg-orange-200 text-orange-800 dark:bg-orange-800 dark:text-orange-200'
  },
  characterGroupColors: {
    'The Rectory': '#3182CE',
    'The de Floures Family': '#805AD5',
    'Estate & House': '#D69E2E',
    'Village & Church': '#38A169',
    'Police': '#4A5568',
    'Clergy': '#E53E3E',
    'Wartime Champton': '#DD6B20'
  },
  importanceWeights: {
    groupBonuses: {
      'The Rectory': 12,
      'The de Floures Family': 10,
      'Estate & House': 8,
      'Village & Church': 8,
      'Police': 10,
      'Clergy': 5,
      'Wartime Champton': 5
    }
  },
  relationshipCategoryColors: {
    'Family': '#3182CE',
    'Spouse': '#805AD5',
    'Romantic': '#D53F8C',
    'Friend': '#38A169',
    'Colleague/Partner': '#319795',
    'Superior/Subordinate': '#718096',
    'Conspirator/Enemy': '#E53E3E',
    'Other': '#A0AEC0'
  },

  timePeriods: [
    { id: 'past', label: 'Before the war', from: 1400, to: 1938 },
    { id: 'war', label: 'The war', from: 1939, to: 1945 },
    { id: 'present', label: 'Spring 1988', from: 1988, to: 1988 }
  ],

  // Champton is fictional, so the map is a plan of the parish rather than a street map
  // (positions.js uses plan coordinates: x from west to east, y from south to north)
  mapStyle: 'plan',
  locationTypes: {
    church: { label: 'Church', color: '#E53E3E' },
    estate: { label: 'House and park', color: '#805AD5' },
    village: { label: 'Village', color: '#38A169' },
    beyond: { label: 'Beyond Champton', color: '#718096' },
    default: { label: 'Places', color: '#3182CE' }
  },

  // A mystery's "encyclopedia" is its clues (entries go in spycraftEntries.js)
  encyclopedia: {
    tabLabel: 'Clues',
    intro: 'The clues as they appear. What each one turns out to mean stays hidden until the chapter that reveals it.',
    searchPlaceholder: 'Search clues...',
    listTitle: 'Clues',
    emptyPrompt: 'Select a clue to view details',
    examplesTitle: 'Where it appears',
    meaningTitle: 'What it means'
  },

  copyright: '"Murder Before Evensong" © Richard Coles, published by Weidenfeld & Nicolson. Companion data for personal use.'
};
