// Character data for "Stitched Up" book

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
    },
    {
      id: 'montgomery',
      name: 'Lieutenant General Bernard Montgomery',
      title: 'Lieutenant General',
      group: 'Military',
      role: 'Target of assassination plot',
      background: 'Senior British Army officer, commander of the Eighth Army in North Africa and Italy. Known for his victory at El Alamein and distinctive beret with two badges.',
      personality: 'Confident, meticulous, sometimes arrogant. Known for boosting troop morale through personal visits.',
      traits: ['Strategic', 'Charismatic', 'Methodical', 'Recognizable'],
      significance: 'Primary target of the assassination plot. His death was intended to disrupt Allied invasion planning.',
      key_scenes: ['montgomery_visit', 'assassination_attempt']
    },
    {
      id: 'gladys',
      name: 'Gladys',
      group: 'Supporting Characters',
      role: 'Village postmistress and inadvertent intelligence asset',
      background: 'Long-time resident and postmistress in Cynthia\'s village. Knows everyone and observes everything.',
      personality: 'Observant, gossipy but reliable, loyal to the community',
      traits: ['Vigilant', 'Knowledgeable about local affairs', 'Trusted'],
      relations: [
        { characterId: 'cynthia_childreth', type: 'village_contact', description: 'Trusted local who provides information about strangers in the village' }
      ],
      significance: 'Provides crucial intelligence about unknown visitors and watchers in the village',
      key_scenes: ['village_surveillance']
    },
    {
      id: 'alison',
      name: 'Alison',
      group: 'Protagonists',
      role: 'Intelligence agent',
      background: 'MI5 operative specializing in surveillance and disguise',
      personality: 'Adaptable, quick-thinking, resourceful',
      traits: ['Master of disguise', 'Observant', 'Resilient'],
      relations: [
        { characterId: 'bill_laurie', type: 'subordinate', description: 'Works under Bill\'s direction' }
      ],
      aliases: ['Sarah (to Cynthia)', 'Rambler (on train)'],
      key_scenes: ['train_journey', 'house_protection']
    },
    {
      id: 'felicity',
      name: 'Felicity',
      group: 'Protagonists',
      role: 'Bill\'s secretary who becomes field operative',
      background: 'Office worker who transitions to field operations',
      personality: 'Resourceful, adaptable, enthusiastic about field work',
      traits: ['Observant', 'Diligent', 'Versatile'],
      aliases: ['Writer (in Aldworth)'],
      key_scenes: ['cottage_surveillance']
    },
    {
      id: 'don',
      name: 'Don',
      group: 'Protagonists',
      role: 'Intelligence operative who trains Cynthia',
      background: 'Experienced agent specializing in tradecraft',
      personality: 'Professional, direct, methodical',
      traits: ['Experienced operative', 'Good teacher', 'Practical'],
      key_scenes: ['tradecraft_training']
    },
    {
      id: 'jack',
      name: 'Jack',
      group: 'Fifth Columnists',
      role: 'Shopkeeper in Aldworth working with Nazi sympathizers',
      background: 'Local shopkeeper and postmaster secretly supporting fifth columnists',
      personality: 'Outwardly friendly, inwardly scheming',
      traits: ['Deceptive', 'Observant', 'Connected'],
      relations: [
        { characterId: 'louise_harrington', type: 'co-conspirator', description: 'Provides local intelligence and assistance to Louise' }
      ],
      key_scenes: ['cottage_surveillance', 'house_occupation']
    },
    {
      id: 'keith',
      name: 'Keith',
      group: 'Protagonists',
      role: 'Intelligence operative and artist cover',
      background: 'Agent who assumes cover as artist for surveillance',
      personality: 'Observant, detail-oriented, patient',
      traits: ['Artistic', 'Discreet'],
      key_scenes: ['surveillance_operation', 'final_operation']
    },
    {
      id: 'bert',
      name: 'Bert',
      group: 'Protagonists',
      role: 'Intelligence operative who discovers Edwards\' body',
      background: 'Special Branch officer with artistic talent',
      personality: 'Resourceful, observant, resilient',
      traits: ['Artistic', 'Adaptable'],
      key_scenes: ['edwards_discovery', 'surveillance_operation']
    },
    {
      id: 'mike',
      name: 'Mike',
      group: 'Protagonists',
      role: 'Intelligence operative',
      background: 'Special Branch officer',
      personality: 'Analytical, thorough',
      traits: ['Detail-oriented', 'Methodical'],
      key_scenes: ['surveillance_operation', 'final_operation']
    },
    {
      id: 'patrick',
      name: 'Patrick',
      group: 'Supporting Characters',
      role: 'Butler at Denleigh Manor',
      background: 'Professional butler serving the Wyndholmes',
      personality: 'Formal, discreet',
      traits: ['Professional', 'Observant']
    },
    {
      id: 'sheila',
      name: 'Sheila',
      group: 'Supporting Characters',
      role: 'Maid at Denleigh Manor',
      background: 'Household staff',
      personality: 'Attentive, proper',
      traits: ['Efficient', 'Proper']
    },
    {
      id: 'horace_wyndholme',
      name: 'Horace Wyndholme',
      group: 'Supporting Characters',
      role: 'Amy\'s husband, works for Foreign Office',
      background: 'Amy\'s husband who actually works in intelligence',
      traits: ['Connected', 'Intelligence officer']
    },
    {
      id: 'oswald_mosley',
      name: 'Sir Oswald Mosley',
      title: 'Sir',
      group: 'Historical Figures',
      role: 'Leader of British Union of Fascists',
      background: 'Former Member of Parliament who founded the British Union of Fascists in 1932',
      personality: 'Charismatic, authoritarian, ambitious',
      traits: ['Oratorical', 'Fascist', 'Ambitious'],
      key_scenes: ['second_party']
    },
    {
      id: 'helmut_schnitter',
      name: 'Helmut Schnitter',
      group: 'German Connection',
      role: 'German agent in preface',
      background: 'Originally from Hamburg, infiltrates UK via Scilly Isles',
      traits: ['Determined', 'Disciplined'],
      key_scenes: ['german_infiltration']
    },
    {
    id: 'montys_adc',
    name: 'Montgomery\'s ADC',
    group: 'Military',
    role: 'Montgomery\'s aide-de-camp, liaison with intelligence team',
    background: 'Military officer serving as Montgomery\'s personal assistant',
    traits: ['Efficient', 'Discreet', 'Cooperative'],
    significance: 'Coordinates security arrangements with Bill, arranges "three Montgomerys" decoy',
    key_scenes: ['intelligence_meeting', 'montgomery_visit']
  },
  {
    id: 'inspector_williams',
    name: 'Inspector Williams',
    group: 'Supporting Characters',
    role: 'Police inspector in Pembrokeshire investigating Davies',
    background: 'Local police officer who assists with tracking Davies\' escape to Ireland',
    traits: ['Thorough', 'Cooperative'],
    key_scenes: ['davies_ireland_investigation']
  },
  {
    id: 'paul_holness',
    name: 'Paul Holness',
    group: 'Supporting Characters',
    role: 'Publishing company owner acting as intelligence intermediary',
    background: 'Former RAF colleague of Bill\'s who runs publishing company',
    personality: 'Reliable, discreet, supportive of intelligence operations',
    traits: ['Trustworthy', 'Efficient'],
    relations: [
      { characterId: 'bill_laurie', type: 'former_colleague', description: 'Former RAF colleague who assists with intelligence operations' },
      { characterId: 'felicity', type: 'cover_provider', description: 'Provides publishing cover for Felicity\'s reports' }
    ],
    key_scenes: ['felicity_reports_handling']
  },
  {
    id: 'jacobs',
    name: 'Jacobs',
    group: 'Supporting Characters',
    role: 'Intelligence service armorer',
    background: 'Weapons expert who identifies the 7.92mm shell casing',
    traits: ['Knowledgeable', 'Technical'],
    key_scenes: ['shell_casing_identification']
  },
  {
    id: 'ken',
    name: 'Ken',
    group: 'Protagonists',
    role: 'Intelligence operative stationed at vehicle during final operation',
    traits: ['Reliable', 'Alert'],
    key_scenes: ['final_operation']
  },
  {
    id: 'chief_inspector',
    name: 'Chief Inspector (St. Johns)',
    group: 'Supporting Characters',
    role: 'Police officer initially handling Edwards murder case',
    personality: 'Professional but territorial about jurisdiction',
    traits: ['Professional', 'By-the-book'],
    key_scenes: ['edwards_murder_investigation']
  }
];
