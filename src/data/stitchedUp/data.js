// Consolidated data file for "Stitched Up" book

// Character data
export const characters = [
    {
      id: 'cynthia_childreth',
      name: 'Lady Cynthia Childreth',
      title: 'Lady',
      group: 'Protagonists',
      role: 'Main protagonist, undercover operative',
      background: 'Wealthy aristocrat from Bucklebury, inheritor of a large country estate. Educated abroad and speaks French and German fluently despite claiming otherwise to Nazi sympathizers. Unconventional aristocrat who shuns many typical social events, preferring to live "in the shadows" despite her position.',
      personality: 'Independent, observant, quick-thinking, adaptable. Not comfortable with class expectations. Has a natural talent for intelligence work despite initial reluctance.',
      traits: ['Multilingual', 'Well-traveled', 'Independent thinker', 'Adaptable', 'Observant'],
      relations: [
        { characterId: 'richard_childreth', type: 'spouse', description: 'Marriage of convenience where both have had "dalliances"' },
        { characterId: 'amy_wyndholme', type: 'friend', description: 'Old school friend who facilitates her recruitment' },
        { characterId: 'bill_laurie', type: 'handler', description: 'Intelligence handler who respects her abilities' },
        { characterId: 'mary', type: 'employee_friend', description: 'Secretary, confidante, and ally throughout operations' },
        { characterId: 'peter_snowden', type: 'adversary', description: 'Nazi sympathizer she must monitor' },
        { characterId: 'louise_harrington', type: 'complex', description: 'Initially an adversary, later revealed as ally' }
      ],
      development: [
        { phase: 'Beginning', description: 'Socialite with unconventional views, recruited at Denleigh Manor' },
        { phase: 'Middle', description: 'Reluctant intelligence asset, hosting parties for Nazi sympathizers while collecting information' },
        { phase: 'Crisis', description: 'Held captive in her home during assassination attempt, maintaining composure under pressure' },
        { phase: 'End', description: 'Effective operative who played crucial role in foiling assassination plot, honored with OBE' }
      ],
      fate: 'Receives OBE for "services to war work" in recognition of her intelligence contributions',
      key_scenes: ['denleigh_recruitment', 'berlin_trip', 'first_party', 'second_party', 'assassination_attempt']
    },
    {
      id: 'richard_childreth',
      name: 'Richard Childreth',
      group: 'Protagonists',
      role: 'Cynthia\'s husband, banker, supporting operative',
      background: 'Self-made financier who worked his way to top position through "hard graft and determination." Served in Royal Berkshires during WWI, arriving just in time for Passchendaele in 1917.',
      personality: 'Practical, professional, supportive of Cynthia. More comfortable with straightforward business matters than espionage intrigue.',
      traits: ['Financially astute', 'Loyal', 'Pragmatic', 'Veteran of WWI'],
      relations: [
        { characterId: 'cynthia_childreth', type: 'spouse', description: 'Marriage of convenience that functions well professionally' },
        { characterId: 'bill_laurie', type: 'handler', description: 'Operational contact for banking aspects of mission' }
      ],
      development: [
        { phase: 'Beginning', description: 'Banker drawn into intelligence work through Cynthia' },
        { phase: 'Middle', description: 'Creates bank account for Nazi operations to track financial movements' },
        { phase: 'End', description: 'Continues supporting Cynthia through final operation' }
      ],
      key_scenes: ['berlin_trip', 'bank_meeting', 'assassination_attempt']
    },
    {
      id: 'bill_laurie',
      name: 'Wing Commander William Laurie',
      group: 'Protagonists',
      role: 'Intelligence officer, Cynthia\'s handler',
      background: 'Former RFC/RAF pilot injured in WWI over the Somme. After recovery, was seconded to intelligence work rather than returning to flying duty. Rose to rank of Wing Commander (later Group Captain).',
      personality: 'Strategic, cautious, intelligent. Expert at planning long-term intelligence operations and managing assets.',
      traits: ['Military background', 'Strategic thinker', 'Patient', 'Forward-planning'],
      relations: [
        { characterId: 'cynthia_childreth', type: 'asset', description: 'Recruits and handles Cynthia, respects her abilities' },
        { characterId: 'hannah_park', type: 'colleague', description: 'Works closely with Hannah on operations' },
        { characterId: 'jane_maclean', type: 'colleague', description: 'Works closely with Jane on operations' },
        { characterId: 'edwin', type: 'subordinate', description: 'Edwin is Bill\'s "minder" and operational support' },
        { characterId: 'george_bennet', type: 'colleague', description: 'Collaborates with Special Branch on cross-department operations' },
        { characterId: 'louise_harrington', type: 'asset', description: 'Secret informant within the fifth columnist group' }
      ],
      aliases: ['Mr. Newton (at Denleigh Manor)'],
      key_scenes: ['denleigh_recruitment', 'operation_planning', 'assassination_prevention']
    },
    {
      id: 'hannah_park',
      name: 'Hannah Park',
      group: 'Protagonists',
      role: 'Intelligence agent',
      background: 'Former Section Controller in WAACs until they disbanded in 1921. Subsequently recruited to intelligence work.',
      personality: 'Bold, unconventional, adaptable. Master of disguise who can completely transform her appearance.',
      traits: ['Master of disguise', 'Provocative', 'Adaptable', 'Quick-thinking'],
      relations: [
        { characterId: 'bill_laurie', type: 'colleague', description: 'Works under Bill\'s direction on operations' },
        { characterId: 'jane_maclean', type: 'partner', description: 'Close working partnership, often operate together' }
      ],
      aliases: ['Miss Gilchrist (at Denleigh, deliberately provocative with monocle and masculine attire)', 'Blonde society lady (at the Ritz)'],
      key_scenes: ['denleigh_recruitment', 'ritz_meeting', 'final_operation']
    },
    {
      id: 'louise_harrington',
      name: 'Louise Harrington',
      group: 'Fifth Columnists',
      role: 'Fifth columnist who becomes double agent',
      background: 'University educated at Girton College, linguistics graduate. Expert marksman from university shooting club. Initially believed in National Socialism but became disillusioned with growing extremism.',
      personality: 'Cunning, adaptable, morally complex. Began as true believer but developed doubts about Nazi methods.',
      traits: ['Knitter', 'Intelligent', 'Morally complex', 'Excellent shot', 'Multilingual'],
      relations: [
        { characterId: 'bob_harrington', type: 'spouse', description: 'Marriage increasingly strained by her changing views' },
        { characterId: 'bill_laurie', type: 'handler', description: 'Secret informant relationship after disillusionment' },
        { characterId: 'gerda_stammer', type: 'associate', description: 'Connection to German Nazi supporters' }
      ],
      development: [
        { phase: 'Beginning', description: 'Committed Nazi sympathizer and leader of UK network' },
        { phase: 'Middle', description: 'Growing disillusionment with Nazi violence and extremism' },
        { phase: 'Turn', description: 'Secret cooperation with British intelligence' },
        { phase: 'End', description: 'Prevents assassination attempt, fully revealed as double agent' }
      ],
      aliases: ['Grey-haired lady on train'],
      fate: 'Killed in suspicious gas explosion after events, likely murdered by remaining Nazi sympathizers',
      key_scenes: ['denleigh_manor', 'berlin_trip', 'train_journey', 'rifle_practice', 'assassination_prevention']
    },
    {
      id: 'bob_harrington',
      name: 'Bob Harrington',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, trained marksman',
      background: 'Medical orderly in WWI, seconded for "special duties"',
      personality: 'Determined, obsessive about weapons',
      traits: ['Meticulous', 'Fanatical'],
      fate: 'Shot in hand, arrested and imprisoned'
    },
    {
      id: 'john_davies',
      name: 'Sir John Davies',
      title: 'Sir',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, pro-Nazi sympathizer',
      background: 'Welsh landowner',
      personality: 'Arrogant, commanding',
      traits: ['Authoritative', 'Wealthy landowner'],
      fate: 'Shot in arm, arrested and imprisoned'
    },
    {
      id: 'megan_davies',
      name: 'Lady Megan Davies',
      title: 'Lady',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, most fanatical of the group',
      background: 'Daughter of a Welsh rector',
      personality: 'Appears mousey but is extremely dedicated to the cause',
      traits: ['Deceptively meek appearance', 'Fanatically devoted to Nazi cause'],
      fate: 'Escaped to Ireland'
    },
    {
      id: 'peter_snowden',
      name: 'Colonel Peter Snowden',
      title: 'Colonel (claimed), actually Major',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, pro-Nazi sympathizer',
      fate: 'Escaped to Ireland'
    },
    {
      id: 'marjorie_snowden',
      name: 'Marjorie Snowden',
      group: 'Fifth Columnists',
      role: 'Fifth columnist, pro-Nazi sympathizer',
      fate: 'Escaped to Ireland'
    },
    {
      id: 'gerda_stammer',
      name: 'Gerda Stammer',
      group: 'German Connection',
      role: 'German Nazi sympathizer',
      traits: ['Enthusiastic Hitler supporter']
    },
    {
      id: 'mary',
      name: 'Mary',
      group: 'Protagonists',
      role: 'Cynthia\'s secretary and confidante'
    },
    {
      id: 'amy_wyndholme',
      name: 'Amy Wyndholme',
      group: 'Supporting Characters',
      role: 'Cynthia\'s old school friend, facilitates recruitment'
    },
    {
      id: 'jane_maclean',
      name: 'Jane Maclean',
      group: 'Protagonists',
      role: 'Intelligence agent'
    },
    {
      id: 'george_bennet',
      name: 'George Bennet',
      group: 'Protagonists',
      role: 'Special Branch officer'
    },
    {
      id: 'edwin',
      name: 'Edwin',
      group: 'Protagonists',
      role: 'Bill\'s "minder" and operational support'
    },
    {
      id: 'franz_stammer',
      name: 'Franz Stammer',
      group: 'German Connection',
      role: 'Works at the Reichsbank'
    },
    {
      id: 'lena_weber',
      name: 'Lena Weber',
      group: 'German Connection',
      role: 'Original member of the German pro-Nazi group'
    },
    {
      id: 'edwards',
      name: 'T.G. Edwards',
      group: 'German Connection',
      role: 'German agent',
      fate: 'Murdered in London flat'
    },
    {
      id: 'jim',
      name: 'Jim',
      group: 'Supporting Characters',
      role: 'George\'s colleague at Special Branch'
    }
  ];
  
  // Location data
  export const locations = [
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
    },
    {
      id: 'scilly_isles',
      name: 'Scilly Isles',
      area: 'Cornwall',
      type: 'Island',
      significance: [
        'Entry point for German agents',
        'Weakly defended coastal area'
      ],
      description: 'Remote island archipelago off the southwest coast of England.'
    },
    {
      id: 'crawford_place',
      name: 'Crawford Place Flat',
      area: 'London',
      type: 'Apartment',
      significance: [
        'Where Edwards was murdered'
      ],
      description: 'Small flat in London where the German agent Edwards was staying.'
    }
  ];
  
  // Event data
  export const events = [
    {
      id: 'german_infiltration',
      title: 'German Infiltration via Scilly Isles',
      date: 'Summer 1943',
      description: 'Helmut Schnitter arrives via U-boat at Scilly Isles, posing as a visitor. MI5 receives intelligence about German infiltration attempts.',
      location: 'scilly_isles',
      characters: [
        { characterId: 'helmut_schnitter', role: 'agent' }
      ],
      significance: 'Establishes vulnerability of UK coast and German infiltration methods',
      chapter: 'Preface',
      keyActions: [
        'U-boat delivery of German agent',
        'Agent traveling to mainland via Scillonian steamship',
        'No documentation checks required for travel'
      ]
    },
    {
      id: 'cynthia_recruitment',
      title: 'Cynthia\'s Recruitment',
      date: 'May 1932',
      description: 'Cynthia attends weekend at Denleigh Manor where she is approached by intelligence officers Bill and Hannah about helping with national security.',
      location: 'denleigh_manor',
      characters: [
        { characterId: 'cynthia_childreth', role: 'recruit' },
        { characterId: 'richard_childreth', role: 'support' },
        { characterId: 'bill_laurie', role: 'recruiter', disguise: 'Mr. Newton' },
        { characterId: 'hannah_park', role: 'recruiter', disguise: 'Miss Gilchrist' },
        { characterId: 'jane_maclean', role: 'recruiter' },
        { characterId: 'peter_snowden', role: 'target' },
        { characterId: 'marjorie_snowden', role: 'target' },
        { characterId: 'bob_harrington', role: 'target' },
        { characterId: 'louise_harrington', role: 'target' },
        { characterId: 'amy_wyndholme', role: 'facilitator' }
      ],
      significance: 'Beginning of Cynthia\'s involvement in intelligence operations against Nazi sympathizers',
      keyActions: [
        'Secret meeting in garden with Bill and Hannah',
        'Discussion of potential security threat',
        'Cynthia agreed to infiltrate circle of Nazi sympathizers'
      ]
    },
    {
      id: 'berlin_trip',
      title: 'Berlin Trip',
      date: '1932-1933',
      description: 'Richard and Cynthia travel to Berlin on business pretext, stay at Hotel Adlon, meet Nazi sympathizers and establish cover as Nazi supporters.',
      location: 'hotel_adlon',
      characters: [
        { characterId: 'cynthia_childreth', role: 'operative' },
        { characterId: 'richard_childreth', role: 'operative' },
        { characterId: 'gerda_stammer', role: 'contact' },
        { characterId: 'franz_stammer', role: 'contact' },
        { characterId: 'lena_weber', role: 'contact' }
      ],
      significance: 'Establishes Cynthia and Richard as sympathetic to Nazi cause for future operations',
      keyActions: [
        'Meetings at Reichsbank',
        'Social gatherings at Hotel Adlon',
        'Pretending limited German language ability',
        'Expressing subtle support for National Socialism'
      ]
    },
    {
      id: 'hitler_sighting',
      title: 'Hitler Reception',
      date: '1932-1933',
      description: 'Brief appearance of Hitler at a reception at Hotel Adlon, attended by Richard and Cynthia among other guests.',
      location: 'hotel_adlon',
      characters: [
        { characterId: 'cynthia_childreth', role: 'observer' },
        { characterId: 'richard_childreth', role: 'observer' },
        { characterId: 'bob_harrington', role: 'attendee' },
        { characterId: 'louise_harrington', role: 'attendee' },
        { characterId: 'john_davies', role: 'attendee' },
        { characterId: 'megan_davies', role: 'attendee' }
      ],
      significance: 'First revelation that the Harringtons and Davies were already connected to Nazi high society',
      keyActions: [
        'Hitler enters reception with bodyguards',
        'Adulation from German supporters',
        'Observation of British guests interacting with Hitler'
      ]
    },
    {
      id: 'first_party',
      title: 'First Party at Cynthia\'s House',
      date: 'May 27 (year unspecified)',
      description: 'Gathering of Nazi sympathizers at Cynthia\'s home, with intelligence agents observing and German visitors present.',
      location: 'cynthia_house',
      characters: [
        { characterId: 'cynthia_childreth', role: 'host' },
        { characterId: 'richard_childreth', role: 'host' },
        { characterId: 'gerda_stammer', role: 'guest' },
        { characterId: 'lena_weber', role: 'guest' },
        { characterId: 'peter_snowden', role: 'guest' },
        { characterId: 'marjorie_snowden', role: 'guest' },
        { characterId: 'bob_harrington', role: 'guest' },
        { characterId: 'louise_harrington', role: 'guest' },
        { characterId: 'john_davies', role: 'guest' },
        { characterId: 'megan_davies', role: 'guest' },
        { characterId: 'bill_laurie', role: 'undercover', disguise: 'Mr. Newton' },
        { characterId: 'hannah_park', role: 'undercover', disguise: 'Miss Gilchrist' },
        { characterId: 'jane_maclean', role: 'undercover' }
      ],
      significance: 'First gathering of Nazi sympathizers under observation, establishing network connections',
      keyActions: [
        'Marjorie and Lena search Cynthia\'s office',
        'Political discussions revealing Nazi sympathies',
        'Bill and team gathering intelligence on attendees'
      ]
    },
    {
      id: 'second_party',
      title: 'Second Party at Cynthia\'s House',
      date: 'July 7 (year unspecified)',
      description: 'Second gathering with Oswald Mosley in attendance, revealing deeper connections and plans.',
      location: 'cynthia_house',
      characters: [
        { characterId: 'cynthia_childreth', role: 'host' },
        { characterId: 'richard_childreth', role: 'host' },
        { characterId: 'peter_snowden', role: 'guest' },
        { characterId: 'marjorie_snowden', role: 'guest' },
        { characterId: 'bob_harrington', role: 'guest' },
        { characterId: 'louise_harrington', role: 'guest' },
        { characterId: 'john_davies', role: 'guest' },
        { characterId: 'megan_davies', role: 'guest' },
        { characterId: 'oswald_mosley', role: 'special_guest' }
      ],
      significance: 'Introduction of Mosley element and request for Cynthia\'s house as safe house',
      keyActions: [
        'Mosley arrives with bodyguards',
        'Mosley asks Cynthia to act as safe house',
        'Further intelligence gathered on fifth columnist network'
      ]
    },
    {
      id: 'edwards_arrival',
      title: 'Edwards Arrives in Scilly Isles',
      date: '1943',
      description: 'German agent Edwards arrives at Scilly Isles and travels to Penzance',
      location: 'scilly_isles',
      characters: [
        { characterId: 'edwards', role: 'agent' },
        { characterId: 'george_bennet', role: 'surveillance' }
      ],
      significance: 'Beginning of final operation that leads to assassination attempt',
      keyActions: [
        'Edwards arrives by boat',
        'Pays with distinctive cheque from Martins Bank',
        'Followed by George Bennet'
      ]
    },
    {
      id: 'train_journey',
      title: 'The Critical Train Journey',
      date: '1943',
      description: 'Edwards, Davies (as Young), and Louise (disguised with grey hair) travel by train from Penzance to London, with case switch occurring',
      location: 'train',
      characters: [
        { characterId: 'edwards', role: 'agent' },
        { characterId: 'john_davies', role: 'conspirator', disguise: 'Young' },
        { characterId: 'louise_harrington', role: 'conspirator', disguise: 'Elderly knitting woman' },
        { characterId: 'george_bennet', role: 'surveillance' },
        { characterId: 'alison', role: 'agent', disguise: 'Rambler' }
      ],
      significance: 'Critical exchange of suitcases and setup for Edwards\' murder',
      keyActions: [
        'Three conspirators sit in same compartment',
        'Switch of cases in Box Tunnel darkness',
        'Louise exits at Goring',
        'Davies/Young exits at Reading',
        'Edwards continues to London'
      ]
    },
    {
      id: 'edwards_murder',
      title: 'Murder of Edwards',
      date: '1943',
      description: 'Edwards found shot dead in London flat with single bullet to head',
      location: 'crawford_place',
      characters: [
        { characterId: 'edwards', role: 'victim' },
        { characterId: 'megan_davies', role: 'killer', disguise: 'Postman' }
      ],
      significance: 'Elimination of potential weak link and acquisition of cheque book',
      keyActions: [
        'Megan Davies disguised as postman enters building',
        'Edwards shot with single bullet to head',
        'Cheque book taken'
      ]
    },
    {
      id: 'rifle_testing',
      title: 'Rifle Testing at Churn',
      date: 'Late 1943',
      description: 'Bob and Louise Harrington test German sniper rifle at Churn Ranges',
      location: 'churn_ranges',
      characters: [
        { characterId: 'bob_harrington', role: 'marksman' },
        { characterId: 'louise_harrington', role: 'accomplice/informant' }
      ],
      significance: 'Preparation for assassination attempt, leaves evidence (shell casing)',
      keyActions: [
        'After-hours entry to rifle range',
        'Test firing of German FG42 rifle',
        'Calibration of scope',
        'One shell casing missed during cleanup'
      ]
    },
    {
      id: 'davies_ireland_escape',
      title: 'Davies Escape to Ireland',
      date: 'December 1943',
      description: 'Sir John and Lady Davies escape to Ireland via ferry from Fishguard',
      location: 'fishguard',
      characters: [
        { characterId: 'john_davies', role: 'fugitive' },
        { characterId: 'megan_davies', role: 'fugitive' }
      ],
      significance: 'Advance escape of conspirators before assassination attempt',
      keyActions: [
        'Transfer of assets to Irish banks',
        'Silent departure from Yattendon',
        'Travel to Wales',
        'Ferry crossing using Edwards\' cheque book'
      ]
    },
    {
      id: 'house_occupation',
      title: 'Occupation of Cynthia\'s House',
      date: 'December 5-7, 1943',
      description: 'Harringtons and Davies take over Cynthia\'s house in preparation for assassination attempt',
      location: 'cynthia_house',
      characters: [
        { characterId: 'bob_harrington', role: 'assassin' },
        { characterId: 'louise_harrington', role: 'double_agent' },
        { characterId: 'john_davies', role: 'accomplice' },
        { characterId: 'cynthia_childreth', role: 'hostage' },
        { characterId: 'richard_childreth', role: 'hostage' },
        { characterId: 'mary', role: 'hostage' },
        { characterId: 'alison', role: 'hidden_operative' }
      ],
      significance: 'Final preparation for assassination attempt',
      keyActions: [
        'Cut phone lines',
        'Blockade entrance with car',
        'Set up rifle in tower studio',
        'Hold Cynthia and family hostage',
        'Alison hides in summerhouse then cellar'
      ]
    },
    {
      id: 'assassination_attempt',
      title: 'Attempted Assassination of Montgomery',
      date: 'December 7, 1943',
      description: 'Failed attempt to shoot Montgomery from Cynthia\'s tower, foiled by Louise and intelligence team',
      location: 'cynthia_house',
      characters: [
        { characterId: 'bob_harrington', role: 'assassin' },
        { characterId: 'louise_harrington', role: 'saboteur' },
        { characterId: 'john_davies', role: 'accomplice' },
        { characterId: 'bill_laurie', role: 'operative' },
        { characterId: 'cynthia_childreth', role: 'hostage' },
        { characterId: 'richard_childreth', role: 'hostage' },
        { characterId: 'edwin', role: 'operative' },
        { characterId: 'george_bennet', role: 'operative' },
        { characterId: 'jim', role: 'operative' }
      ],
      significance: 'Climax of novel, prevention of assassination, revelation of Louise as double agent',
      keyActions: [
        'Bob prepares to shoot from tower',
        'Confusion with three "Montys" in convoy',
        'Louise reveals herself by preventing shot',
        'Bill and team raid the house',
        'Bob shot in hand',
        'Davies shot in arm',
        'Both arrested'
      ]
    },
    {
      id: 'louise_death',
      title: 'Death of Louise Harrington',
      date: 'Two weeks after assassination attempt',
      description: 'Louise killed in suspicious gas explosion at cottage',
      location: 'aldworth',
      characters: [
        { characterId: 'louise_harrington', role: 'victim' }
      ],
      significance: 'Revenge killing by remaining Nazi sympathizers',
      keyActions: [
        'Gas explosion destroys cottage',
        'Louise and neighbor killed',
        'No official suspicion of foul play'
      ]
    }
  ];
  
  // Define relationships data
  export const relationships = [
    { from: 'bill_laurie', to: 'cynthia_childreth', type: 'handler-asset' },
    { from: 'bill_laurie', to: 'richard_childreth', type: 'handler-asset' },
    { from: 'bill_laurie', to: 'hannah_park', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'jane_maclean', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'edwin', type: 'superior-subordinate' },
    { from: 'bill_laurie', to: 'george_bennet', type: 'colleague' },
    { from: 'bill_laurie', to: 'louise_harrington', type: 'handler-informant' },
    { from: 'cynthia_childreth', to: 'richard_childreth', type: 'spouse' },
    { from: 'cynthia_childreth', to: 'mary', type: 'employer-confidante' },
    { from: 'cynthia_childreth', to: 'amy_wyndholme', type: 'friend' },
    { from: 'john_davies', to: 'megan_davies', type: 'spouse' },
    { from: 'john_davies', to: 'peter_snowden', type: 'conspirator' },
    { from: 'john_davies', to: 'bob_harrington', type: 'conspirator' },
    { from: 'peter_snowden', to: 'marjorie_snowden', type: 'spouse' },
    { from: 'peter_snowden', to: 'bob_harrington', type: 'conspirator' },
    { from: 'bob_harrington', to: 'louise_harrington', type: 'spouse' },
    { from: 'george_bennet', to: 'jim', type: 'superior-subordinate' },
    { from: 'gerda_stammer', to: 'franz_stammer', type: 'spouse' },
    { from: 'gerda_stammer', to: 'lena_weber', type: 'colleague' },
    { from: 'hannah_park', to: 'jane_maclean', type: 'colleague-partner' },
    { from: 'louise_harrington', to: 'gerda_stammer', type: 'associate' },
    { from: 'richard_childreth', to: 'bill_laurie', type: 'asset-handler' },
    { from: 'megan_davies', to: 'edwards', type: 'assassin-victim' }
  ];
  
  // Define objects data
  export const objects = [
    {
      id: 'german_rifle',
      name: 'German FG42 Sniper Rifle',
      type: 'Weapon',
      description: 'German paratrooper weapon adapted as a sniper rifle, used in the assassination attempt on Montgomery.',
      physical_details: 'Modified FG42 with advanced scope, designed for long-range precision shooting.',
      technical_details: [
        'FG42 (Fallschirmjägergewehr 42) - German automatic rifle',
        'Modified with enhanced scope',
        'Uses 7.92mm ammunition',
        'Added bipod for stability'
      ],
      significance: [
        'Primary weapon intended for Montgomery assassination',
        'Evidence linking conspirators to plot',
        'Found cartridge at Churn range provided key clue'
      ],
      history: [
        { event: 'Smuggled into UK', details: 'Brought into UK via multiple agents in parts' },
        { event: 'Testing at Churn Ranges', details: 'Bob Harrington tested the rifle at night' },
        { event: 'Assassination Attempt', details: 'Used in the tower at Cynthia\'s house' }
      ],
      possessors: [
        { characterId: 'edwards', period: 'early', alias: 'German agent' },
        { characterId: 'john_davies', period: 'mid', alias: 'Young' },
        { characterId: 'bob_harrington', period: 'late', alias: 'Assassin' }
      ],
      appearances: [
        'rifle_testing',
        'house_occupation',
        'assassination_attempt'
      ],
      image_description: 'A German FG42 rifle with scope attachment and bipod.'
    },
    {
      id: 'mysterious_suitcase',
      name: 'The Mysterious Suitcase',
      type: 'Container',
      description: 'A suitcase delivered to Cynthia\'s house, initially believed to contain a radio but actually containing women\'s clothes and disguised rifle components.',
      physical_details: 'Medium-sized leather suitcase with brass fittings, appearing unremarkable but constructed with a false bottom.',
      technical_details: [
        'Hidden compartment in base',
        'Reinforced corners',
        'Special lining to defeat casual inspection',
        'Components disguised as everyday items'
      ],
      significance: [
        'Key method of delivering assassination weapon components',
        'Red herring appearing to be radio equipment',
        'Central to the plot\'s misdirection'
      ],
      history: [
        { event: 'Delivered to Cynthia', details: 'Brought by "Young" (John Davies in disguise)' },
        { event: 'Inspection by Intelligence', details: 'Initially believed to contain radio equipment' },
        { event: 'Stored in Tower', details: 'Placed in Cynthia\'s studio tower room' },
        { event: 'Contents Revealed', details: 'Actually contained rifle components and disguise items' }
      ],
      possessors: [
        { characterId: 'john_davies', period: 'early', alias: 'Young' },
        { characterId: 'cynthia_childreth', period: 'mid' },
        { characterId: 'bob_harrington', period: 'late' }
      ],
      appearances: [
        'train_journey',
        'house_occupation'
      ],
      image_description: 'A vintage leather suitcase with brass fittings and leather straps.'
    },
    {
      id: 'cheque_book',
      name: 'Edwards\' Cheque Book',
      type: 'Document',
      description: 'Martins Bank cheque book belonging to T.G. Edwards, later used by the Davies to finance their escape to Ireland.',
      physical_details: 'Standard cheque book from Martins Bank (68 Lombard St.), with printed name "T.G. Edwards".',
      significance: [
        'Used as identification for German agents',
        'Financial paper trail linking conspirators',
        'Used to pay for ferry escape to Ireland',
        'Evidence connecting various events'
      ],
      history: [
        { event: 'Used by Edwards', details: 'Original user paying for accommodation at Scilly Isles' },
        { event: 'Stolen after murder', details: 'Taken by Megan Davies after killing Edwards' },
        { event: 'Used for escape', details: 'Davies used it to pay for Fishguard-Rosslare ferry' }
      ],
      possessors: [
        { characterId: 'edwards', period: 'early' },
        { characterId: 'megan_davies', period: 'mid' },
        { characterId: 'john_davies', period: 'late' }
      ],
      appearances: [
        'edwards_arrival',
        'edwards_murder',
        'davies_ireland_escape'
      ],
      image_description: 'A 1940s cheque book from Martins Bank with handwritten entries.'
    }
  ];
  
  // Spycraft encyclopedia entries
  export const spycraftEntries = [
    {
      id: 'safe_house',
      title: 'Safe Houses',
      description: 'Secure locations where agents can hide, rest, or conduct operations without fear of detection.',
      historicalContext: 'During WWII, safe houses were crucial for the operation of resistance movements and intelligence networks. MI5 and MI6 maintained networks of safe houses throughout Britain and occupied Europe.',
      examples: [
        'Cynthia\'s house in Bucklebury is requested to be used as a safe house by Mosley',
        'The Snowdens and others use their country houses to host Nazi sympathizers',
        'Davies cottage used as temporary accommodation for operatives'
      ],
      techniques: [
        'Houses often chosen for isolation or multiple escape routes',
        'Operated by trusted individuals, often with plausible cover stories',
        'Sometimes equipped with hidden rooms or compartments',
        'May contain emergency supplies or communications equipment'
      ],
      bookScenes: ['second_party', 'house_occupation']
    },
    {
      id: 'surveillance',
      title: 'Surveillance',
      description: 'The close observation of a person, place, or object to gather intelligence or evidence.',
      historicalContext: 'MI5 and other intelligence agencies heavily relied on surveillance to track potential spies and fifth columnists. During WWII, this became highly sophisticated with multiple operatives using various covers.',
      examples: [
        'Bill\'s team watching Cynthia\'s house using disguised observers',
        'The watchers posted in village locations disguised as artists, road workers, and elderly pedestrians',
        'George following Edwards from Scilly Isles to London',
        'Alison tracking Davies/Young to Reading'
      ],
      techniques: [
        'Using mundane covers that attract minimal attention (artists, workers, elderly)',
        'Rotating personnel to avoid recognition',
        'Multiple observation points to maintain continuous coverage',
        'Communication through intermediaries rather than direct contact',
        'Counter-surveillance awareness (checking for people watching the watchers)'
      ],
      bookScenes: ['edwards_arrival', 'train_journey', 'village_surveillance']
    },
    {
      id: 'disguise',
      title: 'Disguise',
      description: 'The use of altered appearance to conceal one\'s identity or intentions.',
      historicalContext: 'Agents often adopted disguises to move freely in enemy territory or to approach targets without arousing suspicion. SOE agents were extensively trained in the art of disguise.',
      examples: [
        'Hannah Park\'s various disguises (including Miss Gilchrist and blonde society lady)',
        'Megan Davies disguised as a postman to kill Edwards',
        'Bob Harrington dressed as a woman for the assassination attempt',
        'Louise disguised as elderly grey-haired knitter on train',
        'Alison\'s rambler disguise on train'
      ],
      techniques: [
        'Changing hair color and style (wigs, dyes)',
        'Adopting clothing associated with specific roles or classes',
        'Altering posture, gait, and mannerisms',
        'Using props appropriate to assumed identity',
        'Creating behavioral distractions to divert attention from facial features'
      ],
      bookScenes: ['denleigh_recruitment', 'edwards_murder', 'train_journey']
    },
    {
      id: 'dead_drop',
      title: 'Dead Drops',
      description: 'A method of passing items or information between agents without requiring direct contact.',
      historicalContext: 'Dead drops were essential for maintaining network security, as they eliminated the need for face-to-face meetings between agents.',
      examples: [
        'The suitcase delivered to Cynthia\'s house',
        'Documents passed through intermediaries like the publisher',
        'Felicity\'s reports sent via regular mail'
      ],
      techniques: [
        'Using neutral locations accessible to both parties',
        'Employing signal systems to indicate when drops are made or retrieved',
        'Disguising sensitive items as ordinary objects',
        'Using couriers unaware of the significance of the items they carry'
      ],
      bookScenes: ['case_delivery', 'felicity_reports']
    },
    {
      id: 'code_words',
      title: 'Recognition Signals & Code Words',
      description: 'Predetermined phrases, gestures, or items used to identify friendly agents or to authenticate communications.',
      historicalContext: 'Recognition signals helped prevent infiltration by enemy agents and ensured secure communications.',
      examples: [
        'Bill\'s rank (Wing Commander) used as recognition signal',
        'Felicity\'s publisher serving as intermediary',
        'Special phone line for secure communications',
        'The Edwards cheque book used as identification'
      ],
      techniques: [
        'Using innocuous phrases that would seem natural in conversation',
        'Creating physical recognition items that can be subtly displayed',
        'Establishing backup recognition methods in case primary ones are compromised',
        'Changing signals regularly to maintain security'
      ],
      bookScenes: ['cynthia_phone_call', 'publisher_contact']
    },
    {
      id: 'double_agents',
      title: 'Double Agents',
      description: 'Operatives who appear to work for one side but are actually loyal to another.',
      historicalContext: 'The British "Double Cross System" was highly successful in turning German agents during WWII, feeding false information to the enemy.',
      examples: [
        'Louise Harrington working for Bill while appearing loyal to the fifth columnists',
        'Her ultimate sabotage of the assassination attempt',
        'Long-term deception regarding her true allegiance'
      ],
      techniques: [
        'Maintaining believable cover by providing some accurate but non-critical intelligence',
        'Establishing secure communication channels with true handler',
        'Creating plausible reasons for activities that might seem suspicious',
        'Carefully timing major interventions for maximum impact'
      ],
      bookScenes: ['louise_revelation', 'assassination_attempt']
    },
    {
      id: 'tradecraft',
      title: 'Basic Tradecraft',
      description: 'The methods used to avoid surveillance, maintain cover, and conduct secret operations.',
      historicalContext: 'Intelligence agencies developed sophisticated tradecraft techniques throughout WWII.',
      examples: [
        'Don teaching Cynthia about "back doubles" and counter-surveillance',
        'Using reflections in shop windows to detect followers',
        'The separate phone line for secure communications',
        'Leopard crawling across field to avoid detection'
      ],
      techniques: [
        'Varying routes and routines to avoid predictability',
        'Checking for surveillance using natural reflective surfaces',
        'Creating cover stories with verifiable elements',
        'Using innocuous behavior to mask operational activities',
        'Communicating through cutouts and intermediaries'
      ],
      bookScenes: ['don_training', 'final_approach']
    }
  ];

  // Chapter data
  export const chapters = [
    {
      id: 'preface',
      title: 'Preface',
      description: 'Introduction to the German infiltration of UK via Scilly Isles',
      events: ['german_infiltration'],
      timeframe: '1943'
    },
    {
      id: 'chapter1',
      title: 'Chapter 1: Wiltshire, May 1932',
      description: 'Cynthia arrives at Denleigh Manor for a weekend party',
      events: ['cynthia_recruitment'],
      timeframe: 'May 1932'
    },
    {
      id: 'chapter2',
      title: 'Chapter 2: Infiltration',
      description: 'Cynthia and Richard are recruited for intelligence work',
      events: ['cynthia_recruitment'],
      timeframe: 'May 1932' 
    },
    {
      id: 'chapter3',
      title: 'Chapter 3: Berlin',
      description: 'Richard and Cynthia travel to Berlin to establish their cover',
      events: ['berlin_trip', 'hitler_sighting'],
      timeframe: '1932-1933'
    },
    {
      id: 'chapter4',
      title: 'Chapter 4: The First Party',
      description: 'Cynthia hosts Nazi sympathizers at her home',
      events: ['first_party'],
      timeframe: 'May 27 (year unspecified)'
    },
    {
      id: 'chapter5',
      title: 'Chapter 5: Growing Network',
      description: 'The Nazi sympathizer network expands, with Mosley making an appearance',
      events: ['second_party'],
      timeframe: 'July 7 (year unspecified)'
    },
    {
      id: 'chapter6',
      title: 'Chapter 6: The Mysterious Edwards',
      description: 'German agent Edwards arrives in the UK',
      events: ['edwards_arrival', 'train_journey'],
      timeframe: '1943'
    },
    {
      id: 'chapter7',
      title: 'Chapter 7: Death in London',
      description: 'Edwards is found murdered in his London flat',
      events: ['edwards_murder'],
      timeframe: '1943'
    },
    {
      id: 'chapter8',
      title: 'Chapter 8: Preparations',
      description: 'The Fifth Columnists test a German rifle and prepare for their operation',
      events: ['rifle_testing'],
      timeframe: 'Late 1943'
    },
    {
      id: 'chapter9',
      title: 'Chapter 9: Escape to Ireland',
      description: 'The Davies escape to Ireland ahead of the assassination attempt',
      events: ['davies_ireland_escape'],
      timeframe: 'December 1943'
    },
    {
      id: 'chapter10',
      title: 'Chapter 10: Occupation',
      description: 'The conspirators take over Cynthia\'s house',
      events: ['house_occupation'],
      timeframe: 'December 5-7, 1943'
    },
    {
      id: 'chapter11',
      title: 'Chapter 11: The Attempt',
      description: 'The assassination attempt on Montgomery is foiled',
      events: ['assassination_attempt'],
      timeframe: 'December 7, 1943'
    },
    {
      id: 'epilogue',
      title: 'Epilogue',
      description: 'The aftermath of the failed plot',
      events: ['louise_death'],
      timeframe: 'Two weeks after the assassination attempt'
    }
  ];
  
  // Mystery elements that get revealed through the story
  export const mysteryElements = [
    {
      id: 'knitters_group',
      title: 'The Knitters Group',
      description: 'The group of German Nazi women sympathizers, nicknamed after the historical "tricoteuses" who knit during French Revolution executions.',
      firstMentioned: 'chapter1',
      revealedInChapter: 'chapter1',
      relatedCharacters: ['gerda_stammer', 'lena_weber', 'louise_harrington'],
      status: 'revealed'
    },
    {
      id: 'mysterious_suitcase',
      title: 'The Mysterious Suitcase',
      description: 'A suitcase delivered to Cynthia, initially believed to contain a radio but actually containing women\'s clothes and German rifle components disguised as knitting needles.',
      firstMentioned: 'chapter6',
      revealedInChapter: 'chapter10',
      relatedCharacters: ['john_davies', 'bob_harrington'],
      relatedEvents: ['train_journey'],
      status: 'revealed'
    },
    {
      id: 'edwards_identity',
      title: 'Edwards\' True Purpose',
      description: 'The German agent Edwards was bringing critical equipment for the assassination attempt but became a liability.',
      firstMentioned: 'chapter6',
      revealedInChapter: 'chapter8',
      relatedCharacters: ['edwards', 'megan_davies'],
      relatedEvents: ['edwards_murder'],
      status: 'revealed'
    },
    {
      id: 'louise_allegiance',
      title: 'Louise\'s True Allegiance',
      description: 'The revelation that Louise has been working against the fifth columnists as a double agent.',
      firstMentioned: 'chapter1',
      revealedInChapter: 'chapter11',
      relatedCharacters: ['louise_harrington', 'bill_laurie'],
      relatedEvents: ['assassination_attempt'],
      status: 'twist'
    },
    {
      id: 'assassination_target',
      title: 'The Assassination Target',
      description: 'The plan to assassinate General Montgomery from Cynthia\'s tower.',
      firstMentioned: 'chapter8',
      revealedInChapter: 'chapter10',
      relatedCharacters: ['bob_harrington', 'john_davies'],
      relatedEvents: ['rifle_testing', 'house_occupation', 'assassination_attempt'],
      status: 'major_plot'
    }
  ];
  
  // Theme elements throughout the story
  export const themeElements = [
    {
      id: 'class_privilege',
      title: 'Class and Privilege',
      description: 'Examination of how class and social standing influence characters\' actions and beliefs.',
      examples: [
        'Contrast between genuine aristocrats (Cynthia) and aspirational middle-class (Snowden)',
        'Use of country house parties as recruitment grounds',
        'Aristocratic connections of fifth columnists'
      ],
      relatedCharacters: ['cynthia_childreth', 'peter_snowden', 'john_davies']
    },
    {
      id: 'deception_identity',
      title: 'Deception and Double Identity',
      description: 'Exploration of hidden identities and deception in wartime.',
      examples: [
        'Multiple characters using aliases and disguises',
        'Louise\'s ultimate betrayal of her group',
        'Cynthia\'s double life'
      ],
      relatedCharacters: ['louise_harrington', 'cynthia_childreth', 'hannah_park']
    },
    {
      id: 'loyalty_betrayal',
      title: 'Loyalty and Betrayal',
      description: 'The complex nature of loyalty during wartime and how personal beliefs conflict with national interest.',
      examples: [
        'Louise\'s change of allegiance',
        'The fifth columnists betraying their country',
        'Cynthia\'s initial reluctance to get involved'
      ],
      relatedCharacters: ['louise_harrington', 'bob_harrington', 'cynthia_childreth']
    },
    {
      id: 'knitting_symbolism',
      title: 'Knitting as Symbol',
      description: 'The use of knitting as a symbol throughout the novel, representing both domesticity and hidden danger.',
      examples: [
        'The German Nazi women nicknamed "the knitters"',
        'Louise\'s signature trait that helps identify her',
        'Historical reference to "les tricoteuses" - women who knit during French Revolution executions'
      ],
      relatedCharacters: ['louise_harrington', 'gerda_stammer', 'lena_weber']
    }
  ];
  