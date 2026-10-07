// Murder Before Evensong (Richard Coles, 2022) — placeholder, not yet populated.
// Only bibliographic facts are filled in. Characters, chapters and everything
// else should come from the text (or notes from the stage play), following
// docs/adding_murder_before_evensong.md. Kept as a draft until then.
export const bookMetadata = {
  title: 'Murder Before Evensong',
  author: 'Richard Coles',
  genre: 'Crime fiction / Cosy mystery',
  publicationYear: 2022,
  series: 'Canon Clement Mysteries',
  seriesOrder: 1,
  shortDescription: 'Work in progress: data not yet added.',

  // Hidden from the book picker until it has data (open the app with ?drafts to see it)
  draft: true,

  appTitle: 'Murder Before Evensong - Interactive Companion',
  appSubtitle: "A companion to Richard Coles's village murder mystery",
  welcomeMessage: 'Welcome to the Murder Before Evensong Interactive Companion',
  welcomeDescription: 'Explore the characters, relationships and clues of the mystery. Set the chapter you have reached to avoid spoilers.',
  aboutApp: "This companion maps the characters, relationships, events and clues of 'Murder Before Evensong' so you can follow the mystery without spoilers.",
  aboutBook: "'Murder Before Evensong' is the first of Richard Coles's Canon Clement mysteries.",
  tourWelcome: 'Welcome to the Murder Before Evensong Interactive Companion!',
  tourConclusion: 'You are ready to explore. Set the chapter you have reached to keep the solution hidden.',

  // Starting point for a murder mystery; rename/extend to fit the book's cast
  characterGroups: {
    'Investigators': 'Those trying to find out what happened',
    'Suspects': 'Characters under suspicion',
    'Victims': 'Characters who are harmed',
    'Police': 'The official investigation',
    'Villagers': 'The wider community'
  },
  characterGroupStyles: {
    'Investigators': 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
    'Suspects': 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
    'Victims': 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
    'Police': 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100',
    'Villagers': 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
  },
  characterGroupColors: {
    'Investigators': '#3182CE',
    'Suspects': '#E53E3E',
    'Victims': '#D69E2E',
    'Police': '#4A5568',
    'Villagers': '#38A169'
  },
  importanceWeights: {
    groupBonuses: {
      'Investigators': 15,
      'Suspects': 12,
      'Victims': 10,
      'Police': 8,
      'Villagers': 5
    }
  },

  // A mystery's "encyclopedia" is its clues (entries go in spycraftEntries.js)
  encyclopedia: {
    tabLabel: 'Clues',
    intro: 'The clues as they appear, and what they turn out to mean once the chapter you have reached reveals it.',
    searchPlaceholder: 'Search clues...',
    listTitle: 'Clues',
    emptyPrompt: 'Select a clue to view details'
  },

  copyright: '"Murder Before Evensong" © Richard Coles. Companion data for personal use.'
};
