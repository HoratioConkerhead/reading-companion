export const characters = [
  {
    id: 'cynthia_childreth',
    name: 'Lady Cynthia Childreth',
    title: 'Lady',
    group: 'Protagonists',
    role: 'Main protagonist, undercover operative for British intelligence',
    background: 'Wealthy aristocrat by birth, well-educated, multilingual (French and German), unconventional aristocrat who shuns social conventions',
    personality: 'Independent, observant, quick-thinking, adaptable, unconventional, prefers to live "in the shadows"',
    traits: ['Independent', 'Observant', 'Quick-thinking', 'Adaptable', 'Unconventional', 'Multilingual', 'Aristocratic'],
    relations: [
      { characterId: 'richard_childreth', type: 'spouse', description: 'Married to Richard in a marriage of convenience' },
      { characterId: 'amy_wyndholme', type: 'friend', description: 'Old school friend who helps recruit her' },
      { characterId: 'bill_lawrie', type: 'handler', description: 'Her intelligence handler and recruiter' },
      { characterId: 'hannah_park', type: 'colleague', description: 'Intelligence agent who helps recruit her' }
    ],
    development: [
      { phase: 'Beginning', description: 'Unconventional aristocrat living quietly in Bucklebury' },
      { phase: 'Recruitment', description: 'Recruited by British intelligence at Denleigh Manor' },
      { phase: 'Undercover', description: 'Becomes host for Nazi sympathizer parties to gather intelligence' },
      { phase: 'Active Agent', description: 'Fully involved in intelligence operations and surveillance' },
      { phase: 'Recognition', description: 'Receives OBE for services to war work' }
    ],
    fate: 'Survives the war and receives OBE for her intelligence work',
    key_scenes: ['cynthia_recruited', 'first_party_bucklebury', 'second_party_mosley', 'assassination_attempt'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'richard_childreth',
    name: 'Richard Childreth',
    title: 'Mr',
    group: 'Protagonists',
    role: 'Cynthia\'s husband, supporting operative for British intelligence',
    background: 'Self-made financier who worked his way to the top through hard work and determination',
    personality: 'Practical, professional, supportive of Cynthia, somewhat reserved',
    traits: ['Practical', 'Professional', 'Supportive', 'Reserved', 'Hard-working'],
    relations: [
      { characterId: 'cynthia_childreth', type: 'spouse', description: 'Married to Cynthia in a marriage of convenience' },
      { characterId: 'bill_lawrie', type: 'colleague', description: 'Also recruited for intelligence work' }
    ],
    development: [
      { phase: 'Beginning', description: 'Successful financier, married to Cynthia' },
      { phase: 'Recruitment', description: 'Recruited alongside Cynthia for intelligence work' },
      { phase: 'Support Role', description: 'Provides support and cover for Cynthia\'s operations' }
    ],
    fate: 'Survives the war, continues to support intelligence operations',
    key_scenes: ['cynthia_recruited', 'berlin_trip'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'bill_lawrie',
    name: 'Wing Commander William Lawrie',
    title: 'Wing Commander',
    group: 'Military',
    role: 'Intelligence officer, Cynthia\'s handler',
    background: 'Former RFC/RAF pilot injured in World War I, seconded to intelligence work after 1918',
    personality: 'Strategic, cautious, intelligent, experienced in intelligence operations',
    traits: ['Strategic', 'Cautious', 'Intelligent', 'Experienced', 'Military background'],
    aliases: ['Mr Newton'],
    relations: [
      { characterId: 'cynthia_childreth', type: 'handler', description: 'Recruits and handles Cynthia as an asset' },
      { characterId: 'hannah_park', type: 'colleague', description: 'Works with Hannah in intelligence operations' },
      { characterId: 'jane_maclean', type: 'colleague', description: 'Works with Jane in intelligence operations' },
      { characterId: 'george_bennet', type: 'colleague', description: 'Collaborates with Special Branch on operations' }
    ],
    development: [
      { phase: 'WWI', description: 'RFC pilot injured over the Somme' },
      { phase: 'Intelligence', description: 'Seconded to intelligence work after WWI' },
      { phase: 'Recruitment', description: 'Recruits Cynthia and Richard at Denleigh Manor' },
      { phase: 'Operations', description: 'Leads intelligence operations against Nazi sympathizers' }
    ],
    fate: 'Continues to lead intelligence operations',
    key_scenes: ['cynthia_recruited', 'intelligence_operation_revealed', 'bennet_lawrie_meeting'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'hannah_park',
    name: 'Hannah Park',
    title: 'Miss',
    group: 'Military',
    role: 'Intelligence agent, works with Bill Lawrie',
    background: 'Former Section Controller in WAACs until 1921, then recruited for intelligence work',
    personality: 'Bold, unconventional, adaptable, skilled in disguise and deception',
    traits: ['Bold', 'Unconventional', 'Adaptable', 'Skilled in disguise', 'Intelligent'],
    aliases: ['Miss Gilchrist'],
    relations: [
      { characterId: 'bill_lawrie', type: 'colleague', description: 'Works with Bill in intelligence operations' },
      { characterId: 'jane_maclean', type: 'colleague', description: 'Former WAAC colleague, now intelligence partner' },
      { characterId: 'cynthia_childreth', type: 'recruiter', description: 'Helps recruit Cynthia at Denleigh Manor' }
    ],
    development: [
      { phase: 'WAACs', description: 'Section Controller in Women\'s Auxiliary Army Corps' },
      { phase: 'Intelligence', description: 'Recruited for intelligence work after WAACs disbanded' },
      { phase: 'Recruitment', description: 'Helps recruit Cynthia using provocative disguise' }
    ],
    fate: 'Continues intelligence work',
    key_scenes: ['cynthia_recruited', 'intelligence_operation_revealed'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'jane_maclean',
    name: 'Jane Maclean',
    title: 'Miss',
    group: 'Military',
    role: 'Intelligence agent, works with Hannah Park',
    background: 'Former Section Controller in WAACs until 1921, then recruited for intelligence work',
    personality: 'Professional, observant, works well in teams',
    traits: ['Professional', 'Observant', 'Team player', 'Intelligent'],
    relations: [
      { characterId: 'hannah_park', type: 'colleague', description: 'Former WAAC colleague, now intelligence partner' },
      { characterId: 'bill_lawrie', type: 'colleague', description: 'Works with Bill in intelligence operations' }
    ],
    development: [
      { phase: 'WAACs', description: 'Section Controller in Women\'s Auxiliary Army Corps' },
      { phase: 'Intelligence', description: 'Recruited for intelligence work after WAACs disbanded' }
    ],
    fate: 'Continues intelligence work',
    key_scenes: ['weekend_party_introductions'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'peter_snowden',
    name: 'Colonel Peter Snowden',
    title: 'Colonel',
    group: 'Fifth Columnists',
    role: 'Fifth columnist, pro-Nazi sympathizer, pretends to be drunk and pompous',
    background: 'Claims to be Colonel but actually a Major, military background, pretentious and arrogant',
    personality: 'Pompous, pretentious, pretends to be drunk, calculated, pro-Nazi',
    traits: ['Pompous', 'Pretentious', 'Pro-Nazi', 'Calculated', 'Arrogant'],
    relations: [
      { characterId: 'marjorie_snowden', type: 'spouse', description: 'Married to Marjorie, both pro-Nazi sympathizers' },
      { characterId: 'bob_harrington', type: 'colleague', description: 'Part of the Nazi sympathizer network' },
      { characterId: 'louise_harrington', type: 'colleague', description: 'Part of the Nazi sympathizer network' },
      { characterId: 'sir_john_davies', type: 'colleague', description: 'Part of the Nazi sympathizer network' }
    ],
    development: [
      { phase: 'Introduction', description: 'Appears as pompous military man at Denleigh Manor' },
      { phase: 'Revelation', description: 'Reveals pro-Nazi sympathies during dinner' },
      { phase: 'Active', description: 'Becomes active in Nazi sympathizer network' },
      { phase: 'Flight', description: 'Flees to Ireland as net closes in' }
    ],
    fate: 'Flees to Ireland, remains at large',
    key_scenes: ['weekend_party_introductions', 'dinner_politics', 'pro_nazi_revealed', 'flight_ireland'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'marjorie_snowden',
    name: 'Marjorie Snowden',
    title: 'Mrs',
    group: 'Fifth Columnists',
    role: 'Fifth columnist, pro-Nazi sympathizer, Peter\'s wife',
    background: 'Married to Peter Snowden, strongly opinionated and intolerant',
    personality: 'Strongly opinionated, intolerant, pro-Nazi, more vocal than her husband',
    traits: ['Opinionated', 'Intolerant', 'Pro-Nazi', 'Vocal', 'Determined'],
    relations: [
      { characterId: 'peter_snowden', type: 'spouse', description: 'Married to Peter, both pro-Nazi sympathizers' },
      { characterId: 'cynthia_mosley', type: 'friend', description: 'Friend of Cynthia Mosley (Oswald Mosley\'s late wife)' }
    ],
    development: [
      { phase: 'Introduction', description: 'Appears as rotund lady at Denleigh Manor' },
      { phase: 'Revelation', description: 'Reveals pro-Nazi sympathies during dinner' },
      { phase: 'Active', description: 'Becomes active in Nazi sympathizer network' },
      { phase: 'Flight', description: 'Flees to Ireland with Peter' }
    ],
    fate: 'Flees to Ireland, remains at large',
    key_scenes: ['weekend_party_introductions', 'dinner_politics', 'pro_nazi_revealed', 'flight_ireland'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'bob_harrington',
    name: 'Bob Harrington',
    title: 'Mr',
    group: 'Fifth Columnists',
    role: 'Fifth columnist, trained marksman, medical background',
    background: 'Medical orderly in WWI, seconded for "special duties", trained marksman',
    personality: 'Determined, obsessive about weapons, skilled shooter, dedicated to the cause',
    traits: ['Determined', 'Obsessive about weapons', 'Skilled marksman', 'Dedicated', 'Medical background'],
    relations: [
      { characterId: 'louise_harrington', type: 'spouse', description: 'Married to Louise, both part of Nazi network' },
      { characterId: 'peter_snowden', type: 'colleague', description: 'Part of the Nazi sympathizer network' },
      { characterId: 'sir_john_davies', type: 'colleague', description: 'Part of the Nazi sympathizer network' }
    ],
    development: [
      { phase: 'Introduction', description: 'Appears as medic at Denleigh Manor' },
      { phase: 'Revelation', description: 'Reveals pro-Nazi sympathies during dinner' },
      { phase: 'Active', description: 'Becomes active in Nazi sympathizer network' },
      { phase: 'Takeover', description: 'Takes over Cynthia\'s house with Louise' },
      { phase: 'Capture', description: 'Arrested after failed assassination attempt' }
    ],
    fate: 'Arrested, tried and imprisoned for attempted murder and crimes against the state',
    key_scenes: ['weekend_party_introductions', 'dinner_politics', 'pro_nazi_revealed', 'harringtons_takeover', 'arrests_capture'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'louise_harrington',
    name: 'Louise Harrington',
    title: 'Mrs',
    group: 'Fifth Columnists',
    role: 'Complex character - Fifth columnist who becomes double agent',
    background: 'University educated (Girton), linguistics graduate, excellent marksman, knitting is her signature trait',
    personality: 'Cunning, adaptable, eventually sympathetic to British cause, skilled in deception',
    traits: ['Cunning', 'Adaptable', 'Sympathetic', 'Skilled marksman', 'Knitting enthusiast', 'Educated'],
    relations: [
      { characterId: 'bob_harrington', type: 'spouse', description: 'Married to Bob, initially part of Nazi network' },
      { characterId: 'bill_lawrie', type: 'handler', description: 'Secretly working for British intelligence' },
      { characterId: 'peter_snowden', type: 'colleague', description: 'Initially part of Nazi sympathizer network' }
    ],
    development: [
      { phase: 'Introduction', description: 'Appears as educated lady at Denleigh Manor' },
      { phase: 'Revelation', description: 'Reveals pro-Nazi sympathies during dinner' },
      { phase: 'Double Agent', description: 'Secretly working for British intelligence' },
      { phase: 'Intervention', description: 'Intervenes during assassination attempt' },
      { phase: 'Death', description: 'Killed in suspicious gas explosion' }
    ],
    fate: 'Killed in suspicious gas explosion, likely orchestrated by remaining conspirators',
    key_scenes: ['weekend_party_introductions', 'dinner_politics', 'pro_nazi_revealed', 'louise_betrayal', 'louise_intervention', 'louise_gas_explosion'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'sir_john_davies',
    name: 'Sir John Davies',
    title: 'Sir',
    group: 'Fifth Columnists',
    role: 'Fifth columnist, pro-Nazi sympathizer, Welsh landowner',
    background: 'Welsh landowner, aristocratic background, arrogant and commanding',
    personality: 'Arrogant, commanding, pro-Nazi, uses aliases for operations',
    traits: ['Arrogant', 'Commanding', 'Pro-Nazi', 'Aristocratic', 'Welsh'],
    aliases: ['Young'],
    relations: [
      { characterId: 'lady_megan_davies', type: 'spouse', description: 'Married to Megan, both pro-Nazi sympathizers' },
      { characterId: 'peter_snowden', type: 'colleague', description: 'Part of the Nazi sympathizer network' },
      { characterId: 'bob_harrington', type: 'colleague', description: 'Part of the Nazi sympathizer network' }
    ],
    development: [
      { phase: 'Introduction', description: 'Mentioned as guest at Denleigh Manor (absent)' },
      { phase: 'Active', description: 'Becomes active in Nazi sympathizer network' },
      { phase: 'Operations', description: 'Delivers suitcase to Cynthia using alias "Young"' },
      { phase: 'Flight', description: 'Flees to Ireland as net closes in' },
      { phase: 'Capture', description: 'Arrested after failed assassination attempt' }
    ],
    fate: 'Arrested, tried and imprisoned for attempted murder and crimes against the state',
    key_scenes: ['suitcase_delivery', 'davies_disguise', 'flight_ireland', 'arrests_capture'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'lady_megan_davies',
    name: 'Lady Megan Davies',
    title: 'Lady',
    group: 'Fifth Columnists',
    role: 'Fifth columnist, most fanatical of the group',
    background: 'Daughter of a Welsh rector, appears mousey but extremely dedicated to the Nazi cause',
    personality: 'Appears mousey but extremely dedicated, most fanatical of the group',
    traits: ['Mousey appearance', 'Extremely dedicated', 'Fanatical', 'Pro-Nazi', 'Welsh'],
    relations: [
      { characterId: 'sir_john_davies', type: 'spouse', description: 'Married to Sir John, both pro-Nazi sympathizers' }
    ],
    development: [
      { phase: 'Introduction', description: 'Mentioned as guest at Denleigh Manor (absent)' },
      { phase: 'Active', description: 'Becomes active in Nazi sympathizer network' },
      { phase: 'Operations', description: 'Involved in various Nazi operations' },
      { phase: 'Flight', description: 'Flees to Ireland with Sir John' }
    ],
    fate: 'Flees to Ireland, remains at large',
    key_scenes: ['flight_ireland'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'gerda_stammer',
    name: 'Gerda Stammer',
    title: 'Mrs',
    group: 'German Connection',
    role: 'German Nazi sympathizer, part of "the knitters"',
    background: 'German Nazi sympathizer, married to Franz Stammer',
    personality: 'Enthusiastic supporter of Hitler and Nazi ideology',
    traits: ['Enthusiastic', 'Pro-Nazi', 'German', 'Dedicated'],
    relations: [
      { characterId: 'franz_stammer', type: 'spouse', description: 'Married to Franz Stammer' }
    ],
    development: [
      { phase: 'Berlin', description: 'Meets Richard and Cynthia in Berlin' },
      { phase: 'Active', description: 'Part of German Nazi sympathizer network' }
    ],
    fate: 'Remains in Germany, continues Nazi sympathizer activities',
    key_scenes: ['berlin_trip', 'hotel_adlon_meeting', 'nazi_sympathizers_berlin'],
    introducedInChapter: 'chapter_04'
  },
  {
    id: 'franz_stammer',
    name: 'Franz Stammer',
    title: 'Mr',
    group: 'German Connection',
    role: 'Works at the Reichsbank, facilitates financial arrangements',
    background: 'Works at the Reichsbank, facilitates financial arrangements for Nazi operations',
    personality: 'Professional, works in Nazi financial system',
    traits: ['Professional', 'Financial expertise', 'German', 'Nazi supporter'],
    relations: [
      { characterId: 'gerda_stammer', type: 'spouse', description: 'Married to Gerda Stammer' }
    ],
    development: [
      { phase: 'Berlin', description: 'Meets Richard and Cynthia in Berlin' },
      { phase: 'Active', description: 'Facilitates financial arrangements for Nazi operations' }
    ],
    fate: 'Remains in Germany, continues Nazi financial operations',
    key_scenes: ['berlin_trip', 'hotel_adlon_meeting', 'nazi_sympathizers_berlin'],
    introducedInChapter: 'chapter_04'
  },
  {
    id: 'lena_weber',
    name: 'Lena Weber',
    title: 'Miss',
    group: 'German Connection',
    role: 'Original member of the German pro-Nazi group',
    background: 'Original member of the German pro-Nazi group, dedicated to the Nazi cause',
    personality: 'Dedicated to the Nazi cause, original member of the group',
    traits: ['Dedicated', 'Pro-Nazi', 'German', 'Original member'],
    relations: [],
    development: [
      { phase: 'Active', description: 'Part of German Nazi sympathizer network' }
    ],
    fate: 'Remains in Germany, continues Nazi sympathizer activities',
    key_scenes: ['first_party_bucklebury'],
    introducedInChapter: 'chapter_05'
  },
  {
    id: 'helmut_schnitter',
    name: 'Helmut Schnitter',
    title: 'Mr',
    group: 'German Connection',
    role: 'German agent infiltrating UK via Scilly Isles',
    background: 'Originally from Hamburg, German agent trained for infiltration',
    personality: 'Professional, careful, follows orders precisely',
    traits: ['Professional', 'Careful', 'German', 'Trained agent'],
    relations: [],
    development: [
      { phase: 'Infiltration', description: 'Arrives via submarine at Scilly Isles' },
      { phase: 'Travel', description: 'Travels to mainland via steamship' }
    ],
    fate: 'Successfully infiltrates UK, fate unknown',
    key_scenes: ['german_infiltration_scilly'],
    introducedInChapter: 'preface'
  },
  {
    id: 'george_bennet',
    name: 'Chief Inspector George Bennet',
    title: 'Chief Inspector',
    group: 'Military',
    role: 'Chief Inspector, Special Branch, leads spy-catching team',
    background: 'Widower (wife died of tuberculosis in 1936), dedicated police officer, volunteers for dangerous cases',
    personality: 'Dedicated, observant, methodical, experienced in intelligence work',
    traits: ['Dedicated', 'Observant', 'Methodical', 'Experienced', 'Police officer'],
    relations: [
      { characterId: 'bill_lawrie', type: 'colleague', description: 'Collaborates with Bill on intelligence operations' },
      { characterId: 'jim', type: 'colleague', description: 'Works with Jim at Special Branch' },
      { characterId: 'bert', type: 'colleague', description: 'Works with Bert at Special Branch' }
    ],
    development: [
      { phase: 'Early Career', description: 'Regular police officer, becomes widower in 1936' },
      { phase: 'Special Branch', description: 'Seconded to Special Branch for spy-catching operations' },
      { phase: 'Investigation', description: 'Leads investigation into Edwards murder and German infiltration' },
      { phase: 'Operations', description: 'Leads surveillance operations against Nazi sympathizers' }
    ],
    fate: 'Continues to lead Special Branch operations',
    key_scenes: ['edwards_murder_investigation', 'bennet_scilly_investigation', 'bennet_lawrie_meeting'],
    introducedInChapter: 'chapter_14'
  },
  {
    id: 'jim',
    name: 'Jim',
    title: 'Mr',
    group: 'Military',
    role: 'George\'s colleague at Special Branch',
    background: 'Former RAF with burn scars, works with George on spy-catching operations',
    personality: 'Experienced, works well in teams, has visible war injuries',
    traits: ['Experienced', 'Team player', 'RAF background', 'War injuries'],
    relations: [
      { characterId: 'george_bennet', type: 'colleague', description: 'Works with George at Special Branch' }
    ],
    development: [
      { phase: 'RAF', description: 'Served in RAF during war, suffered burn injuries' },
      { phase: 'Special Branch', description: 'Works with Special Branch on spy-catching operations' }
    ],
    fate: 'Continues Special Branch work',
    key_scenes: [],
    introducedInChapter: 'chapter_14'
  },
  {
    id: 'bert',
    name: 'Bert',
    title: 'Mr',
    group: 'Military',
    role: 'Special Branch agent',
    background: 'Special Branch agent, uses art as cover for surveillance operations',
    personality: 'Skilled in surveillance, uses art as cover, professional',
    traits: ['Skilled in surveillance', 'Artistic cover', 'Professional', 'Observant'],
    relations: [
      { characterId: 'george_bennet', type: 'colleague', description: 'Works with George at Special Branch' }
    ],
    development: [
      { phase: 'Special Branch', description: 'Works with Special Branch on surveillance operations' },
      { phase: 'Surveillance', description: 'Conducts surveillance operations against Nazi sympathizers' }
    ],
    fate: 'Continues Special Branch work',
    key_scenes: ['aldworth_surveillance', 'harrington_monitoring'],
    introducedInChapter: 'chapter_14'
  },
  {
    id: 'mary',
    name: 'Mary',
    title: 'Miss',
    group: 'Supporting Characters',
    role: 'Cynthia\'s secretary, confidante, ally',
    background: 'Cynthia\'s secretary, very loyal and treated more as friend than employee',
    personality: 'Loyal, trustworthy, supportive of Cynthia',
    traits: ['Loyal', 'Trustworthy', 'Supportive', 'Secretary'],
    relations: [
      { characterId: 'cynthia_childreth', type: 'employer', description: 'Works as Cynthia\'s secretary, treated as friend' }
    ],
    development: [
      { phase: 'Secretary', description: 'Works as Cynthia\'s secretary' },
      { phase: 'Confidante', description: 'Becomes confidante and ally in intelligence operations' }
    ],
    fate: 'Continues to support Cynthia',
    key_scenes: [],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'edwin',
    name: 'Edwin',
    title: 'Mr',
    group: 'Military',
    role: 'Military personnel posing as butler during operations',
    background: '"Minder" for Bill, provides security and support during operations',
    personality: 'Professional, observant, provides security',
    traits: ['Professional', 'Observant', 'Security-focused', 'Military'],
    relations: [
      { characterId: 'bill_lawrie', type: 'protector', description: 'Acts as minder and protector for Bill' }
    ],
    development: [
      { phase: 'Operations', description: 'Provides security and support during intelligence operations' }
    ],
    fate: 'Continues to provide security for intelligence operations',
    key_scenes: [],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'alison',
    name: 'Alison',
    title: 'Miss',
    group: 'Military',
    role: 'Intelligence agent',
    background: 'Intelligence agent, skilled in disguise and surveillance',
    personality: 'Skilled in disguise, professional, observant',
    traits: ['Skilled in disguise', 'Professional', 'Observant', 'Intelligent'],
    aliases: ['Sarah'],
    relations: [
      { characterId: 'bill_lawrie', type: 'colleague', description: 'Works with Bill in intelligence operations' }
    ],
    development: [
      { phase: 'Intelligence', description: 'Works in intelligence operations' },
      { phase: 'Research', description: 'Conducts research on Montgomery\'s movements' }
    ],
    fate: 'Continues intelligence work',
    key_scenes: ['montgomery_focus_decision'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'gladys',
    name: 'Gladys',
    title: 'Miss',
    group: 'Supporting Characters',
    role: 'Village postmistress, unwitting intelligence source',
    background: 'Village postmistress, knows all village gossip, observant',
    personality: 'Observant, talkative, knows all village gossip',
    traits: ['Observant', 'Talkative', 'Gossipy', 'Village postmistress'],
    relations: [],
    development: [
      { phase: 'Postmistress', description: 'Works as village postmistress' },
      { phase: 'Intelligence Source', description: 'Provides unwitting intelligence through gossip' }
    ],
    fate: 'Continues as postmistress',
    key_scenes: [],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'tg_edwards',
    name: 'T.G. Edwards',
    title: 'Mr',
    group: 'German Connection',
    role: 'German agent (deceased)',
    background: 'German agent using British identity, killed in London flat',
    personality: 'Unknown - killed early in the story',
    traits: ['German agent', 'British identity', 'Deceased'],
    relations: [],
    development: [
      { phase: 'Active', description: 'German agent operating in Britain' },
      { phase: 'Death', description: 'Murdered in London flat by woman disguised as postman' }
    ],
    fate: 'Murdered in London flat',
    key_scenes: ['edwards_murder', 'postman_disguise'],
    introducedInChapter: 'chapter_11'
  },
  {
    id: 'oswald_mosley',
    name: 'Oswald Mosley',
    title: 'Sir',
    group: 'Historical Figures',
    role: 'Historical figure, leader of British Union of Fascists',
    background: 'Leader of British Union of Fascists, historical figure',
    personality: 'Charismatic, fascist leader, politically ambitious',
    traits: ['Charismatic', 'Fascist leader', 'Politically ambitious', 'Historical figure'],
    relations: [],
    development: [
      { phase: 'Rise', description: 'Leader of British Union of Fascists' },
      { phase: 'Internment', description: 'Interned in May 1940' },
      { phase: 'Release', description: 'Released in 1943' }
    ],
    fate: 'Released from internment in 1943',
    key_scenes: ['second_party_mosley', 'safe_house_request', 'mosley_internment'],
    introducedInChapter: 'chapter_06'
  },
  {
    id: 'amy_wyndholme',
    name: 'Lady Amelia Wyndholme',
    title: 'Lady',
    group: 'Supporting Characters',
    role: 'Cynthia\'s old school friend, helps with recruitment',
    background: 'Elegant brown-haired woman of 31, married to Horace who works in Foreign Office',
    personality: 'Elegant, helpful, aware of intelligence operations',
    traits: ['Elegant', 'Helpful', 'Intelligent', 'School friend'],
    relations: [
      { characterId: 'cynthia_childreth', type: 'friend', description: 'Old school friend who helps recruit her' },
      { characterId: 'horace_wyndholme', type: 'spouse', description: 'Married to Horace who works in Foreign Office' }
    ],
    development: [
      { phase: 'School', description: 'School friend of Cynthia' },
      { phase: 'Recruitment', description: 'Helps with Cynthia\'s recruitment for intelligence work' }
    ],
    fate: 'Continues to support intelligence operations',
    key_scenes: ['cynthia_arrives_denleigh', 'weekend_party_introductions'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'horace_wyndholme',
    name: 'Horace Wyndholme',
    title: 'Mr',
    group: 'Supporting Characters',
    role: 'Amy\'s husband, works in Foreign Office',
    background: 'Works in Foreign Office, married to Amy',
    personality: 'Professional, works in government',
    traits: ['Professional', 'Government worker', 'Foreign Office'],
    relations: [
      { characterId: 'amy_wyndholme', type: 'spouse', description: 'Married to Amy' }
    ],
    development: [
      { phase: 'Foreign Office', description: 'Works in Foreign Office' }
    ],
    fate: 'Continues Foreign Office work',
    key_scenes: [],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'sheila',
    name: 'Sheila',
    title: 'Miss',
    group: 'Supporting Characters',
    role: 'Maid at Denleigh Manor',
    background: 'Maid at Denleigh Manor, helpful and informative',
    personality: 'Helpful, informative, professional',
    traits: ['Helpful', 'Informative', 'Professional', 'Maid'],
    relations: [],
    development: [
      { phase: 'Maid', description: 'Works as maid at Denleigh Manor' }
    ],
    fate: 'Continues as maid at Denleigh Manor',
    key_scenes: ['weekend_party_introductions'],
    introducedInChapter: 'chapter_01'
  },
  {
    id: 'patrick',
    name: 'Patrick',
    title: 'Mr',
    group: 'Supporting Characters',
    role: 'Butler at Denleigh Manor',
    background: 'Butler at Denleigh Manor, professional and efficient',
    personality: 'Professional, efficient, follows proper protocol',
    traits: ['Professional', 'Efficient', 'Protocol-following', 'Butler'],
    relations: [],
    development: [
      { phase: 'Butler', description: 'Works as butler at Denleigh Manor' }
    ],
    fate: 'Continues as butler at Denleigh Manor',
    key_scenes: ['weekend_party_introductions'],
    introducedInChapter: 'chapter_01'
  }
];
