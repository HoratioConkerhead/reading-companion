export const events = [
  {
    id: 'german_infiltration_scilly',
    title: 'German Infiltration via Scilly Isles',
    date: 'Summer 1943',
    description: 'German agent Helmut Schnitter arrives via submarine at the Isles of Scilly, demonstrating the vulnerability of British coastal defenses. He successfully infiltrates the UK via the regular steamship service to Penzance.',
    location: 'scilly_isles',
    characters: [
      { characterId: 'helmut_schnitter', role: 'German agent infiltrating UK' }
    ],
    significance: 'Demonstrates the vulnerability of British coastal defenses and the ease with which German agents could infiltrate the UK',
    chapter: 'preface',
    keyActions: [
      'Submarine arrives at Scilly Isles',
      'Schnitter lands via inflatable boat',
      'Waits overnight on the island',
      'Buys ticket to Penzance via steamship',
      'Successfully infiltrates mainland UK'
    ]
  },
  {
    id: 'cynthia_arrives_denleigh',
    title: 'Cynthia Arrives at Denleigh Manor',
    date: 'May 1932',
    description: 'Lady Cynthia Childreth arrives at Denleigh Manor for a weekend party, where she meets various guests including Colonel Snowden and the Harringtons. She receives a mysterious note from Amy about being approached by one of the guests.',
    location: 'denleigh_manor',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Main guest' },
      { characterId: 'amy_wyndholme', role: 'Hostess' },
      { characterId: 'peter_snowden', role: 'Guest' },
      { characterId: 'marjorie_snowden', role: 'Guest' },
      { characterId: 'bob_harrington', role: 'Guest' },
      { characterId: 'louise_harrington', role: 'Guest' }
    ],
    significance: 'Sets up the weekend where Cynthia will be recruited for intelligence work',
    chapter: 'chapter_01',
    keyActions: [
      'Cynthia arrives at Denleigh Manor',
      'Meets various guests',
      'Receives mysterious note from Amy',
      'Learns she will be approached by someone'
    ]
  },
  {
    id: 'weekend_party_introductions',
    title: 'Weekend Party Introductions',
    date: 'May 1932',
    description: 'The weekend party begins with introductions and social activities. Cynthia meets all the guests and observes their behavior, particularly noting the unusual Miss Gilchrist (Hannah Park) and the quiet Mr Newton (Bill Lawrie).',
    location: 'denleigh_manor',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Observer' },
      { characterId: 'hannah_park', role: 'Guest (disguised as Miss Gilchrist)' },
      { characterId: 'bill_lawrie', role: 'Guest (disguised as Mr Newton)' },
      { characterId: 'jane_maclean', role: 'Guest' }
    ],
    significance: 'Cynthia begins to observe the guests and their behavior',
    chapter: 'chapter_01',
    keyActions: [
      'Guests introduced to each other',
      'Social activities begin',
      'Cynthia observes guest behavior',
      'Hannah and Bill maintain their disguises'
    ]
  },
  {
    id: 'dinner_politics',
    title: 'Dinner and Political Discussion',
    date: 'May 1932',
    description: 'During dinner, political tensions emerge as Colonel Snowden and the Harringtons begin to express pro-Nazi sympathies, praising Hitler and his politics. This creates an awkward atmosphere at the table.',
    location: 'denleigh_manor',
    characters: [
      { characterId: 'peter_snowden', role: 'Pro-Nazi sympathizer' },
      { characterId: 'bob_harrington', role: 'Pro-Nazi sympathizer' },
      { characterId: 'louise_harrington', role: 'Pro-Nazi sympathizer' },
      { characterId: 'cynthia_childreth', role: 'Observer' }
    ],
    significance: 'First revelation of pro-Nazi sympathies among the guests',
    chapter: 'chapter_02',
    keyActions: [
      'Dinner conversation turns political',
      'Snowden and Harringtons praise Hitler',
      'Pro-Nazi sympathies revealed',
      'Awkward atmosphere created'
    ]
  },
  {
    id: 'pro_nazi_revealed',
    title: 'Pro-Nazi Sympathies Revealed',
    date: 'May 1932',
    description: 'The extent of pro-Nazi sympathies among the guests becomes clear as they discuss Hitler\'s rise to power and express admiration for his political achievements. This revelation helps Cynthia understand the nature of the group.',
    location: 'denleigh_manor',
    characters: [
      { characterId: 'peter_snowden', role: 'Pro-Nazi sympathizer' },
      { characterId: 'bob_harrington', role: 'Pro-Nazi sympathizer' },
      { characterId: 'louise_harrington', role: 'Pro-Nazi sympathizer' },
      { characterId: 'marjorie_snowden', role: 'Pro-Nazi sympathizer' }
    ],
    significance: 'Confirms the political leanings of several guests',
    chapter: 'chapter_02',
    keyActions: [
      'Discussion of Hitler\'s political rise',
      'Admiration for Nazi policies expressed',
      'Political sympathies made clear',
      'Group dynamics revealed'
    ]
  },
  {
    id: 'cynthia_recruited',
    title: 'Cynthia Recruited for Intelligence Work',
    date: 'May 1932',
    description: 'In a secluded arbor in the garden, Miss Gilchrist (Hannah Park) and Mr Newton (Bill Lawrie) reveal their true identities and recruit Cynthia for British intelligence work. They explain that she has been chosen for her background and abilities.',
    location: 'denleigh_manor',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Recruit' },
      { characterId: 'hannah_park', role: 'Recruiter' },
      { characterId: 'bill_lawrie', role: 'Recruiter' }
    ],
    significance: 'Cynthia is recruited for British intelligence, beginning her transformation from socialite to operative',
    chapter: 'chapter_03',
    keyActions: [
      'True identities revealed',
      'Intelligence operation explained',
      'Cynthia\'s role described',
      'Recruitment completed'
    ]
  },
  {
    id: 'intelligence_operation_revealed',
    title: 'Intelligence Operation Revealed',
    date: 'May 1932',
    description: 'Bill Lawrie explains the nature of the intelligence operation to Cynthia, assuring her that she will never be in danger but that her role will be highly significant. They arrange to meet in London for further details.',
    location: 'denleigh_manor',
    characters: [
      { characterId: 'cynthia_childreth', role: 'New recruit' },
      { characterId: 'bill_lawrie', role: 'Handler' },
      { characterId: 'hannah_park', role: 'Recruiter' }
    ],
    significance: 'Cynthia learns about her role in British intelligence',
    chapter: 'chapter_03',
    keyActions: [
      'Operation details explained',
      'Safety assurances given',
      'London meeting arranged',
      'Cynthia asked to observe and listen'
    ]
  },
  {
    id: 'berlin_trip',
    title: 'Berlin Trip',
    date: '1932-1933',
    description: 'Richard and Cynthia travel to Berlin, staying at the Hotel Adlon and meeting German Nazi sympathizers including Gerda and Franz Stammer. They are asked to act as sympathizers and hosts in England.',
    location: 'hotel_adlon_berlin',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Undercover operative' },
      { characterId: 'richard_childreth', role: 'Undercover operative' },
      { characterId: 'gerda_stammer', role: 'German Nazi sympathizer' },
      { characterId: 'franz_stammer', role: 'German Nazi sympathizer' }
    ],
    significance: 'Establishes connections with German Nazi sympathizers and sets up Cynthia\'s role as a host',
    chapter: 'chapter_04',
    keyActions: [
      'Travel to Berlin',
      'Stay at Hotel Adlon',
      'Meet German sympathizers',
      'Agree to act as hosts in England'
    ]
  },
  {
    id: 'hotel_adlon_meeting',
    title: 'Meeting at Hotel Adlon',
    date: '1932-1933',
    description: 'At the Hotel Adlon, Richard and Cynthia meet with German Nazi sympathizers and are briefed on their role as hosts for Nazi sympathizer gatherings in England. They also briefly see Hitler at a reception.',
    location: 'hotel_adlon_berlin',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Undercover operative' },
      { characterId: 'richard_childreth', role: 'Undercover operative' },
      { characterId: 'gerda_stammer', role: 'German Nazi sympathizer' },
      { characterId: 'franz_stammer', role: 'German Nazi sympathizer' }
    ],
    significance: 'Establishes the operational framework for Cynthia\'s intelligence work',
    chapter: 'chapter_04',
    keyActions: [
      'Meeting with German sympathizers',
      'Briefing on host role',
      'Sighting of Hitler',
      'Operational details discussed'
    ]
  },
  {
    id: 'nazi_sympathizers_berlin',
    title: 'Nazi Sympathizers in Berlin',
    date: '1932-1933',
    description: 'Cynthia and Richard meet various German Nazi sympathizers in Berlin, learning about the network and their role in supporting Nazi operations in England.',
    location: 'berlin',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Undercover operative' },
      { characterId: 'richard_childreth', role: 'Undercover operative' },
      { characterId: 'gerda_stammer', role: 'German Nazi sympathizer' },
      { characterId: 'franz_stammer', role: 'German Nazi sympathizer' }
    ],
    significance: 'Establishes the German connection to the Nazi sympathizer network',
    chapter: 'chapter_04',
    keyActions: [
      'Network connections established',
      'Operational methods discussed',
      'Support role defined',
      'Return to England planned'
    ]
  },
  {
    id: 'first_party_bucklebury',
    title: 'First Party at Bucklebury',
    date: 'May 27, unknown year',
    description: 'Cynthia hosts her first party for Nazi sympathizers at her house in Bucklebury, with intelligence agents attending in disguise. The party serves as an intelligence-gathering operation.',
    location: 'cynthia_house_bucklebury',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Host' },
      { characterId: 'gerda_stammer', role: 'Guest' },
      { characterId: 'lena_weber', role: 'Guest' },
      { characterId: 'intelligence_agents', role: 'Undercover operatives' }
    ],
    significance: 'First major intelligence-gathering operation hosted by Cynthia',
    chapter: 'chapter_05',
    keyActions: [
      'Party hosted for Nazi sympathizers',
      'Intelligence agents attend in disguise',
      'Information gathered on network',
      'Cynthia establishes her role as host'
    ]
  },
  {
    id: 'intelligence_gathering_party',
    title: 'Intelligence Gathering at Party',
    date: 'May 27, unknown year',
    description: 'During the party, intelligence agents gather information about the Nazi sympathizer network while maintaining their disguises. The operation provides valuable intelligence about the group\'s activities.',
    location: 'cynthia_house_bucklebury',
    characters: [
      { characterId: 'intelligence_agents', role: 'Undercover operatives' },
      { characterId: 'cynthia_childreth', role: 'Host and operative' }
    ],
    significance: 'Successful intelligence-gathering operation',
    chapter: 'chapter_05',
    keyActions: [
      'Agents maintain disguises',
      'Information gathered on network',
      'Network activities observed',
      'Intelligence operation successful'
    ]
  },
  {
    id: 'second_party_mosley',
    title: 'Second Party with Mosley',
    date: 'July 7, unknown year',
    description: 'Oswald Mosley attends Cynthia\'s second party, requesting her house as a safe house for fascist operations. This provides additional intelligence about the scope of fascist activities.',
    location: 'cynthia_house_bucklebury',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Host' },
      { characterId: 'oswald_mosley', role: 'Guest and fascist leader' }
    ],
    significance: 'Reveals the extent of fascist operations and Mosley\'s involvement',
    chapter: 'chapter_06',
    keyActions: [
      'Mosley attends party',
      'Safe house request made',
      'Fascist operations discussed',
      'Additional intelligence gathered'
    ]
  },
  {
    id: 'safe_house_request',
    title: 'Safe House Request',
    date: 'July 7, unknown year',
    description: 'Oswald Mosley requests that Cynthia\'s house be used as a safe house for fascist operations, demonstrating the trust placed in her and the extent of fascist activities.',
    location: 'cynthia_house_bucklebury',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Host' },
      { characterId: 'oswald_mosley', role: 'Fascist leader' }
    ],
    significance: 'Shows the level of trust placed in Cynthia and the scope of fascist operations',
    chapter: 'chapter_06',
    keyActions: [
      'Safe house request made',
      'Trust level established',
      'Operational scope revealed',
      'Cynthia\'s position confirmed'
    ]
  },
  {
    id: 'time_skip_1943',
    title: 'Time Skip to 1943',
    date: '1943',
    description: 'The story jumps to 1943 where Mosley has been interned and released, and Marjorie Snowden contacts Cynthia. The situation has changed significantly with the war in progress.',
    location: 'various',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Established operative' },
      { characterId: 'marjorie_snowden', role: 'Contact' },
      { characterId: 'oswald_mosley', role: 'Recently released from internment' }
    ],
    significance: 'Moves the story to the wartime period and shows how the situation has evolved',
    chapter: 'chapter_07',
    keyActions: [
      'Time jump to 1943',
      'War situation established',
      'Mosley\'s internment mentioned',
      'Marjorie contacts Cynthia'
    ]
  },
  {
    id: 'mosley_internment',
    title: 'Mosley Internment and Release',
    date: '1940-1943',
    description: 'Oswald Mosley was interned in May 1940 and later released in 1943. This change in his status affects the fascist network\'s operations.',
    location: 'uk',
    characters: [
      { characterId: 'oswald_mosley', role: 'Fascist leader' }
    ],
    significance: 'Shows the British government\'s response to fascist activities during the war',
    chapter: 'chapter_07',
    keyActions: [
      'Mosley interned in May 1940',
      'Internment period',
      'Release in 1943',
      'Return to fascist activities'
    ]
  },
  {
    id: 'marjorie_contacts_cynthia',
    title: 'Marjorie Snowden Contacts Cynthia',
    date: '1943',
    description: 'Marjorie Snowden contacts Cynthia, indicating that the Nazi sympathizer network is still active and seeking to use her house for their operations.',
    location: 'various',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Contact' },
      { characterId: 'marjorie_snowden', role: 'Network representative' }
    ],
    significance: 'Shows the network is still active and seeking to use Cynthia\'s resources',
    chapter: 'chapter_07',
    keyActions: [
      'Marjorie contacts Cynthia',
      'Network activity confirmed',
      'House use requested',
      'Cynthia\'s position tested'
    ]
  },
  {
    id: 'suitcase_delivery',
    title: 'Mysterious Suitcase Delivery',
    date: '1943',
    description: 'Davies (using the name "Young") delivers a mysterious suitcase to Cynthia\'s house, believed to contain a radio for Nazi operations. The suitcase actually contains women\'s clothes.',
    location: 'cynthia_house_bucklebury',
    characters: [
      { characterId: 'sir_john_davies', role: 'Deliverer (using alias "Young")' },
      { characterId: 'cynthia_childreth', role: 'Recipient' }
    ],
    significance: 'Shows the network is actively using Cynthia\'s house and reveals Davies\' use of aliases',
    chapter: 'chapter_08',
    keyActions: [
      'Suitcase delivered',
      'Alias "Young" used',
      'Contents believed to be radio',
      'Actually contains women\'s clothes'
    ]
  },
  {
    id: 'davies_disguise',
    title: 'Davies Uses Disguise',
    date: '1943',
    description: 'Sir John Davies delivers the suitcase using the alias "Young", demonstrating the network\'s use of disguises and aliases for their operations.',
    location: 'cynthia_house_bucklebury',
    characters: [
      { characterId: 'sir_john_davies', role: 'Deliverer using alias' },
      { characterId: 'cynthia_childreth', role: 'Recipient' }
    ],
    significance: 'Reveals the network\'s operational methods and use of disguises',
    chapter: 'chapter_08',
    keyActions: [
      'Alias "Young" used',
      'Disguise maintained',
      'Suitcase delivered',
      'True identity concealed'
    ]
  },
  {
    id: 'surveillance_increased',
    title: 'Increased Surveillance',
    date: '1943',
    description: 'British intelligence increases surveillance of Cynthia and the conspirators, monitoring their movements and communications to gather more information about the network.',
    location: 'various',
    characters: [
      { characterId: 'intelligence_teams', role: 'Surveillance operatives' },
      { characterId: 'cynthia_childreth', role: 'Subject of surveillance' }
    ],
    significance: 'Shows the intelligence operation is actively monitoring the network',
    chapter: 'chapter_09',
    keyActions: [
      'Surveillance teams deployed',
      'Movements monitored',
      'Communications tracked',
      'Intelligence gathered'
    ]
  },
  {
    id: 'intelligence_monitoring',
    title: 'Intelligence Monitoring Operations',
    date: '1943',
    description: 'British intelligence conducts comprehensive monitoring of the Nazi sympathizer network, using various methods to track their activities and gather intelligence.',
    location: 'various',
    characters: [
      { characterId: 'intelligence_teams', role: 'Monitoring operatives' }
    ],
    significance: 'Demonstrates the scope and sophistication of British intelligence operations',
    chapter: 'chapter_09',
    keyActions: [
      'Multiple monitoring methods used',
      'Teams deployed to various locations',
      'Activities tracked',
      'Intelligence compiled'
    ]
  },
  {
    id: 'rifle_discovery',
    title: 'German Rifle Discovery',
    date: '1943',
    description: 'The German rifle (FG42) is discovered at Churn Rifle Ranges, where the assassins practiced their shooting. This provides evidence of the network\'s preparation for violent operations.',
    location: 'churn_rifle_ranges',
    characters: [
      { characterId: 'intelligence_teams', role: 'Discoverers' }
    ],
    significance: 'Provides physical evidence of the network\'s violent intentions',
    chapter: 'chapter_10',
    keyActions: [
      'Rifle discovered at ranges',
      'Practice sessions identified',
      'Violent intentions confirmed',
      'Evidence collected'
    ]
  },
  {
    id: 'churn_ranges_practice',
    title: 'Practice at Churn Rifle Ranges',
    date: '1943',
    description: 'Evidence is found that the conspirators practiced shooting at Churn Rifle Ranges, preparing for their assassination attempt. The poor security at the facility allowed this practice.',
    location: 'churn_rifle_ranges',
    characters: [
      { characterId: 'conspirators', role: 'Practicing shooters' }
    ],
    significance: 'Shows the network was actively preparing for violent operations',
    chapter: 'chapter_10',
    keyActions: [
      'Shooting practice conducted',
      'Targets practiced on',
      'Skills developed',
      'Preparation for assassination'
    ]
  },
  {
    id: 'cheque_book_discovery',
    title: 'Cheque Book Discovery',
    date: '1943',
    description: 'The cheque book for T.G. Edwards is found, revealing the bank account used for Nazi operations. The account is at Martins Bank, 68 Lombard St, London.',
    location: 'london',
    characters: [
      { characterId: 'intelligence_teams', role: 'Discoverers' }
    ],
    significance: 'Provides financial evidence linking the network to Nazi operations',
    chapter: 'chapter_11',
    keyActions: [
      'Cheque book found',
      'Bank account identified',
      'Financial connections revealed',
      'Evidence documented'
    ]
  },
  {
    id: 'edwards_account_revealed',
    title: 'Edwards Account Revealed',
    date: '1943',
    description: 'The bank account details for T.G. Edwards are revealed, showing how the network financed their operations through British banking institutions.',
    location: 'london',
    characters: [
      { characterId: 'tg_edwards', role: 'Account holder' }
    ],
    significance: 'Shows the network\'s financial infrastructure and use of British institutions',
    chapter: 'chapter_11',
    keyActions: [
      'Account details revealed',
      'Banking connections identified',
      'Financial methods exposed',
      'Operational funding traced'
    ]
  },
  {
    id: 'train_journey',
    title: 'Train Journey with Case Switching',
    date: '1943',
    description: 'Edwards travels by train with a grey-haired woman (Louise) and Davies/Young, with cases being switched in Box Tunnel. This operation is part of the network\'s logistics.',
    location: 'train_box_tunnel',
    characters: [
      { characterId: 'tg_edwards', role: 'Traveler' },
      { characterId: 'louise_harrington', role: 'Grey-haired woman' },
      { characterId: 'sir_john_davies', role: 'Traveler using alias' }
    ],
    significance: 'Shows the network\'s operational methods and case-switching techniques',
    chapter: 'chapter_12',
    keyActions: [
      'Train journey undertaken',
      'Cases switched in Box Tunnel',
      'Operational logistics conducted',
      'Network methods revealed'
    ]
  },
  {
    id: 'case_switching',
    title: 'Case Switching Operation',
    date: '1943',
    description: 'During the train journey, cases are switched in Box Tunnel as part of the network\'s operational logistics. This technique is used to confuse surveillance and transport materials.',
    location: 'box_tunnel',
    characters: [
      { characterId: 'louise_harrington', role: 'Case switcher' },
      { characterId: 'sir_john_davies', role: 'Case switcher' }
    ],
    significance: 'Demonstrates the network\'s sophisticated operational techniques',
    chapter: 'chapter_12',
    keyActions: [
      'Cases prepared for switching',
      'Switch conducted in tunnel',
      'Surveillance confused',
      'Materials transported'
    ]
  },
  {
    id: 'box_tunnel_incident',
    title: 'Box Tunnel Incident',
    date: '1943',
    description: 'The case switching operation in Box Tunnel is a key moment in the network\'s logistics, showing their ability to conduct complex operations under surveillance.',
    location: 'box_tunnel',
    characters: [
      { characterId: 'louise_harrington', role: 'Operative' },
      { characterId: 'sir_john_davies', role: 'Operative' }
    ],
    significance: 'Key operational moment showing network capabilities',
    chapter: 'chapter_12',
    keyActions: [
      'Tunnel location chosen',
      'Timing coordinated',
      'Switch executed',
      'Escape completed'
    ]
  },
  {
    id: 'edwards_murder',
    title: 'Edwards Murder',
    date: '1943',
    description: 'T.G. Edwards is murdered in his London flat by a woman disguised as a postman. This murder is part of the network\'s operational security.',
    location: 'crawford_place_london',
    characters: [
      { characterId: 'tg_edwards', role: 'Victim' },
      { characterId: 'murderer', role: 'Woman disguised as postman' }
    ],
    significance: 'Shows the network\'s willingness to use violence and their operational security methods',
    chapter: 'chapter_13',
    keyActions: [
      'Postman disguise used',
      'Flat accessed',
      'Edwards murdered',
      'Escape made'
    ]
  },
  {
    id: 'postman_disguise',
    title: 'Postman Disguise Used in Murder',
    date: '1943',
    description: 'A woman disguised as a postman murders T.G. Edwards in his London flat. This disguise technique shows the network\'s sophisticated operational methods.',
    location: 'crawford_place_london',
    characters: [
      { characterId: 'murderer', role: 'Woman disguised as postman' },
      { characterId: 'tg_edwards', role: 'Victim' }
    ],
    significance: 'Demonstrates the network\'s use of sophisticated disguises for violent operations',
    chapter: 'chapter_13',
    keyActions: [
      'Postman disguise prepared',
      'Disguise maintained during operation',
      'Murder committed',
      'Disguise aided escape'
    ]
  },
  {
    id: 'investigation_begins',
    title: 'Investigation Begins',
    date: '1943',
    description: 'Chief Inspector George Bennet begins investigating Edwards\' murder, discovering connections to Nazi operations. This investigation leads to the broader intelligence operation.',
    location: 'london',
    characters: [
      { characterId: 'george_bennet', role: 'Lead investigator' }
    ],
    significance: 'Marks the beginning of the official investigation into the Nazi network',
    chapter: 'chapter_14',
    keyActions: [
      'Murder scene examined',
      'Evidence collected',
      'Connections identified',
      'Investigation expanded'
    ]
  },
  {
    id: 'bennet_investigation',
    title: 'Bennet\'s Investigation',
    date: '1943',
    description: 'George Bennet conducts a thorough investigation into Edwards\' murder, uncovering the connections to Nazi operations and expanding the scope of the investigation.',
    location: 'london',
    characters: [
      { characterId: 'george_bennet', role: 'Investigator' }
    ],
    significance: 'Establishes the official investigation that will lead to the broader operation',
    chapter: 'chapter_14',
    keyActions: [
      'Evidence analyzed',
      'Connections traced',
      'Network identified',
      'Operation scope determined'
    ]
  },
  {
    id: 'knitters_network_revealed',
    title: 'The Knitters Network Revealed',
    date: '1943',
    description: 'The extent of the Nazi sympathizer network known as "the knitters" is revealed, showing their connections across Britain and their operational methods.',
    location: 'uk',
    characters: [
      { characterId: 'intelligence_teams', role: 'Investigators' }
    ],
    significance: 'Provides comprehensive understanding of the network\'s scope and operations',
    chapter: 'chapter_15',
    keyActions: [
      'Network extent mapped',
      'Connections identified',
      'Operational methods revealed',
      'Threat assessment completed'
    ]
  },
  {
    id: 'network_connections',
    title: 'Network Connections Mapped',
    date: '1943',
    description: 'The connections between various Nazi sympathizers across Britain are mapped, showing how the network operates and communicates.',
    location: 'uk',
    characters: [
      { characterId: 'intelligence_teams', role: 'Analysts' }
    ],
    significance: 'Provides operational intelligence for counter-intelligence operations',
    chapter: 'chapter_15',
    keyActions: [
      'Connections identified',
      'Communication methods mapped',
      'Operational structure revealed',
      'Counter-intelligence planned'
    ]
  },
  {
    id: 'louise_betrayal',
    title: 'Louise\'s Betrayal Revealed',
    date: '1943',
    description: 'Louise Harrington reveals herself as a double agent, working for British intelligence while pretending to be part of the Nazi network. This revelation changes the dynamics of the operation.',
    location: 'various',
    characters: [
      { characterId: 'louise_harrington', role: 'Double agent' },
      { characterId: 'bill_lawrie', role: 'Handler' }
    ],
    significance: 'Provides an inside source in the Nazi network and changes operational dynamics',
    chapter: 'chapter_16',
    keyActions: [
      'Double agent status revealed',
      'Information provided to intelligence',
      'Operational role established',
      'Network infiltration confirmed'
    ]
  },
  {
    id: 'double_agent_revealed',
    title: 'Double Agent Status Confirmed',
    date: '1943',
    description: 'Louise Harrington\'s status as a double agent is confirmed, showing that British intelligence has successfully infiltrated the Nazi network.',
    location: 'various',
    characters: [
      { characterId: 'louise_harrington', role: 'Double agent' },
      { characterId: 'bill_lawrie', role: 'Handler' }
    ],
    significance: 'Demonstrates the success of British intelligence infiltration operations',
    chapter: 'chapter_16',
    keyActions: [
      'Status confirmed',
      'Handler relationship established',
      'Information flow established',
      'Operational role defined'
    ]
  },
  {
    id: 'final_operation_preparation',
    title: 'Final Operation Preparation',
    date: 'December 1943',
    description: 'British intelligence teams track the movements of conspirators as they prepare for their final operation. The teams monitor their activities and gather intelligence.',
    location: 'various',
    characters: [
      { characterId: 'intelligence_teams', role: 'Surveillance operatives' },
      { characterId: 'conspirators', role: 'Subjects of surveillance' }
    ],
    significance: 'Shows the final phase of the intelligence operation before the climax',
    chapter: 'chapter_17',
    keyActions: [
      'Surveillance intensified',
      'Movements tracked',
      'Preparations observed',
      'Intelligence gathered'
    ]
  },
  {
    id: 'conspirator_tracking',
    title: 'Conspirator Tracking',
    date: 'December 1943',
    description: 'Intelligence teams track the movements of all conspirators, monitoring their preparations for the final operation and gathering intelligence on their plans.',
    location: 'various',
    characters: [
      { characterId: 'intelligence_teams', role: 'Tracking operatives' }
    ],
    significance: 'Provides operational intelligence for the final phase of the operation',
    chapter: 'chapter_17',
    keyActions: [
      'All conspirators tracked',
      'Movements monitored',
      'Plans identified',
      'Intelligence compiled'
    ]
  },
  {
    id: 'flight_ireland',
    title: 'Flight to Ireland',
    date: 'December 1943',
    description: 'Davies, Davies and Snowdens flee to Ireland as the net closes in, leaving the Harringtons to take over Cynthia\'s house. This shows the network\'s escape planning.',
    location: 'ireland',
    characters: [
      { characterId: 'sir_john_davies', role: 'Fleeing conspirator' },
      { characterId: 'lady_megan_davies', role: 'Fleeing conspirator' },
      { characterId: 'peter_snowden', role: 'Fleeing conspirator' },
      { characterId: 'marjorie_snowden', role: 'Fleeing conspirator' }
    ],
    significance: 'Shows the network\'s escape planning and the pressure they are under',
    chapter: 'chapter_18',
    keyActions: [
      'Escape to Ireland planned',
      'Escape executed',
      'Harringtons left behind',
      'Network fragmented'
    ]
  },
  {
    id: 'harringtons_takeover',
    title: 'Harringtons Take Over House',
    date: 'December 1943',
    description: 'With the others fleeing to Ireland, the Harringtons take over Cynthia\'s house to continue the operation. This shows their commitment to the cause.',
    location: 'cynthia_house_bucklebury',
    characters: [
      { characterId: 'bob_harrington', role: 'House occupant' },
      { characterId: 'louise_harrington', role: 'House occupant' }
    ],
    significance: 'Shows the Harringtons\' commitment and the network\'s operational continuity',
    chapter: 'chapter_18',
    keyActions: [
      'House occupied',
      'Operations continued',
      'Position maintained',
      'Surveillance continued'
    ]
  },
  {
    id: 'assassination_attempt',
    title: 'Assassination Attempt',
    date: 'December 1943',
    description: 'The conspirators attempt to assassinate Montgomery during his inspection of the American Transport Division Camp. This is their main operational objective.',
    location: 'american_transport_division_camp',
    characters: [
      { characterId: 'bob_harrington', role: 'Assassin' },
      { characterId: 'louise_harrington', role: 'Support operative' },
      { characterId: 'montgomery', role: 'Target' }
    ],
    significance: 'The main operational objective of the Nazi network',
    chapter: 'chapter_19',
    keyActions: [
      'Position established',
      'Target identified',
      'Shot fired',
      'Attempt made'
    ]
  },
  {
    id: 'montgomery_target',
    title: 'Montgomery as Target',
    date: 'December 1943',
    description: 'Field Marshal Montgomery is identified as the target of the assassination attempt during his inspection of the American Transport Division Camp.',
    location: 'american_transport_division_camp',
    characters: [
      { characterId: 'montgomery', role: 'Target' },
      { characterId: 'conspirators', role: 'Assassins' }
    ],
    significance: 'Shows the high-level nature of the network\'s targets',
    chapter: 'chapter_19',
    keyActions: [
      'Target identified',
      'Inspection schedule learned',
      'Position established',
      'Assassination attempted'
    ]
  },
  {
    id: 'louise_intervention',
    title: 'Louise\'s Intervention',
    date: 'December 1943',
    description: 'Louise intervenes during the assassination attempt, revealing her true allegiance and helping to foil the plot. This shows her commitment to British intelligence.',
    location: 'american_transport_division_camp',
    characters: [
      { characterId: 'louise_harrington', role: 'Double agent' },
      { characterId: 'bob_harrington', role: 'Assassin' }
    ],
    significance: 'Prevents the assassination and reveals Louise\'s true allegiance',
    chapter: 'chapter_20',
    keyActions: [
      'Intervention made',
      'Assassination foiled',
      'Allegiance revealed',
      'Plot disrupted'
    ]
  },
  {
    id: 'assassination_foiled',
    title: 'Assassination Plot Foiled',
    date: 'December 1943',
    description: 'The assassination attempt on Montgomery is foiled through Louise\'s intervention and the response of security forces. The plot fails completely.',
    location: 'american_transport_division_camp',
    characters: [
      { characterId: 'louise_harrington', role: 'Double agent' },
      { characterId: 'security_forces', role: 'Responders' }
    ],
    significance: 'The main operational objective of the Nazi network fails completely',
    chapter: 'chapter_20',
    keyActions: [
      'Plot disrupted',
      'Security forces respond',
      'Assassination prevented',
      'Operation fails'
    ]
  },
  {
    id: 'arrests_capture',
    title: 'Arrests and Capture',
    date: 'December 1943',
    description: 'Bob Harrington and Sir John Davies are arrested after the failed assassination attempt, while the others remain at large in Ireland.',
    location: 'various',
    characters: [
      { characterId: 'bob_harrington', role: 'Arrested conspirator' },
      { characterId: 'sir_john_davies', role: 'Arrested conspirator' },
      { characterId: 'security_forces', role: 'Arresting officers' }
    ],
    significance: 'Shows the partial success of the counter-intelligence operation',
    chapter: 'chapter_21',
    keyActions: [
      'Harrington arrested',
      'Davies arrested',
      'Others escape',
      'Partial success achieved'
    ]
  },
  {
    id: 'harrington_davies_caught',
    title: 'Harrington and Davies Caught',
    date: 'December 1943',
    description: 'Bob Harrington and Sir John Davies are successfully captured after the failed assassination attempt, providing valuable intelligence through interrogation.',
    location: 'various',
    characters: [
      { characterId: 'bob_harrington', role: 'Captured conspirator' },
      { characterId: 'sir_john_davies', role: 'Captured conspirator' }
    ],
    significance: 'Provides intelligence through interrogation and shows operational success',
    chapter: 'chapter_21',
    keyActions: [
      'Both conspirators captured',
      'Interrogation begins',
      'Intelligence gathered',
      'Network exposed'
    ]
  },
  {
    id: 'aftermath_assassination',
    title: 'Aftermath of Assassination Attempt',
    date: 'December 1943',
    description: 'The immediate aftermath of the failed assassination attempt and the intelligence operation. Security forces assess the damage and gather evidence.',
    location: 'american_transport_division_camp',
    characters: [
      { characterId: 'security_forces', role: 'Investigators' },
      { characterId: 'intelligence_teams', role: 'Operatives' }
    ],
    significance: 'Shows the immediate consequences and evidence gathering',
    chapter: 'chapter_22',
    keyActions: [
      'Scene secured',
      'Evidence collected',
      'Damage assessed',
      'Investigation continues'
    ]
  },
  {
    id: 'operation_results',
    title: 'Operation Results',
    date: 'December 1943',
    description: 'The results of the intelligence operation are assessed, showing both successes and failures in countering the Nazi network.',
    location: 'various',
    characters: [
      { characterId: 'intelligence_teams', role: 'Assessors' }
    ],
    significance: 'Provides assessment of the overall operation\'s effectiveness',
    chapter: 'chapter_22',
    keyActions: [
      'Results assessed',
      'Successes identified',
      'Failures analyzed',
      'Lessons learned'
    ]
  },
  {
    id: 'louise_gas_explosion',
    title: 'Louise\'s Gas Explosion Death',
    date: 'December 1943',
    description: 'Louise is killed in a suspicious gas explosion, likely orchestrated by the remaining conspirators as revenge for her betrayal.',
    location: 'louise_cottage',
    characters: [
      { characterId: 'louise_harrington', role: 'Victim' },
      { characterId: 'remaining_conspirators', role: 'Likely perpetrators' }
    ],
    significance: 'Shows the network\'s willingness to eliminate traitors and the consequences of betrayal',
    chapter: 'chapter_23',
    keyActions: [
      'Gas explosion orchestrated',
      'Louise killed',
      'Neighbor also killed',
      'Suspicious circumstances'
    ]
  },
  {
    id: 'suspicious_death',
    title: 'Suspicious Death Investigation',
    date: 'December 1943',
    description: 'Louise\'s death is investigated as a suspicious gas explosion, but no one claims responsibility. The circumstances suggest orchestrated murder.',
    location: 'louise_cottage',
    characters: [
      { characterId: 'investigators', role: 'Investigators' }
    ],
    significance: 'Shows the difficulty of proving orchestrated murder in wartime',
    chapter: 'chapter_23',
    keyActions: [
      'Death investigated',
      'Suspicious circumstances noted',
      'No responsibility claimed',
      'Case remains open'
    ]
  },
  {
    id: 'trial_imprisonment',
    title: 'Trial and Imprisonment',
    date: '1944',
    description: 'Bob and Davies are tried for attempted murder and crimes against the state "in camera" for security reasons, and gaoled. The judiciary realizes there is not enough evidence to try them for treason.',
    location: 'uk',
    characters: [
      { characterId: 'bob_harrington', role: 'Defendant' },
      { characterId: 'sir_john_davies', role: 'Defendant' }
    ],
    significance: 'Shows the legal consequences for the captured conspirators',
    chapter: 'chapter_24',
    keyActions: [
      'Trial conducted in camera',
      'Attempted murder charges',
      'Crimes against state charges',
      'Imprisonment ordered'
    ]
  },
  {
    id: 'cynthia_obe',
    title: 'Cynthia Receives OBE',
    date: '1944',
    description: 'Cynthia receives an OBE for "services to war work" in the next honours list, recognizing her contribution to British intelligence operations.',
    location: 'uk',
    characters: [
      { characterId: 'cynthia_childreth', role: 'Recipient' }
    ],
    significance: 'Recognizes Cynthia\'s contribution to British intelligence and the war effort',
    chapter: 'chapter_24',
    keyActions: [
      'OBE awarded',
      'Services to war work recognized',
      'Honour conferred',
      'Contribution acknowledged'
    ]
  }
];
