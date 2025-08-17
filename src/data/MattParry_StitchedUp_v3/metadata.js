export const bookMetadata = {
  title: 'Stitched Up (v3)',
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
  }
}


