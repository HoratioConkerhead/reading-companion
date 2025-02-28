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