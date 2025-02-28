export const locationsData = [
  {
    id: 'cynthia_house',
    name: 'Cynthia\'s House',
    area: 'Bucklebury, Berkshire',
    type: 'Country house',
    features: [
      'Large Georgian country estate',
      'Extensive gardens with flower beds and summerhouse',
      'Tower/studio room originally used by Cynthia\'s mother for painting, with 360° views',
      'Multiple entrances including front door, back door, conservatory, and cellar entrance',
      'Cellar with external entrance used for storing wine and plants in winter',
      'Flat roof accessible from tower studio'
    ],
    significance: [
      'Cynthia\'s childhood home and permanent residence',
      'Site of two parties gathering Nazi sympathizers for intelligence collection',
      'Location of attempted assassination of Montgomery',
      'Strategic vantage point with view of Bucklebury Common and American camp'
    ],
    description: 'Isolated country house with tower providing view of Bucklebury Common. Surrounded by trees but with clear sight lines in key directions. Multiple entrances and large grounds make it both useful for intelligence gathering and vulnerable to infiltration.',
    events: [
      { eventId: 'first_party', role: 'setting' },
      { eventId: 'second_party', role: 'setting' },
      { eventId: 'assassination_attempt', role: 'critical_location' }
    ],
    occupants: [
      { characterId: 'cynthia_childreth', relationship: 'owner' },
      { characterId: 'richard_childreth', relationship: 'resident' },
      { characterId: 'mary', relationship: 'secretary_resident' }
    ],
    rooms: [
      { name: 'Studio Tower', significance: 'Vantage point used for assassination attempt, 360° views' },
      { name: 'Library/Office', significance: 'Where Cynthia conducts business and where suitcase was stored' },
      { name: 'Cellar', significance: 'Alternative entrance used during final operation' },
      { name: 'Conservatory', significance: 'Used for entertaining during parties' }
    ]
  },
  {
    id: 'denleigh_manor',
    name: 'Denleigh Manor',
    area: 'Wiltshire',
    type: 'Country house',
    features: [
      'Imposing Georgian architecture',
      'Large dining room with highly polished walnut table',
      'Extensive gardens and grounds',
      'Tennis courts and croquet lawn'
    ],
    significance: [
      'Where Cynthia is recruited for intelligence work',
      'First meeting place of main characters',
      'Gathering point for Nazi sympathizers',
      'Beginning of the operation against fifth columnists'
    ],
    description: 'Elegant country estate owned by Lady Amelia Wyndholme, Cynthia\'s old school friend. Setting for weekend gatherings of the social elite, including those with Nazi sympathies.',
    owner: 'Amy and Horace Wyndholme',
    events: [
      { eventId: 'cynthia_recruitment', role: 'setting' }
    ],
    occupants: [
      { characterId: 'amy_wyndholme', relationship: 'owner' },
      { characterId: 'horace_wyndholme', relationship: 'owner' }
    ]
  },
  {
    id: 'hotel_adlon',
    name: 'Hotel Adlon',
    area: 'Berlin, Germany',
    type: 'Luxury hotel',
    features: [
      'Japanese garden in lobby with bronze water-lily fountain',
      'Bar and restaurant',
      'Marble columns',
      'Multiple lounges and function rooms',
      'Located near Brandenburg Gate'
    ],
    significance: [
      'Where Richard and Cynthia meet German Nazi sympathizers',
      'Where they briefly see Hitler',
      'Base of operations during Berlin mission',
      'Gateway to German high society'
    ],
    description: 'Opulent, historical hotel built in 1907 in the government quarter near Brandenburg Gate. Frequented by diplomats, wealthy travelers, and Nazi officials. Notable for its luxury and prestige in 1930s Berlin.',
    events: [
      { eventId: 'berlin_trip', role: 'setting' },
      { eventId: 'hitler_sighting', role: 'setting' }
    ],
    proximity: [
      { locationId: 'british_embassy', description: 'Next door to hotel' },
      { locationId: 'french_embassy', description: 'Directly opposite on Pariser Platz' },
      { locationId: 'reich_chancellery', description: 'Short distance away' }
    ]
  },
  {
    id: 'churn_ranges',
    name: 'Churn Rifle Ranges',
    area: 'Berkshire Downs',
    type: 'Military facility',
    features: [
      'Outdoor shooting range with target lines',
      'Basic security consisting of chain-link fence and padlock',
      'Limited supervision',
      'Accessible via dirt track off main road'
    ],
    significance: [
      'Where the assassins tested the German sniper rifle',
      'Location where 7.92mm shell casing was found',
      'Evidence connecting conspirators to assassination plot'
    ],
    description: 'Army rifle range with poor security, originally a private facility commandeered by British Army. Used mainly on Wednesdays by cadets from local public schools, otherwise lightly used.',
    events: [
      { eventId: 'rifle_testing', role: 'setting' }
    ],
    accessibility: 'Easily accessible by foot from railway at Churn Halt station.'
  },
  {
    id: 'bucklebury_camp',
    name: 'American Transport Division Camp',
    area: 'Bucklebury Common, Berkshire',
    type: 'Military camp',
    features: [
      'Temporary military installations',
      'Vehicle depot',
      'Concrete loading areas constructed by American troops',
      'Camouflaged from air observation',
      'Multiple access points'
    ],
    significance: [
      'Target location for Montgomery\'s inspection',
      'Planned assassination site',
      'Located near Cynthia\'s house providing vantage point'
    ],
    description: 'American military camp established on Bucklebury Common, visible from Cynthia\'s tower. Despite camouflage from air, activities clearly visible from higher ground nearby.',
    events: [
      { eventId: 'montgomery_visit', role: 'setting' }
    ],
    security: 'Basic checkpoint security with portable barrier across access road, but otherwise open terrain.'
  }
];