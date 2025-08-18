export const bookMetadata = {
  title: "The Strange Case of Dr Jekyll and Mr Hyde",
  author: "Robert Louis Stevenson",
  genre: "Gothic fiction / Novella",
  setting: "London, late 19th century",
  description: "A Victorian lawyer investigates the unsettling connection between the respectable Dr. Jekyll and the violent Mr. Hyde, uncovering a chilling secret about human duality.",
  publisher: "Public Domain",
  publicationYear: 1886,
  series: "Classic Literature",
  seriesOrder: 1,
  
  // App-specific metadata
  appTitle: "Jekyll & Hyde - Interactive Companion",
  appSubtitle: "Explore the duality at the heart of Stevenson's classic",
  welcomeMessage: "Welcome to the Jekyll & Hyde Interactive Companion",
  welcomeDescription: "Navigate characters, events, locations, and themes of Stevenson's novella while avoiding spoilers with chapter-based filtering.",
  aboutApp: "This companion maps the narrative of 'The Strange Case of Dr Jekyll and Mr Hyde' into an interactive network of characters, relationships, events, and themes.",
  aboutBook: "Utterson's inquiry into Mr. Hyde leads to the revelation of Dr. Jekyll's experiment in splitting his nature, a tale of respectability, repression, and the duality of man.",
  tourWelcome: "Use the tabs to browse characters, relationships, and maps. Filter by chapter to follow the mystery as it unfolds.",
  tourConclusion: "You're ready to explore the world of Jekyll & Hyde. Advance the chapter filter as you read to reveal more of the story.",
  
  // Character groups for the book
  characterGroups: {
    'Protagonists': 'Central investigators and sympathetic figures',
    'Antagonists': 'Opposing or threatening figures',
    'Victims': 'Characters harmed by events',
    'Supporting Characters': 'Other figures who influence the plot'
  },
  // Optional: UI styles for character groups (Tailwind classes)
  characterGroupStyles: {
    'Protagonists': 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
    'Antagonists': 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
    'Victims': 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
    'Supporting Characters': 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
  },
  // Optional: colors for character groups (hex for SVGs, etc.)
  characterGroupColors: {
    'Protagonists': '#3182CE',
    'Antagonists': '#E53E3E',
    'Victims': '#D69E2E',
    'Supporting Characters': '#38A169'
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
      'Antagonists': 10,
      'Victims': 8,
      'Supporting Characters': 5
    }
  },
  
  // Literary analysis for Plot Navigator
  literaryAnalysis: {
    title: 'Literary Analysis',
    paragraphs: [
      'Stevenson\'s novella distills Victorian anxieties about respectability, repression, and scientific transgression into the iconic figure of a self-divided man. Through the dual personae of Jekyll and Hyde, the text dramatizes the split between public virtue and private appetite, suggesting that moral identity is not a steady essence but a precarious performance susceptible to rupture.',
      'Formally, the narrative withholds its revelation through testimony, legal documents, and nested accounts, mirroring the investigative process while foregrounding the instability of witness and memory. London\'s fogbound streets, locked doors, and recurrent thresholds function as spatial metaphors for divided selves and compartmentalized desire, making the city itself an anatomy of doubleness.'
    ]
  },
  
  // Footer copyright
  copyright: "Text is public domain; dataset © 2025 by Contributors"
};


