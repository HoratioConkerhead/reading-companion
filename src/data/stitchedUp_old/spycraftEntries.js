// Spycraft encyclopedia entries for "Stitched Up" book

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
    },
    {
      id: 'cover_identities',
      title: 'Cover Identities',
      description: 'The creation and maintenance of false identities to conceal an agent\'s true purpose or affiliation.',
      historicalContext: 'Intelligence services developed sophisticated methods for creating believable cover identities during WWII, often supported by false documentation and careful background construction.',
      examples: [
        'Felicity posing as a writer in Aldworth cottage',
        'Bill appearing as "Mr. Newton" at Denleigh Manor',
        'Intelligence officers disguised as telephone engineers',
        'Bert and Keith posing as artists for surveillance'
      ],
      techniques: [
        'Selecting identities that explain presence in an area',
        'Choosing covers that allow for observation without suspicion',
        'Creating supporting documentation and props',
        'Establishing routines consistent with chosen identity',
        'Developing appropriate knowledge for the assumed role'
      ],
      bookScenes: ['cottage_surveillance', 'denleigh_recruitment', 'secure_line_installation']
    },
    {
      id: 'secure_communication',
      title: 'Secure Communications',
      description: 'Methods used to transmit information without risk of interception or compromise.',
      historicalContext: 'During WWII, secure communication was critical for intelligence operations. Methods ranged from dedicated phone lines to coded messages through seemingly innocent channels.',
      examples: [
        'Dedicated phone line at Cynthia\'s house',
        'Felicity\'s reports sent via publisher intermediary',
        'Use of cutouts and dead drops',
        'Recognition phrases for phone calls'
      ],
      techniques: [
        'Dedicated lines bypassing public exchanges',
        'Communications through innocent-appearing channels (publishers, businesses)',
        'Verification codes at start of conversations',
        'Regular changes of communication methods'
      ],
      bookScenes: ['secure_line_installation', 'cottage_surveillance']
    },
    {
      id: 'counter_surveillance',
      title: 'Counter-Surveillance',
      description: 'Techniques used to detect and evade hostile surveillance.',
      historicalContext: 'Intelligence operatives needed to be constantly aware of potential surveillance and developed sophisticated methods to detect and counter it.',
      examples: [
        'Don teaching Cynthia about "back doubles"',
        'Using reflections in shop windows',
        'Deliberate phone call to test fifth columnist reactions',
        'Jim\'s careful approach to Cynthia\'s house'
      ],
      techniques: [
        'Indirect routes to detect followers',
        'Using reflective surfaces to observe without turning around',
        'Testing reactions through deliberate actions',
        'Varying routines and behaviors',
        'Strategic use of public spaces where followers would be conspicuous'
      ],
      bookScenes: ['tradecraft_training', 'cynthia_diversion_call']
    },
    {
      id: 'infiltration',
      title: 'Infiltration Techniques',
      description: 'Methods for covertly entering secure areas or gaining the trust of target groups.',
      historicalContext: 'Intelligence services developed sophisticated infiltration methods during WWII, particularly for gaining access to enemy-occupied areas or hostile groups.',
      examples: [
        'Cynthia and Richard infiltrating Nazi sympathizer circles',
        'Team infiltrating Cynthia\'s house during final operation',
        'Agents entering German-held territory'
      ],
      techniques: [
        'Long-term identity establishment',
        'Gradual trust-building through incremental steps',
        'Demonstration of shared beliefs or objectives',
        'Use of existing contacts for introduction',
        'Physical infiltration methods (leopard crawling, covert approaches)'
      ],
      bookScenes: ['berlin_trip', 'first_party', 'final_operation']
    },
    {
      id: 'deception_operations',
      title: 'Deception Operations',
      description: 'Tactical deceptions designed to mislead enemy agents or operatives.',
      historicalContext: 'The British excelled at deception operations during WWII, from the famous "Operation Mincemeat" to countless smaller tactical deceptions.',
      examples: [
        'The "Three Montgomerys" decoy operation',
        'Cynthia\'s deliberate phone call to test reactions',
        'Use of artists as surveillance cover',
        'Felicity\'s writer cover in the village'
      ],
      techniques: [
        'Creating multiple identical targets to confuse attackers',
        'Deliberate actions designed to provoke revealing responses',
        'Use of mundane covers to hide surveillance',
        'Creating distractions to mask main operation'
      ],
      bookScenes: ['three_montgomerys_arrangement', 'cynthia_diversion_call']
    },
    {
      id: 'covert_entry',
      title: 'Covert Entry',
      description: 'Techniques for gaining entry to secured locations without detection.',
      historicalContext: 'Intelligence agents needed skills to access locked rooms, buildings and containers without leaving evidence.',
      examples: [
        'Edwin picking the lock on the mysterious suitcase',
        'Bert entering Edwards\' flat',
        'Intelligence team entering Cynthia\'s house via cellar',
        'George and Jim entering Davies\' empty house'
      ],
      techniques: [
        'Lock picking without leaving marks',
        'Disguised entry under false pretenses',
        'Using alternative or overlooked access points',
        'Resealing containers to hide entry evidence'
      ],
      bookScenes: ['suitcase_opening', 'edwards_discovery', 'final_operation']
    },
    {
      id: 'double_agent_handling',
      title: 'Double Agent Handling',
      description: 'Methods for managing, protecting, and communicating with agents working inside hostile organizations.',
      historicalContext: 'The British Double-Cross System was one of the most successful intelligence operations of WWII, requiring sophisticated handling techniques.',
      examples: [
        'Bill\'s management of Louise as an insider',
        'Secret communications and support',
        'Providing emergency equipment (gun)',
        'Maintaining complete secrecy about identity'
      ],
      techniques: [
        'Extremely limited contact to prevent exposure',
        'Provision of emergency equipment through covert channels',
        'Total compartmentalization of knowledge about agent',
        'Development of emergency extraction plans',
        'Accepting agent-initiated timing for critical actions'
      ],
      bookScenes: ['louise_revelation', 'assassination_attempt']
    }
];
