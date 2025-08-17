export const locations = [
  {
    id: 'street_door',
    name: 'The Mysterious Door',
    area: 'London',
    type: 'Alley door and passage',
    features: ['Shabby door', 'Back entrance connected to Jekyll’s laboratory'],
    significance: ['Introduces Hyde via Enfield’s tale', 'Utterson confronts Hyde here'],
    description: 'A sinister, neglected door in a by-street connected to the rear of Dr. Jekyll’s house.',
    introducedInChapter: 'chapter_01',
    events: [ { eventId: 'story_of_the_door', role: 'setting' }, { eventId: 'search_for_mr_hyde', role: 'stakeout' } ],
    occupants: [],
    proximity: [ { locationId: 'jekyll_laboratory', description: 'Connected via passage from the rear' } ]
  },
  {
    id: 'jekyll_house',
    name: 'Dr. Jekyll’s House',
    area: 'London',
    type: 'Townhouse',
    features: ['Front door', 'Dining room', 'Study'],
    significance: ['Social dinners', 'Jekyll’s withdrawal from society'],
    description: 'A large, respectable townhouse with a front entrance on a square and a rear wing leading to the old laboratory.',
    introducedInChapter: 'chapter_03',
    events: [ { eventId: 'jekyll_dinner', role: 'host' } ],
    occupants: [ { characterId: 'henry_jekyll', relationship: 'owner' }, { characterId: 'poole', relationship: 'servant' } ]
  },
  {
    id: 'jekyll_laboratory',
    name: 'Jekyll’s Laboratory',
    area: 'London',
    type: 'Laboratory and cabinet',
    features: ['Operating theatre', 'Cabinet', 'Chemical bench'],
    significance: ['Transformations occur here', 'Final discovery of Hyde’s body'],
    description: 'An old dissecting room and cabinet connected to the back of Jekyll’s house, used for his secret experiments.',
    introducedInChapter: 'chapter_08',
    events: [ { eventId: 'the_last_night', role: 'discovery' }, { eventId: 'jekyll_full_statement', role: 'confession_origin' } ],
    occupants: []
  },
  {
    id: 'hyde_soho_house',
    name: 'Hyde’s Soho Rooms',
    area: 'Soho, London',
    type: 'Lodgings',
    features: ['Tasteful furnishings', 'Disordered bed'],
    significance: ['Searched by police after Carew’s murder'],
    description: 'Hyde’s well-furnished but sinister-feeling lodgings in Soho.',
    introducedInChapter: 'chapter_04',
    events: [ { eventId: 'carew_murder', role: 'searched_after' } ],
    occupants: [ { characterId: 'edward_hyde', relationship: 'resident' } ]
  },
  {
    id: 'lanyon_house',
    name: 'Dr. Lanyon’s House',
    area: 'Cavendish Square, London',
    type: 'Residence',
    features: ['Respectable chambers'],
    significance: ['Site of the witnessed transformation as per Lanyon’s narrative'],
    description: 'The respectable home of Dr. Lanyon where the climactic transformation was witnessed.',
    introducedInChapter: 'chapter_06',
    events: [ { eventId: 'remarkable_incident_of_dr_lanyon', role: 'illness_origin' }, { eventId: 'dr_lanyon_narrative', role: 'transformation_scene' } ],
    occupants: [ { characterId: 'hastie_lanyon', relationship: 'resident' } ]
  },
  {
    id: 'carew_murder_site',
    name: 'Carew Murder Site',
    area: 'London',
    type: 'Street',
    features: ['Foggy night', 'Street lamp'],
    significance: ['Scene of Sir Danvers Carew’s murder'],
    description: 'A street where Sir Danvers Carew was brutally murdered by Hyde.',
    introducedInChapter: 'chapter_04',
    events: [ { eventId: 'carew_murder', role: 'crime_scene' } ]
  },
  {
    id: 'utterson_chambers',
    name: 'Utterson’s Chambers',
    area: 'London (Temple)',
    type: 'Law office/chambers',
    features: ['Clerk office', 'Document storage'],
    significance: ['Handwriting comparison of the letter'],
    description: 'The office where Utterson works with his clerk Guest.',
    introducedInChapter: 'chapter_05',
    events: [ { eventId: 'incident_of_the_letter', role: 'analysis_site' } ]
  },
  {
    id: 'jekyll_courtyard',
    name: 'Jekyll’s Courtyard',
    area: 'London',
    type: 'Courtyard/garden',
    features: ['Window to Jekyll’s cabinet'],
    significance: ['Window incident observed by Utterson and Enfield'],
    description: 'A yard behind Jekyll’s house with a window into his cabinet.',
    introducedInChapter: 'chapter_07',
    events: [ { eventId: 'incident_at_the_window', role: 'viewpoint' } ]
  }
];


