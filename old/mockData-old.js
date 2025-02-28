// mockData.js
// This file contains the data that would normally be parsed from our XML

export const charactersData = [
  {
    id: 'cynthia_childreth',
    name: 'Lady Cynthia Childreth',
    title: 'Lady',
    group: 'Protagonists',
    role: 'Main protagonist, undercover operative',
    background: 'Wealthy aristocrat, well-educated, multilingual, unconventional',
    personality: 'Independent, observant, quick-thinking, adaptable',
    traits: ['Multilingual', 'Well-traveled', 'Independent thinker'],
    relations: [
      { characterId: 'richard_childreth', type: 'spouse', description: 'Marriage of convenience' },
      { characterId: 'amy_wyndholme', type: 'friend', description: 'Old school friend' },
      { characterId: 'bill_laurie', type: 'handler', description: 'Intelligence handler' },
      { characterId: 'mary', type: 'employee_friend', description: 'Secretary and confidante' }
    ],
    development: [
      { phase: 'Beginning', description: 'Socialite with unconventional views' },
      { phase: 'Middle', description: 'Reluctant intelligence asset' },
      { phase: 'End', description: 'Effective operative, honored with OBE' }
    ]
  },
  {
    id: 'richard_childreth',
    name: 'Richard Childreth',
    group: 'Protagonists',
    role: 'Cynthia\'s husband, banker, supporting operative',
    background: 'Self-made financier who worked his way to top position',
    personality: 'Practical, professional, supportive',
    traits: ['Financially astute', 'Loyal'],
    relations: [
      { characterId: 'cynthia_childreth', type: 'spouse', description: 'Marriage of convenience' }
    ]
  },
  {
    id: 'bill_laurie',
    name: 'Wing Commander William Laurie',
    group: 'Protagonists',
    role: 'Intelligence officer, Cynthia\'s handler',
    background: 'Former RFC/RAF pilot injured in WWI',
    personality: 'Strategic, cautious, intelligent',
    traits: ['Military background', 'Strategic thinker'],
    relations: [
      { characterId: 'cynthia_childreth', type: 'asset', description: 'Recruits and handles Cynthia' },
      { characterId: 'hannah_park', type: 'colleague', description: 'Works with Hannah' },
      { characterId: 'jane_maclean', type: 'colleague', description: 'Works with Jane' },
      { characterId: 'edwin', type: 'subordinate', description: 'Edwin is Bill\'s "minder"' },
      { characterId: 'george_bennet', type: 'colleague', description: 'Collaborates with Special Branch' },
      { characterId: 'louise_harrington', type: 'asset', description: 'Secret informant' }
    ]
  },
  {
    id: 'hannah_park',
    name: 'Hannah Park',
    group: 'Protagonists',
    role: 'Intelligence agent',
    background: 'Former Section Controller in WAACs',
    personality: 'Bold, unconventional, adaptable',
    traits: ['Master of disguise', 'Provocative']
  },
  {
    id: 'jane_maclean',
    name: 'Jane Maclean',
    group: 'Protagonists',
    role: 'Intelligence agent',
    background: 'Former Section Controller in WAACs',
    traits: ['Observant']
  },
  {
    id: 'peter_snowden',
    name: 'Colonel Peter Snowden',
    title: 'Claims to be Colonel, actually Major',
    group: 'Fifth Columnists',
    role: 'Fifth columnist, pro-Nazi sympathizer',
    background: 'Self-made man, started as butcher\'s son, served in WWI',
    personality: 'Pompous, pretends to be drunk, calculated',
    traits: ['Military background', 'Status-conscious', 'Feigns drunkenness'],
    fate: 'Escaped to Ireland'
  },
  {
    id: 'marjorie_snowden',
    name: 'Marjorie Snowden',
    group: 'Fifth Columnists',
    role: 'Fifth columnist, pro-Nazi sympathizer',
    personality: 'Strongly opinionated, intolerant',
    traits: ['Cannot drive', 'Outspoken'],
    fate: 'Escaped to Ireland'
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
    id: 'louise_harrington',
    name: 'Louise Harrington',
    group: 'Fifth Columnists',
    role: 'Fifth columnist who becomes double agent',
    background: 'University educated (Girton), linguistics graduate',
    personality: 'Cunning, adaptable, eventually sympathetic',
    traits: ['Knitter', 'Intelligent', 'Morally complex'],
    fate: 'Killed in suspicious gas explosion after events'
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
    id: 'gerda_stammer',
    name: 'Gerda Stammer',
    group: 'German Connection',
    role: 'German Nazi sympathizer',
    traits: ['Enthusiastic Hitler supporter']
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
    role: 'Original member of the German pro-Nazi group',
    traits: ['Dedicated to Nazi cause']
  },
  {
    id: 'mary',
    name: 'Mary',
    group: 'Supporting Characters',
    role: 'Cynthia\'s secretary and confidante',
    personality: 'Loyal, practical',
    traits: ['Loyal', 'Resourceful']
  },
  {
    id: 'edwin',
    name: 'Edwin',
    group: 'Supporting Characters',
    role: 'Military personnel posing as butler',
    background: '"Minder" for Bill'
  },
  {
    id: 'george_bennet',
    name: 'George Bennet',
    group: 'Supporting Characters',
    role: 'Chief Inspector, Special Branch',
    background: 'Widower (wife died of tuberculosis in 1936)',
    personality: 'Dedicated, observant, methodical'
  },
  {
    id: 'edwards',
    name: 'T.G. Edwards',
    group: 'German Connection',
    role: 'German agent',
    fate: 'Murdered in London flat'
  }
];

export const eventsData = [
  {
    id: 'german_infiltration',
    title: 'German Infiltration via Scilly Isles',
    date: '1943',
    description: 'Helmut Schnitter arrives via submarine at Scilly Isles, MI5 receives intelligence about German infiltration',
    location: 'scilly_isles',
    characters: [
      { characterId: 'helmut_schnitter' }
    ]
  },
  {
    id: 'cynthia_recruitment',
    title: 'Cynthia\'s Recruitment',
    date: 'May 1932',
    description: 'Cynthia attends weekend at Denleigh Manor and is approached for intelligence work',
    location: 'denleigh_manor',
    characters: [
      { characterId: 'cynthia_childreth' },
      { characterId: 'richard_childreth' },
      { characterId: 'bill_laurie', role: 'recruiter