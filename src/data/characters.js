// Extended character data with more detailed information
export const charactersData = [
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
  }
];