// Book metadata for "Stitched Up"
export const bookMetadata = {
  title: "Stitched Up (old)",
  author: "Matt Parry",
  genre: "Spy Thriller",
  setting: "World War II",
  description: "A historical spy thriller set during World War II that follows Lady Cynthia Childreth's recruitment into intelligence work and her efforts to thwart a Nazi assassination plot.",
  publisher: "Self-published",
  publicationYear: 2023,
  series: "Stitched Up Series",
  seriesOrder: 1,
  
  // App-specific metadata
  appTitle: "Stitched Up Interactive Companion",
  appSubtitle: "An Interactive Companion to Matt Parry's Novel",
  welcomeMessage: "Welcome to the \"Stitched Up\" Interactive Companion!",
  welcomeDescription: "This app helps you explore characters, relationships, locations, and plot elements from the novel. Use the tabs below to navigate different aspects of the story.",
  
  // About sections
  aboutApp: "The \"Stitched Up\" Interactive Companion is designed to enhance your reading experience by providing detailed information about characters, locations, events, and spy techniques featured in Matt Parry's novel.",
  aboutBook: "\"Stitched Up\" is a historical spy thriller set during World War II, following Lady Cynthia Childreth's recruitment into intelligence work and her efforts to thwart a Nazi assassination plot.",
  
  // Tour messages
  tourWelcome: "Welcome to the \"Stitched Up\" Interactive Companion! This app helps you explore the world of Matt Parry's novel.",
  tourConclusion: "You're now ready to explore the world of \"Stitched Up\"! Click any tab to begin your adventure.",
  
  // Character groups for the book
  characterGroups: {
    'Protagonists': 'Main characters working for British intelligence',
    'Fifth Columnists': 'Nazi sympathizers and collaborators',
    'German Connection': 'German nationals and sympathizers',
    'Supporting Characters': 'Other characters in the story',
    'Military': 'British military and intelligence',
    'Historical Figures': 'Real-world figures referenced'
  },
  // Optional: UI styles for character groups (Tailwind classes)
  characterGroupStyles: {
    'Protagonists': 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
    'Fifth Columnists': 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
    'German Connection': 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
    'Supporting Characters': 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
    'Military': 'bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-100',
    'Historical Figures': 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200'
  },
  // Optional: colors for character groups (hex for SVGs, etc.)
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
    // Per-group bonus overrides (limited groups in v1)
    groupBonuses: {
      'Protagonists': 15,
      'Fifth Columnists': 12,
      'German Connection': 8,
      'Supporting Characters': 5,
      'Military': 10,
      'Historical Figures': 10
    }
  },
  
  // Footer copyright
  copyright: "\"Stitched Up\" Interactive Companion"
};
