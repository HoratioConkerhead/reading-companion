export const bookMetadata = {
  title: "Stitched Up",
  author: "Matt Parry",
  genre: "Spy Thriller / Historical Fiction",
  setting: "England and Germany, 1932-1943",
  description: "A gripping spy thriller set during WWII, following Lady Cynthia Childreth as she becomes embroiled in British intelligence operations to uncover a network of Nazi sympathizers known as 'the knitters'.",
  publisher: "Self-Published",
  publicationYear: 2023,
  series: "Stitched Up",
  seriesOrder: 1,
  
  // App-specific metadata
  appTitle: "Stitched Up - Interactive Companion",
  appSubtitle: "Explore the world of Matt Parry's WWII spy thriller",
  welcomeMessage: "Welcome to the Stitched Up Interactive Companion",
  welcomeDescription: "Navigate the complex web of characters, relationships, and espionage in this gripping WWII spy thriller. Use the tabs below to explore different aspects of the story.",
  aboutApp: "This interactive companion helps readers explore the complex narrative of 'Stitched Up', tracking characters, relationships, locations, and plot developments through an intuitive interface.",
  aboutBook: "'Stitched Up' follows Lady Cynthia Childreth as she becomes involved in British intelligence operations during WWII, uncovering a network of Nazi sympathizers while navigating the dangerous world of espionage.",
  tourWelcome: "Welcome to the Stitched Up Interactive Companion! Let's take a tour of the key features.",
  tourConclusion: "You're now ready to explore the world of Stitched Up! Use the tabs to navigate through different aspects of the story.",
  
  // Character groups for the book
  characterGroups: {
    'Protagonists': 'Main characters working for British intelligence',
    'Fifth Columnists': 'Nazi sympathizers and traitors working against Britain',
    'German Connection': 'German agents and sympathizers',
    'Military': 'British military personnel and intelligence officers',
    'Supporting Characters': 'Secondary characters who aid the protagonists',
    'Historical Figures': 'Real historical figures mentioned in the story'
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
  // Optional: colors for relationship categories used by RelationshipWeb
  relationshipCategoryColors: {
    'Spouse': '#805AD5',
    'Handler/Asset': '#3182CE',
    'Conspirator/Enemy': '#E53E3E',
    'Colleague/Partner': '#38A169',
    'Superior/Subordinate': '#DD6B20',
    'Friend': '#4299E1',
    'Informant/Double-Agent': '#D53F8C',
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
      'Protagonists': 15,
      'Fifth Columnists': 12,
      'Military': 10,
      'Historical Figures': 10,
      'German Connection': 8,
      'Supporting Characters': 5
    }
  },
  
  // Footer copyright
  copyright: "© 2023 Matt Parry. All rights reserved."
};
