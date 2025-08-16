export const objects = [
  {
    id: 'german_rifle_fg42',
    name: 'German Rifle (FG42)',
    type: 'Weapon',
    description: 'German rifle discovered at Churn Rifle Ranges, where the assassins practiced their shooting. This provides evidence of the network\'s preparation for violent operations.',
    significance: 'Physical evidence of the network\'s violent intentions and preparation for assassination',
    events: ['rifle_discovery', 'churn_ranges_practice'],
    introducedInChapter: 'chapter_10',
    location: 'churn_rifle_ranges',
    characters: ['conspirators'],
    features: [
      'German military rifle',
      'Used for target practice',
      'Evidence of violent intentions',
      'Poor security allowed access'
    ]
  },
  {
    id: 'mysterious_suitcase',
    name: 'Mysterious Suitcase',
    type: 'Container',
    description: 'Suitcase delivered by Davies (using alias "Young") to Cynthia\'s house, believed to contain a radio for Nazi operations. Actually contained women\'s clothes.',
    significance: 'Shows the network\'s operational methods and use of disguises',
    events: ['suitcase_delivery', 'davies_disguise'],
    introducedInChapter: 'chapter_08',
    location: 'cynthia_house_bucklebury',
    characters: ['sir_john_davies', 'cynthia_childreth'],
    features: [
      'Heavy suitcase',
      'Believed to contain radio',
      'Actually contained women\'s clothes',
      'Delivered using alias'
    ]
  },
  {
    id: 'edwards_cheque_book',
    name: 'Edwards Cheque Book',
    type: 'Financial Document',
    description: 'Cheque book for T.G. Edwards found at Martins Bank, 68 Lombard Street, London. Used for financing Nazi operations.',
    significance: 'Financial evidence linking the network to Nazi operations',
    events: ['cheque_book_discovery', 'edwards_account_revealed'],
    introducedInChapter: 'chapter_11',
    location: 'martins_bank_london',
    characters: ['tg_edwards'],
    features: [
      'Bank cheque book',
      'Martins Bank account',
      'Lombard Street location',
      'Used for Nazi operations'
    ]
  },
  {
    id: 'postman_disguise',
    name: 'Postman Disguise',
    type: 'Disguise',
    description: 'Disguise used by a woman to murder T.G. Edwards in his London flat. The disguise included a postman\'s uniform.',
    significance: 'Demonstrates the network\'s use of sophisticated disguises for violent operations',
    events: ['edwards_murder', 'postman_disguise'],
    introducedInChapter: 'chapter_13',
    location: 'crawford_place_london',
    characters: ['murderer'],
    features: [
      'Postman\'s uniform',
      'Used by woman',
      'Effective disguise',
      'Aided escape'
    ]
  },
  {
    id: 'cynthia_house',
    name: 'Cynthia\'s House',
    type: 'Property',
    description: 'Cynthia and Richard\'s house in Bucklebury, used as a venue for Nazi sympathizer parties and later taken over by the Harringtons.',
    significance: 'Base for intelligence operations and Nazi sympathizer gatherings',
    events: ['first_party_bucklebury', 'second_party_mosley', 'suitcase_delivery', 'harringtons_takeover'],
    introducedInChapter: 'chapter_01',
    location: 'cynthia_house_bucklebury',
    characters: ['cynthia_childreth', 'richard_childreth', 'bob_harrington', 'louise_harrington'],
    features: [
      'Expansive house and gardens',
      'Party venue',
      'Intelligence operations base',
      'Later occupied by Harringtons'
    ]
  },
  {
    id: 'denleigh_manor_house',
    name: 'Denleigh Manor House',
    type: 'Property',
    description: 'Imposing Georgian country house in Wiltshire, owned by Lady Amelia Wyndholme and her husband Horace. Setting for the weekend party where Cynthia is recruited.',
    significance: 'Location of Cynthia\'s recruitment for British intelligence work',
    events: ['cynthia_arrives_denleigh', 'weekend_party_introductions', 'dinner_politics', 'cynthia_recruited'],
    introducedInChapter: 'chapter_01',
    location: 'denleigh_manor',
    characters: ['amy_wyndholme', 'horace_wyndholme', 'cynthia_childreth'],
    features: [
      'Georgian architecture',
      'Extensive gardens and grounds',
      'Trout lake',
      'Tennis courts',
      'Croquet lawn',
      'Stables',
      'Multiple guest bedrooms'
    ]
  },
  {
    id: 'hotel_adlon_building',
    name: 'Hotel Adlon Building',
    type: 'Building',
    description: 'Luxury hotel building in Berlin where Richard and Cynthia stay during their trip to Germany. Meeting place with German Nazi sympathizers.',
    significance: 'Location of meetings with German Nazi sympathizers and establishment of operational framework',
    events: ['berlin_trip', 'hotel_adlon_meeting', 'nazi_sympathizers_berlin'],
    introducedInChapter: 'chapter_04',
    location: 'hotel_adlon_berlin',
    characters: ['cynthia_childreth', 'richard_childreth', 'gerda_stammer', 'franz_stammer'],
    features: [
      'Luxury hotel',
      'Meeting rooms',
      'Reception areas',
      'High-class service',
      'Location near government buildings'
    ]
  },
  {
    id: 'churn_rifle_ranges_facility',
    name: 'Churn Rifle Ranges Facility',
    type: 'Military Facility',
    description: 'Rifle ranges facility where the conspirators practiced shooting, preparing for their assassination attempt. Poor security allowed unauthorized practice.',
    significance: 'Location where conspirators prepared for assassination attempt',
    events: ['rifle_discovery', 'churn_ranges_practice'],
    introducedInChapter: 'chapter_10',
    location: 'churn_rifle_ranges',
    characters: ['conspirators'],
    features: [
      'Rifle ranges',
      'Target practice facilities',
      'Poor security',
      'Unauthorized access possible',
      'Training grounds'
    ]
  },
  {
    id: 'edwards_london_flat',
    name: 'Edwards London Flat',
    type: 'Property',
    description: 'T.G. Edwards\' London flat in Crawford Place where he was murdered by a woman disguised as a postman.',
    significance: 'Scene of Edwards\' murder',
    events: ['edwards_murder', 'postman_disguise'],
    introducedInChapter: 'chapter_13',
    location: 'crawford_place_london',
    characters: ['tg_edwards', 'murderer'],
    features: [
      'London flat',
      'Residential building',
      'Urban location',
      'Accessible by postman'
    ]
  },
  {
    id: 'box_tunnel_structure',
    name: 'Box Tunnel Structure',
    type: 'Infrastructure',
    description: 'Railway tunnel structure on the main line where cases were switched during the train journey as part of the network\'s operational logistics.',
    significance: 'Location of case switching operation during train journey',
    events: ['train_journey', 'case_switching', 'box_tunnel_incident'],
    introducedInChapter: 'chapter_12',
    location: 'box_tunnel',
    characters: ['louise_harrington', 'sir_john_davies'],
    features: [
      'Railway tunnel',
      'Main line location',
      'Dark environment',
      'Operational advantage',
      'Surveillance difficulty'
    ]
  },
  {
    id: 'american_transport_camp',
    name: 'American Transport Division Camp',
    type: 'Military Facility',
    description: 'Military camp facility where Montgomery was scheduled to conduct an inspection, becoming the target of the assassination attempt.',
    significance: 'Target location for assassination attempt on Montgomery',
    events: ['assassination_attempt', 'montgomery_target', 'louise_intervention'],
    introducedInChapter: 'chapter_19',
    location: 'american_transport_division_camp',
    characters: ['montgomery', 'bob_harrington', 'louise_harrington'],
    features: [
      'Military facilities',
      'Inspection areas',
      'March past grounds',
      'Officers mess',
      'Security perimeter'
    ]
  },
  {
    id: 'louise_cottage_building',
    name: 'Louise\'s Cottage Building',
    type: 'Property',
    description: 'Louise Harrington\'s cottage building where she was killed in a suspicious gas explosion, likely orchestrated by remaining conspirators.',
    significance: 'Scene of Louise\'s murder',
    events: ['louise_gas_explosion', 'suspicious_death'],
    introducedInChapter: 'chapter_23',
    location: 'louise_cottage',
    characters: ['louise_harrington', 'remaining_conspirators'],
    features: [
      'Cottage building',
      'Gas supply',
      'Neighboring properties',
      'Rural location'
    ]
  },
  {
    id: 'atlantic_hotel_building',
    name: 'Atlantic Hotel Building',
    type: 'Building',
    description: 'Hotel building in the Isles of Scilly where Chief Inspector Bennet conducted surveillance operations, watching for suspicious activity.',
    significance: 'Base for Bennet\'s surveillance operation in Scilly Isles',
    events: ['atlantic_hotel_surveillance', 'suspicious_activity_watch'],
    introducedInChapter: 'chapter_27',
    location: 'atlantic_hotel',
    characters: ['george_bennet'],
    features: [
      'Hotel building',
      'Observation windows',
      'Restaurant facilities',
      'Strategic location',
      'Surveillance base'
    ]
  },
  {
    id: 'steamship_company_office',
    name: 'Steamship Company Office',
    type: 'Building',
    description: 'Office building in Hugh Town where tickets to Penzance can be purchased, used by German agents for mainland travel.',
    significance: 'Transport booking office used by infiltrating agents',
    events: ['german_infiltration_scilly'],
    introducedInChapter: 'preface',
    location: 'steamship_company_offices',
    characters: ['helmut_schnitter'],
    features: [
      'Office building',
      'Ticket sales',
      'Travel information',
      'Customer service',
      'Transport hub'
    ]
  },
  {
    id: 'bishop_wolf_pub_building',
    name: 'Bishop and Wolf Pub Building',
    type: 'Building',
    description: 'Pub building in Hugh Town where Bennet conducted surveillance, reading his newspaper while watching for suspicious activity.',
    significance: 'Surveillance location for Bennet\'s operation',
    events: ['bennet_scilly_investigation'],
    introducedInChapter: 'chapter_25',
    location: 'bishop_and_wolf_pub',
    characters: ['george_bennet'],
    features: [
      'Pub building',
      'Surveillance vantage point',
      'Local gathering place',
      'Cover for observation'
    ]
  },
  {
    id: 'martins_bank_building',
    name: 'Martins Bank Building',
    type: 'Building',
    description: 'Bank building in London where T.G. Edwards maintained an account used for Nazi operations. Located in the financial district.',
    significance: 'Financial institution used by Nazi network',
    events: ['cheque_book_discovery', 'edwards_account_revealed'],
    introducedInChapter: 'chapter_11',
    location: 'martins_bank_london',
    characters: ['tg_edwards'],
    features: [
      'Bank building',
      'Lombard Street location',
      'Account services',
      'Cheque facilities',
      'Professional banking'
    ]
  },
  {
    id: 'old_town_church',
    name: 'Old Town Church',
    type: 'Building',
    description: 'Church building in Old Town Bay, Isles of Scilly, with the unusual grave of Naval Surgeon Abraham Leggatt.',
    significance: 'Location of historical interest visited by Bennet during surveillance',
    events: ['bennet_scilly_investigation'],
    introducedInChapter: 'chapter_25',
    location: 'old_town_bay',
    characters: ['george_bennet'],
    features: [
      'Church building',
      'Unusual grave',
      'Historical interest',
      'Tourist attraction'
    ]
  },
  {
    id: 'cynthia_obe_medal',
    name: 'Cynthia\'s OBE Medal',
    type: 'Award',
    description: 'Order of the British Empire (OBE) medal awarded to Cynthia for "services to war work" in recognition of her contribution to British intelligence operations.',
    significance: 'Recognizes Cynthia\'s contribution to British intelligence and the war effort',
    events: ['cynthia_obe'],
    introducedInChapter: 'chapter_24',
    location: 'uk',
    characters: ['cynthia_childreth'],
    features: [
      'OBE medal',
      'Royal honor',
      'Services to war work',
      'Recognition of contribution'
    ]
  },
  {
    id: 'knitting_needles',
    name: 'Knitting Needles',
    type: 'Tool',
    description: 'Knitting needles used by Louise Harrington, representing her signature trait and the network\'s name "the knitters".',
    significance: 'Symbolic representation of the network\'s identity and Louise\'s character',
    events: ['louise_betrayal'],
    introducedInChapter: 'chapter_01',
    location: 'various',
    characters: ['louise_harrington'],
    features: [
      'Knitting tools',
      'Louise\'s signature trait',
      'Network symbolism',
      'Domestic appearance'
    ]
  },
  {
    id: 'german_submarine',
    name: 'German Submarine',
    type: 'Vehicle',
    description: 'Type VIIC U-boat used to transport German agent Helmut Schnitter to the Isles of Scilly for infiltration into the UK.',
    significance: 'Method of German infiltration into the UK',
    events: ['german_infiltration_scilly'],
    introducedInChapter: 'preface',
    location: 'scilly_isles',
    characters: ['helmut_schnitter'],
    features: [
      'Type VIIC U-boat',
      'German submarine',
      'Infiltration vehicle',
      'Covert operation'
    ]
  },
  {
    id: 'inflatable_boat',
    name: 'Inflatable Boat',
    type: 'Vehicle',
    description: 'Small black inflatable boat used to transport Helmut Schnitter from the submarine to the shore of the Isles of Scilly.',
    significance: 'Landing craft for German infiltration',
    events: ['german_infiltration_scilly'],
    introducedInChapter: 'preface',
    location: 'scilly_isles',
    characters: ['helmut_schnitter'],
    features: [
      'Small inflatable boat',
      'Black color',
      'Landing craft',
      'Covert operation'
    ]
  },
  {
    id: 'scillonian_steamship',
    name: 'Scillonian Steamship',
    type: 'Vehicle',
    description: 'Regular steamship service from the Isles of Scilly to Penzance, used by German agents for mainland travel.',
    significance: 'Regular transport service used for infiltration',
    events: ['german_infiltration_scilly'],
    introducedInChapter: 'preface',
    location: 'scilly_isles',
    characters: ['helmut_schnitter'],
    features: [
      'Regular steamship service',
      'Scilly to Penzance route',
      'Public transport',
      'Infiltration method'
    ]
  },
  {
    id: 'cynthia_alvis_car',
    name: 'Cynthia\'s Alvis Car',
    type: 'Vehicle',
    description: 'Dark green 1931 Alvis 12/50 tourer owned by Cynthia, one of her few indulgences. 1500cc engine making it quite an exceptional sports car.',
    significance: 'Shows Cynthia\'s wealth and independence',
    events: ['cynthia_arrives_denleigh'],
    introducedInChapter: 'chapter_01',
    location: 'denleigh_manor',
    characters: ['cynthia_childreth'],
    features: [
      '1931 Alvis 12/50 tourer',
      'Dark green color',
      '1500cc engine',
      'Sports car',
      'Luxury vehicle'
    ]
  },
  {
    id: 'green_car_snowden',
    name: 'Green Car (Snowden)',
    type: 'Vehicle',
    description: 'Green car discovered outside Cynthia\'s house, potentially linking to the Snowdens and their involvement in operations.',
    significance: 'Potential evidence linking Snowdens to operations',
    events: ['green_car_discovery', 'snowden_car_link'],
    introducedInChapter: 'chapter_35',
    location: 'cynthia_house_bucklebury',
    characters: ['peter_snowden', 'marjorie_snowden'],
    features: [
      'Green color',
      'Car outside Cynthia\'s house',
      'Potential Snowden ownership',
      'Operational link'
    ]
  },
  {
    id: 'harrington_car',
    name: 'Harrington Car',
    type: 'Vehicle',
    description: 'Car used by Bob Harrington for his mysterious 40-minute trip, potentially visiting a hidden location.',
    significance: 'Vehicle used for operational activities',
    events: ['harrington_mystery_trip', 'hidden_location_visit'],
    introducedInChapter: 'chapter_36',
    location: 'aldworth',
    characters: ['bob_harrington'],
    features: [
      'Personal vehicle',
      'Used for operational trips',
      '40-minute journey capability',
      'Operational mobility'
    ]
  },
  {
    id: 'surveillance_equipment',
    name: 'Surveillance Equipment',
    type: 'Equipment',
    description: 'Various surveillance equipment used by British intelligence teams to monitor the conspirators in their villages.',
    significance: 'Tools used for intelligence gathering operations',
    events: ['aldworth_surveillance', 'ashampstead_watch', 'yattendon_observation'],
    introducedInChapter: 'chapter_31',
    location: 'various',
    characters: ['intelligence_teams'],
    features: [
      'Surveillance tools',
      'Monitoring equipment',
      'Intelligence gathering',
      'Operational support'
    ]
  },
  {
    id: 'art_supplies_bert',
    name: 'Art Supplies (Bert)',
    type: 'Equipment',
    description: 'Art supplies used by Bert as cover for surveillance operations, including easel and painting materials.',
    significance: 'Cover story for surveillance operations',
    events: ['aldworth_surveillance', 'harrington_monitoring'],
    introducedInChapter: 'chapter_14',
    location: 'aldworth',
    characters: ['bert'],
    features: [
      'Easel',
      'Painting materials',
      'Artistic cover',
      'Surveillance disguise'
    ]
  },
  {
    id: 'telephone_network',
    name: 'Telephone Network',
    type: 'Infrastructure',
    description: 'Telephone network used by conspirators for communication and coordination of their operations.',
    significance: 'Communication method for the Nazi network',
    events: ['surveillance_increased', 'intelligence_monitoring'],
    introducedInChapter: 'chapter_09',
    location: 'various',
    characters: ['conspirators'],
    features: [
      'Telephone communication',
      'Network coordination',
      'Operational planning',
      'Surveillance target'
    ]
  },
  {
    id: 'railway_network',
    name: 'Railway Network',
    type: 'Infrastructure',
    description: 'British railway network used by conspirators for travel and case switching operations, including Box Tunnel.',
    significance: 'Transport infrastructure used for operational logistics',
    events: ['train_journey', 'case_switching', 'box_tunnel_incident'],
    introducedInChapter: 'chapter_12',
    location: 'uk',
    characters: ['tg_edwards', 'louise_harrington', 'sir_john_davies'],
    features: [
      'Main line railway',
      'Box Tunnel location',
      'Case switching advantage',
      'Operational logistics'
    ]
  }
];
