// Event data for "Stitched Up" book

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
    },
    {
      id: 'tradecraft_training',
      title: 'Cynthia\'s Tradecraft Training',
      date: 'Unspecified',
      description: 'Don visits Cynthia to teach her surveillance detection and other tradecraft skills',
      location: 'cynthia_house',
      characters: [
        { characterId: 'cynthia_childreth', role: 'trainee' },
        { characterId: 'don', role: 'trainer' },
        { characterId: 'mary', role: 'observer' }
      ],
      significance: 'Cynthia learns essential skills for her role, including counter-surveillance techniques',
      keyActions: [
        'Don teaches "back doubles" technique',
        'Instruction on using reflections to detect surveillance',
        'Travel arrangement methods',
        'General tradecraft principles'
      ]
    },
    {
      id: 'secure_line_installation',
      title: 'Secure Phone Line Installation',
      date: 'Unspecified',
      description: 'Intelligence team installs a separate secure telephone line at Cynthia\'s house',
      location: 'cynthia_house',
      characters: [
        { characterId: 'cynthia_childreth', role: 'resident' },
        { characterId: 'mary', role: 'assistant' }
      ],
      significance: 'Creates secure communication channel that becomes vital during the final operation',
      keyActions: [
        'Technicians install separate phone line',
        'Line connected directly to intelligence headquarters',
        'Phone placed in bedroom away from potential eavesdroppers'
      ]
    },
    {
      id: 'edwards_discovery',
      title: 'Discovery of Edwards\' Body',
      date: '1943',
      description: 'Bert, disguised as gas inspector, discovers Edwards\' body in London flat',
      location: 'crawford_place',
      characters: [
        { characterId: 'bert', role: 'discoverer' },
        { characterId: 'george_bennet', role: 'investigator' },
        { characterId: 'jim', role: 'assistant' }
      ],
      significance: 'Confirms murder of Edwards and begins focus on assassination plot investigation',
      keyActions: [
        'Bert enters flat disguised as gas man',
        'Discovery of body with single shot to head',
        'Identification of books in suitcase instead of radio',
        'Beginning of deeper investigation'
      ]
    },
    {
      id: 'intelligence_meeting',
      title: 'Intelligence Meeting at National Gallery',
      date: 'December 1943',
      description: 'Bill gathers team at National Gallery to plan response to emerging assassination threat',
      location: 'national_gallery',
      characters: [
        { characterId: 'bill_laurie', role: 'leader' },
        { characterId: 'cynthia_childreth', role: 'informant' },
        { characterId: 'george_bennet', role: 'investigator' },
        { characterId: 'jane_maclean', role: 'agent' },
        { characterId: 'hannah_park', role: 'agent' }
      ],
      significance: 'Critical planning meeting that identifies Montgomery as likely target',
      keyActions: [
        'Team discusses possible targets',
        'Sharing of intelligence about fifth columnists',
        'Development of counter-strategy',
        'Decision to focus on Montgomery\'s visits'
      ]
    },
    {
      id: 'intelligence_meeting_blenheim',
      title: 'Meeting at Blenheim Palace',
      date: '1943',
      description: 'George meets Bill at Blenheim Palace MI5 headquarters to discuss Edwards investigation',
      location: 'blenheim_palace',
      characters: [
        { characterId: 'bill_laurie', role: 'host' },
        { characterId: 'george_bennet', role: 'visitor' }
      ],
      significance: 'Connects Special Branch investigation with MI5 operation, sharing critical information',
      keyActions: [
        'George shares details of Edwards murder investigation',
        'Bill reveals background of fifth columnist operation',
        'Decision to collaborate on investigation',
        'Discussion of possible assassination targets'
      ]
    },
    {
      id: 'ritz_meeting',
      title: 'Cynthia and Hannah Meet at The Ritz',
      date: '1943',
      description: 'Cynthia meets Hannah (disguised as blonde society lady) at The Ritz while under surveillance',
      location: 'the_ritz',
      characters: [
        { characterId: 'cynthia_childreth', role: 'operative' },
        { characterId: 'hannah_park', role: 'operative', disguise: 'Blonde society lady' },
        { characterId: 'marjorie_snowden', role: 'surveillance' }
      ],
      significance: 'Planning meeting that reveals Cynthia is under surveillance by fifth columnists',
      keyActions: [
        'Hannah appears in completely new disguise',
        'Identification of Snowdens conducting surveillance',
        'Discussion of Mosley invitation plan',
        'Counter-surveillance measures practiced'
      ]
    },
    {
      id: 'cottage_surveillance',
      title: 'Felicity\'s Cottage Surveillance',
      date: 'December 1943',
      description: 'Felicity poses as writer to rent cottage in Aldworth for surveillance of Harringtons',
      location: 'felicity_cottage',
      characters: [
        { characterId: 'felicity', role: 'operative', disguise: 'Writer' },
        { characterId: 'bob_harrington', role: 'target' },
        { characterId: 'louise_harrington', role: 'target/double_agent' },
        { characterId: 'jack', role: 'suspicious_local' }
      ],
      significance: 'Establishes close surveillance of Harringtons before assassination attempt',
      keyActions: [
        'Felicity establishes cover as writer',
        'Observation of Harringtons\' activities',
        'Reports sent via postal system',
        'Identification of Jack as fifth columnist supporter'
      ]
    },
    {
      id: 'final_planning',
      title: 'Final Operation Planning',
      date: 'December 6, 1943',
      description: 'Intelligence team meets at Queen\'s Head pub to plan intervention at Cynthia\'s house',
      location: 'queens_head_pub',
      characters: [
        { characterId: 'bill_laurie', role: 'leader' },
        { characterId: 'george_bennet', role: 'planner' },
        { characterId: 'jim', role: 'operative' },
        { characterId: 'bert', role: 'operative' },
        { characterId: 'mike', role: 'operative' },
        { characterId: 'keith', role: 'operative' }
      ],
      significance: 'Detailed planning for the operation to prevent Montgomery assassination',
      keyActions: [
        'Team reviews intelligence',
        'Assignment of roles',
        'Planning of approach and entry methods',
        'Coordination with Montgomery\'s security team'
      ]
    },
    {
      id: 'cynthia_diversion_call',
      title: 'Cynthia\'s Diversion Phone Call',
      date: 'Late 1943',
      description: 'Cynthia makes deliberate call on open line to Richard expressing concerns about surveillance',
      location: 'cynthia_house',
      characters: [
        { characterId: 'cynthia_childreth', role: 'caller' },
        { characterId: 'richard_childreth', role: 'receiver' }
      ],
      significance: 'Strategic move to test fifth columnist reaction and potentially draw away watchers',
      keyActions: [
        'Deliberate call on unsecured line',
        'Expression of concern about surveillance',
        'Richard\'s scripted reassuring response',
        'Results in withdrawal of some watchers'
      ]
    },
    {
      id: 'summerhouse_hiding',
      title: 'Alison Hides in Summerhouse',
      date: 'December 5-7, 1943',
      description: 'Alison hides in Cynthia\'s summerhouse after escaping detection during house search',
      location: 'cynthia_house',
      characters: [
        { characterId: 'alison', role: 'agent in hiding' },
        { characterId: 'cynthia_childreth', role: 'supporter' },
        { characterId: 'louise_harrington', role: 'searcher' }
      ],
      significance: 'Maintains intelligence presence during house occupation',
      keyActions: [
        'Alison escapes initial house search',
        'Hides in summerhouse overnight',
        'Cynthia provides covert food drops',
        'Later relocates to cellar for better position'
      ]
    },
    {
      id: 'berlin_departure',
      title: 'Departure for Berlin Mission',
      date: '1932',
      description: 'Richard and Cynthia depart from Croydon Airport for their mission to Berlin',
      location: 'croydon_airport',
      characters: [
        { characterId: 'cynthia_childreth', role: 'operative' },
        { characterId: 'richard_childreth', role: 'operative' }
      ],
      significance: 'Beginning of the Berlin infiltration mission, first stage of establishing Nazi sympathizer cover',
      keyActions: [
        'Briefing on airport procedures',
        'First-time flyers experiencing anxiety',
        'Boarding the Junkers G38 aircraft',
        'Uncomfortable flight to Berlin'
      ]
    },
    {
      id: 'suitcase_opening',
      title: 'Opening of the Mysterious Suitcase',
      date: 'Late 1943',
      description: 'Edwin unlocks the suitcase left by Davies/Young to reveal women\'s clothes and disguise elements',
      location: 'cynthia_house',
      characters: [
        { characterId: 'edwin', role: 'lockpicker' },
        { characterId: 'cynthia_childreth', role: 'observer' },
        { characterId: 'mary', role: 'assistant' }
      ],
      significance: 'Revelation of suitcase contents, confirming its role in preparing for the assassination',
      keyActions: [
        'Edwin picks lock without leaving traces',
        'Discovery of women\'s clothes and disguise elements',
        'Realization of deception regarding radio equipment',
        'Careful resealing of case'
      ]
    },
    {
      id: 'bank_account_investigation',
      title: 'Investigation of Edwards\' Bank Account',
      date: '1943',
      description: 'Richard investigates the T.G. Edwards account at Martins Bank',
      location: 'martins_bank',
      characters: [
        { characterId: 'richard_childreth', role: 'investigator' }
      ],
      significance: 'Reveals financial arrangements behind German operations and status of Edwards\' account',
      keyActions: [
        'Checking account history',
        'Discovery of substantial funds',
        'Confirmation of Reichsbank deposits',
        'Setting up monitoring for future transactions'
      ]
    },
    {
      id: 'three_montgomerys_arrangement',
      title: 'Arrangement of "Three Montgomerys" Decoy',
      date: 'December 1943',
      description: 'Bill coordinates with Montgomery\'s ADC to arrange multiple decoys for the convoy',
      location: 'thames_house',
      characters: [
        { characterId: 'bill_laurie', role: 'planner' },
        { characterId: 'montys_adc', role: 'facilitator' }
      ],
      significance: 'Critical deception plan that ultimately confuses assassin and contributes to foiling the attempt',
      keyActions: [
        'Bill explains assassination threat',
        'Development of decoy strategy',
        'Arrangement of three similar jeeps',
        'Recruiting and briefing of Montgomery lookalikes'
      ]
    },
    {
      id: 'shell_casing_identification',
      title: 'Identification of Shell Casing',
      date: 'December 1943',
      description: 'Jacobs identifies the spent shell casing as from a German FG42 rifle',
      location: 'thames_house',
      characters: [
        { characterId: 'jacobs', role: 'expert' },
        { characterId: 'mike', role: 'investigator' }
      ],
      significance: 'Confirms German weapon type, providing crucial evidence linking to assassination plot',
      keyActions: [
        'Technical examination of shell casing',
        'Identification of German manufacture',
        'Confirmation of FG42 as source weapon',
        'Assessment of weapon capabilities'
      ]
    }
];
