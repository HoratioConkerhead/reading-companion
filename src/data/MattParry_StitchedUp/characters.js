export const characters = [
    {
      id: 'lady_cynthia_childreth',
      name: 'Lady Cynthia Childreth',
      title: 'Lady',
      group: 'Protagonists',
      role: 'Aristocratic protagonist recruited to infiltrate British pro‑Nazi sympathizers; observer and conduit to British intelligence',
      background: 'Educated, wealthy, linguist (French and German), lives in Bucklebury. Unconventional for her class and comfortable operating “in the shadows.”',
      personality: 'Composed, observant, principled, quietly bold',
      traits: ['polyglot', 'discreet', 'well‑connected', 'resilient'],
      relations: [
        { characterId: 'richard_childreth', type: 'spouse', description: 'Husband; presents a united public front and coordinates privately', introducedInChapter: 'chapter_01' },
        { characterId: 'amy_wyndholme', type: 'friend', description: 'Old school friend; host who facilitates the initial approach', introducedInChapter: 'chapter_01' },
        { characterId: 'wing_commander_bill_lawrie', type: 'asset', description: 'Works to his brief; recruited as observer and social inroad', introducedInChapter: 'chapter_03' },
        { characterId: 'hannah_park', type: 'asset', description: 'Accepts tasking and guidance under Hannah’s operational cover', introducedInChapter: 'chapter_03' },
        { characterId: 'jane_maclean', type: 'asset', description: 'Works with Jane under her cover to advance the operation', introducedInChapter: 'chapter_03' },
        { characterId: 'peter_snowden', type: 'associate', description: 'Country‑house acquaintance; politically right‑leaning; watched', introducedInChapter: 'chapter_01' },
        { characterId: 'marjorie_snowden', type: 'associate', description: 'Country‑house acquaintance; ardent ideologue; watched', introducedInChapter: 'chapter_01' },
        { characterId: 'bob_harrington', type: 'associate', description: 'Weekend‑circle acquaintance; pro‑German leanings; watched', introducedInChapter: 'chapter_01' },
        { characterId: 'louise_harrington', type: 'associate', description: 'Weekend‑circle acquaintance; becomes key in the “knitters” circle', introducedInChapter: 'chapter_01' },
        { characterId: 'franz_stammer', type: 'associate', description: 'Berlin contact via Reichsbank social circuit', introducedInChapter: 'chapter_10' },
        { characterId: 'gerda_stammer', type: 'associate', description: 'Berlin social leader who courts Cynthia for the cause', introducedInChapter: 'chapter_10' },
        { characterId: 'sir_john_davies', type: 'associate', description: 'Pro‑German sympathizer later operating under alias “Young”', introducedInChapter: 'chapter_11' },
        { characterId: 'lady_megan_davies', type: 'associate', description: 'Closely aligned with the German circle; social counterpart', introducedInChapter: 'chapter_12' },
        { characterId: 'mary_ashdown', type: 'employer', description: 'Employs and trusts Mary as secretary and aide inside the house', introducedInChapter: 'chapter_15' },
        { characterId: 'edwin_holmes', type: 'protected', description: 'Accepts his discreet personal cover and protective oversight at events', introducedInChapter: 'chapter_19' },
        { characterId: 'alison_hart', type: 'protected', description: 'Accepts embedded protection and house hardening during threat window', introducedInChapter: 'chapter_42' },
        { characterId: 'felicity_gray', type: 'associate', description: 'Cover‑office gatekeeper who arranges travel and logistics', introducedInChapter: 'chapter_06' },
        { characterId: 'oswald_mosley', type: 'associate', description: 'BUF leader who privately solicits the Childreths’ support and “safe house” offer', introducedInChapter: 'chapter_22' }
      ],
      development: [
        { phase: 'Beginning', description: 'Reluctant country‑house guest sensing hidden agendas' },
        { phase: 'Middle', description: 'Skilled observer navigating Berlin salons and domestic networks' },
        { phase: 'Late', description: 'Calm under pressure as plots converge near her home' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'richard_childreth',
      name: 'Richard Childreth',
      group: 'Protagonists',
      role: 'Bank director; accompanies Cynthia and engages with Reichsbank contacts',
      background: 'Veteran of WWI (Royal Berkshires). Professional banker asked to create discretion‑enabling facilities.',
      personality: 'Pragmatic, steady, dutiful',
      traits: ['financially astute', 'calm under scrutiny'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'spouse', description: 'Wife; aligned publicly and privately', introducedInChapter: 'chapter_01' },
        { characterId: 'franz_stammer', type: 'colleague', description: 'Discusses credit and convenience account for visiting delegates', introducedInChapter: 'chapter_09' },
        { characterId: 'gerda_stammer', type: 'associate', description: 'Meets socially via Berlin circle', introducedInChapter: 'chapter_10' },
        { characterId: 'wing_commander_bill_lawrie', type: 'associate', description: 'Briefed and coordinated for cover logistics', introducedInChapter: 'chapter_06' },
        { characterId: 'peter_snowden', type: 'associate', description: 'Country‑house acquaintance; politically right‑leaning', introducedInChapter: 'chapter_01' },
        { characterId: 'felicity_gray', type: 'associate', description: 'Receives travel/admin support via cover office', introducedInChapter: 'chapter_06' }
      ],
      development: [
        { phase: 'Beginning', description: 'Measured banker wary of hidden agendas' },
        { phase: 'Middle', description: 'Defines practical terms with Reichsbank; keeps cover intact' },
        { phase: 'Late', description: 'Supports home‑front counter‑plot with discretion' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'wing_commander_bill_lawrie',
      name: 'Wing-Commander William “Bill” Lawrie',
      title: 'Wing-Commander',
      group: 'Military',
      role: 'Intelligence lead/handler orchestrating recruitment, cover, and surveillance',
      background: 'RFC pilot wounded in WWI; later seconded to intelligence. Coordinates the operation under civilian covers.',
      personality: 'Professional, dry‑witted, strategic',
      traits: ['handler', 'planner', 'calm'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'handler', description: 'Recruits and tasks Cynthia; maintains need‑to‑know briefings', introducedInChapter: 'chapter_03' },
        { characterId: 'richard_childreth', type: 'associate', description: 'Coordinates travel/cover and debriefs', introducedInChapter: 'chapter_06' },
        { characterId: 'hannah_park', type: 'colleague', description: 'Trusted operator under cover personas', introducedInChapter: 'chapter_03' },
        { characterId: 'jane_maclean', type: 'colleague', description: 'Field partner and cover teammate', introducedInChapter: 'chapter_03' },
        { characterId: 'edwin_holmes', type: 'superior', description: 'Directs Edwin’s protective and observing details', introducedInChapter: 'chapter_19' },
        { characterId: 'george_bennet', type: 'colleague', description: 'Coordinates inter‑agency strategy and watch', introducedInChapter: 'chapter_31' },
        { characterId: 'alison_hart', type: 'colleague', description: 'Deploys her for shadowing and protective embed', introducedInChapter: 'chapter_26' },
        { characterId: 'felicity_gray', type: 'colleague', description: 'Relies on her for secure scheduling and logistics', introducedInChapter: 'chapter_06' },
        { characterId: 'amy_wyndholme', type: 'associate', description: 'Uses her household to stage the initial approach', introducedInChapter: 'chapter_06' },
        { characterId: 'horace_wyndholme', type: 'subordinate', description: 'Acts under Horace’s senior cover authority', introducedInChapter: 'chapter_06' },
        { characterId: 'louise_harrington', type: 'handler', description: 'Runs her covertly as an insider after her turn', introducedInChapter: 'chapter_22' }
      ],
      development: [
        { phase: 'Beginning', description: 'Builds Cynthia’s political provenance and cover' },
        { phase: 'Middle', description: 'Expands watch, integrates Special Branch, tightens tradecraft' },
        { phase: 'Late', description: 'Focuses threat modeling and decisive protective actions' }
      ],
      aliases: ['Mr Newton'],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_03'
    },
    {
      id: 'hannah_park',
      name: 'Hannah Park',
      group: 'Military',
      role: 'Intelligence operator; cover specialist and recruiter',
      background: 'Former WAAC Section Controller; works with Bill and Jane under layered covers.',
      personality: 'Cool, incisive, theatrical when needed',
      traits: ['cover craft', 'recruiter', 'observant'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'recruiter', description: 'Helps bring Cynthia into the operation and mentors tradecraft', introducedInChapter: 'chapter_03' },
        { characterId: 'jane_maclean', type: 'colleague', description: 'Paired operative in field and social covers', introducedInChapter: 'chapter_03' },
        { characterId: 'wing_commander_bill_lawrie', type: 'colleague', description: 'Executes plans and on‑site pivots', introducedInChapter: 'chapter_03' }
      ],
      development: [
        { phase: 'Beginning', description: 'Striking cover as “Miss Gilchrist” to control room dynamics' },
        { phase: 'Middle', description: 'Coaches Cynthia, varies personas, counters probing' },
        { phase: 'Late', description: 'Guides protective posture around Cynthia’s house' }
      ],
      aliases: ['Miss Gilchrist'],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_03'
    },
    {
      id: 'jane_maclean',
      name: 'Jane Maclean',
      group: 'Protagonists',
      role: 'Field operative working with Bill and Hannah; recruiter and social navigator',
      background: 'Former VAD cover; intelligence teammate in the trio with Bill and Hannah.',
      personality: 'Poised, practical, low‑profile',
      traits: ['listener', 'credible cover', 'steady'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'recruiter', description: 'Assists the approach and ongoing mentoring', introducedInChapter: 'chapter_03' },
        { characterId: 'hannah_park', type: 'colleague', description: 'Trusted field partner', introducedInChapter: 'chapter_03' },
        { characterId: 'wing_commander_bill_lawrie', type: 'colleague', description: 'Operates within his plan and cover structure', introducedInChapter: 'chapter_03' }
      ],
      development: [
        { phase: 'Beginning', description: 'Softens introductions and gauging in early approach' },
        { phase: 'Middle', description: 'Blends into country‑house circuits while listening' },
        { phase: 'Late', description: 'Quietly supports protective measures' }
      ],
      aliases: ['Miss Maclean'],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'amy_wyndholme',
      name: 'Lady Amelia “Amy” Wyndholme',
      title: 'Lady',
      group: 'Supporting Characters',
      role: 'Host and trusted friend who stages the initial country‑house weekend',
      background: 'Married to Horace; educated, socially adept; aligned with Bill’s objectives.',
      personality: 'Gracious, discreet, loyal',
      traits: ['connector', 'trusted host'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'friend', description: 'Longstanding friendship; catalyst for invitation', introducedInChapter: 'chapter_01' },
        { characterId: 'horace_wyndholme', type: 'spouse', description: 'Husband; Foreign Office link', introducedInChapter: 'chapter_01' },
        { characterId: 'wing_commander_bill_lawrie', type: 'associate', description: 'Supports planning and staging at Denleigh', introducedInChapter: 'chapter_06' },
        { characterId: 'patrick_denleigh', type: 'employer', description: 'Employs Patrick as butler at Denleigh', introducedInChapter: 'chapter_01' },
        { characterId: 'sheila_denleigh', type: 'employer', description: 'Employs Sheila as maid at Denleigh', introducedInChapter: 'chapter_01' }
      ],
      development: [
        { phase: 'Beginning', description: 'Hosts carefully curated house party' },
        { phase: 'Middle', description: 'Quiet supporter in background' },
        { phase: 'Late', description: 'Remains a trusted contact' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'horace_wyndholme',
      name: 'Horace Wyndholme',
      group: 'Supporting Characters',
      role: 'Foreign Office contact linked into Bill’s chain',
      background: 'Senior civil service; helps authorize and coordinate elements of the plan.',
      personality: 'Reserved, purposeful',
      traits: ['well‑placed', 'effective'],
      relations: [
        { characterId: 'amy_wyndholme', type: 'spouse', description: 'Wife and confidante', introducedInChapter: 'chapter_01' },
        { characterId: 'wing_commander_bill_lawrie', type: 'superior', description: 'Senior contact overseeing elements of the operation', introducedInChapter: 'chapter_06' }
      ],
      development: [
        { phase: 'Beginning', description: 'Background authority validating the effort' },
        { phase: 'Middle', description: 'Maintains distance with oversight' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_05'
    },
    {
      id: 'peter_snowden',
      name: 'Colonel Peter Snowden',
      title: 'Colonel',
      group: 'Fifth Columnists',
      role: 'Right‑leaning influencer within the country‑house set',
      background: 'WWI veteran; projects bluster and tests others’ reactions; recruiter/connector within sympathizer circles.',
      personality: 'Overbearing in public; calculating in private',
      traits: ['probing', 'performative', 'connected'],
      relations: [
        { characterId: 'marjorie_snowden', type: 'spouse', description: 'Political duo; aligned in aims', introducedInChapter: 'chapter_01' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'Hosts and tests her during gatherings', introducedInChapter: 'chapter_01' },
        { characterId: 'bob_harrington', type: 'associate', description: 'Like‑minded ally', introducedInChapter: 'chapter_01' },
        { characterId: 'louise_harrington', type: 'associate', description: 'Like‑minded ally', introducedInChapter: 'chapter_01' },
        { characterId: 'sir_john_davies', type: 'associate', description: 'Part of the same political circle', introducedInChapter: 'chapter_11' },
        { characterId: 'oswald_mosley', type: 'associate', description: 'Personal connection; leverages Cynthia’s events for influence', introducedInChapter: 'chapter_22' }
      ],
      development: [
        { phase: 'Beginning', description: 'Signals ideology; gauges others’ leanings' },
        { phase: 'Middle', description: 'Quiet recruiter for deeper involvements' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'marjorie_snowden',
      name: 'Marjorie Snowden',
      group: 'Fifth Columnists',
      role: 'Vocal pro‑fascist advocate; active in surveillance and probing',
      background: 'Uses social settings to push ideology; later involved in covert intrusions.',
      personality: 'Strident, judgmental, ideological',
      traits: ['partisan', 'incisive (and intrusive)'],
      relations: [
        { characterId: 'peter_snowden', type: 'spouse', description: 'Political partnership', introducedInChapter: 'chapter_01' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'Engages and pressures in salons and at home', introducedInChapter: 'chapter_01' },
        { characterId: 'louise_harrington', type: 'associate', description: 'Frequent collaborator in the circle', introducedInChapter: 'chapter_01' }
      ],
      development: [
        { phase: 'Beginning', description: 'Pushes ideology in social rooms' },
        { phase: 'Middle', description: 'Active participant in covert searching and testing' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'bob_harrington',
      name: 'Bob Harrington',
      group: 'Fifth Columnists',
      role: 'Pro‑German sympathizer in the country‑house network',
      background: 'Ex‑medic; politically drawn to authoritarian solutions.',
      personality: 'Reserved in some rooms; ideological in others',
      traits: ['ideological‑lean', 'connected'],
      relations: [
        { characterId: 'louise_harrington', type: 'spouse', description: 'Partner and co‑traveler in sympathies', introducedInChapter: 'chapter_01' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'House‑party acquaintance; tested her stance', introducedInChapter: 'chapter_01' },
        { characterId: 'peter_snowden', type: 'associate', description: 'Country‑house ally', introducedInChapter: 'chapter_01' }
      ],
      development: [
        { phase: 'Beginning', description: 'Signals admiration for authoritarian regimes' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'louise_harrington',
      name: 'Louise Harrington',
      group: 'Fifth Columnists',
      role: 'Prominent sympathizer; social operator within the circle',
      background: 'Politically aligned with continental fascism; recurrent presence in key settings.',
      personality: 'Measured in some rooms; persistent in aims',
      traits: ['networked', 'poised'],
      relations: [
        { characterId: 'bob_harrington', type: 'spouse', description: 'Aligned on aims and contacts', introducedInChapter: 'chapter_01' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'Tests and cultivates Cynthia’s perceived alignment', introducedInChapter: 'chapter_01' },
        { characterId: 'marjorie_snowden', type: 'associate', description: 'Frequent collaborator across events', introducedInChapter: 'chapter_01' },
        { characterId: 'peter_snowden', type: 'associate', description: 'Country‑house ally within the circle', introducedInChapter: 'chapter_01' },
        { characterId: 'wing_commander_bill_lawrie', type: 'asset', description: 'Secretly informs Bill after becoming disillusioned', introducedInChapter: 'chapter_22' },
        { characterId: 'jack_harris', type: 'conspirator', description: 'Local shopkeeper/postmaster collaborator providing cover and intel', introducedInChapter: 'chapter_44' }
      ],
      development: [
        { phase: 'Beginning', description: 'Positions as respectable face of the circle' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'sir_john_davies',
      name: 'Sir John Davies',
      title: 'Sir',
      group: 'Fifth Columnists',
      role: 'Senior sympathizer; later travels under alias “Young”',
      background: 'Absentee at Denleigh; reappears in Berlin and later under alias within UK movements.',
      personality: 'Guarded, purposeful',
      traits: ['cautious', 'connected'],
      relations: [
        { characterId: 'lady_megan_davies', type: 'spouse', description: 'Aligned politically and socially', introducedInChapter: 'chapter_11' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'Maintains distance; later arrives at her house under alias', introducedInChapter: 'chapter_11' },
        { characterId: 'peter_snowden', type: 'associate', description: 'Part of the same domestic network', introducedInChapter: 'chapter_11' }
      ],
      development: [
        { phase: 'Beginning', description: 'Noted as part of the wider circle' },
        { phase: 'Middle', description: 'Operates under alias while moving inland' }
      ],
      aliases: ['Young'],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_11'
    },
    {
      id: 'lady_megan_davies',
      name: 'Lady Megan Davies',
      title: 'Lady',
      group: 'Fifth Columnists',
      role: 'Sympathizer aligned with German salon circle',
      background: 'Seen in Berlin social circuit; aligned with domestic network.',
      personality: 'Composed, purposeful',
      traits: ['socially adept', 'ideological‑lean'],
      relations: [
        { characterId: 'sir_john_davies', type: 'spouse', description: 'Partner in social and political aims', introducedInChapter: 'chapter_11' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'Crosses paths via Berlin and home events', introducedInChapter: 'chapter_12' }
      ],
      development: [
        { phase: 'Beginning', description: 'Introduced within Berlin‑leaning set' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_11'
    },
    {
      id: 'franz_stammer',
      name: 'Franz Stammer',
      group: 'German Connection',
      role: 'Reichsbank official; hosts and frames introductions in Berlin',
      background: 'Financial interlocutor; cultivates ties with British visitors.',
      personality: 'Formal, solicitous',
      traits: ['host', 'financial gatekeeper'],
      relations: [
        { characterId: 'gerda_stammer', type: 'spouse', description: 'Partners in salon hosting and political signalling', introducedInChapter: 'chapter_10' },
        { characterId: 'richard_childreth', type: 'colleague', description: 'Discusses banking facilities and political expectations', introducedInChapter: 'chapter_09' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'Introduces across Berlin social circuit', introducedInChapter: 'chapter_10' }
      ],
      development: [
        { phase: 'Beginning', description: 'Positions talks as economic while vetting politics' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_09'
    },
    {
      id: 'gerda_stammer',
      name: 'Gerda Stammer',
      group: 'German Connection',
      role: 'Berlin salon organizer courting English sympathizers',
      background: 'Leads coffee group that screens and recruits; writes urging action after power consolidation.',
      personality: 'Commanding, effusive in salons',
      traits: ['organizer', 'influencer'],
      relations: [
        { characterId: 'franz_stammer', type: 'spouse', description: 'Joint public front for the circle', introducedInChapter: 'chapter_10' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'Courts and instructs; later attends English garden events', introducedInChapter: 'chapter_10' },
        { characterId: 'richard_childreth', type: 'associate', description: 'Hosts him socially while probing stances', introducedInChapter: 'chapter_10' }
      ],
      development: [
        { phase: 'Beginning', description: 'Warm welcome masking political testing' },
        { phase: 'Middle', description: 'Pushes overt commitments after consolidation of power' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_10'
    },
    {
      id: 'helmut_schnitter',
      name: 'Helmut Schnitter',
      group: 'German Connection',
      role: 'Abwehr agent landed via U‑boat; later travels under British alias',
      background: 'Lands on St Mary’s (Isles of Scilly) and exfiltrates toward mainland under cover.',
      personality: 'Composed, discreet',
      traits: ['covert entry', 'tradecraft'],
      relations: [],
      development: [
        { phase: 'Beginning', description: 'Stealth landing; blends in for onward movement' }
      ],
      aliases: ['T. G. Edwards'],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'preface'
    },
    {
      id: 'mary_ashdown',
      name: 'Mary Ashdown',
      group: 'Protagonists',
      role: 'Cynthia’s secretary and trusted aide; assists with household and comms security',
      background: 'Local, reliable, becomes essential to the domestic side of the operation.',
      personality: 'Practical, loyal, perceptive',
      traits: ['trusted', 'resourceful'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'confidante', description: 'Trusted inner‑circle aide; manages invitations and vigilance', introducedInChapter: 'chapter_15' }
      ],
      development: [
        { phase: 'Beginning', description: 'Household support and gatekeeper' },
        { phase: 'Middle', description: 'Active helper spotting intrusions and watchers' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_15'
    },
    {
      id: 'edwin_holmes',
      name: 'Edwin Holmes',
      group: 'Military',
      role: 'Protective lead posing as butler and staff chief at events',
      background: 'Military aide to Bill; runs covert staff/watch at Cynthia’s gatherings.',
      personality: 'Disciplined, courteous in cover, vigilant',
      traits: ['protective detail', 'field coordination'],
      relations: [
        { characterId: 'wing_commander_bill_lawrie', type: 'subordinate', description: 'Executes plans and provides field reporting', introducedInChapter: 'chapter_19' },
        { characterId: 'lady_cynthia_childreth', type: 'protector', description: 'Oversees personal cover and safety during events', introducedInChapter: 'chapter_19' }
      ],
      development: [
        { phase: 'Beginning', description: 'Establishes protective cover team at the house' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_19'
    },
    {
      id: 'george_bennet',
      name: 'Chief Inspector George Bennet',
      group: 'Supporting Characters',
      role: 'Special Branch lead; tracks the landing through to London',
      background: 'Experienced “spy‑catcher”; coordinates watches and lawful pretexts.',
      personality: 'Methodical, unflappable',
      traits: ['investigator', 'patient'],
      relations: [
        { characterId: 'jim_hargreaves', type: 'colleague', description: 'Works in tandem across the travel corridor', introducedInChapter: 'chapter_26' },
        { characterId: 'wing_commander_bill_lawrie', type: 'colleague', description: 'Inter‑agency coordination and hypothesis sharing', introducedInChapter: 'chapter_31' },
        { characterId: 'alison_hart', type: 'colleague', description: 'Shares operational picture as threads converge', introducedInChapter: 'chapter_31' }
      ],
      development: [
        { phase: 'Beginning', description: 'Patient watch on Scilly; builds thread to London' },
        { phase: 'Middle', description: 'Runs 24‑hour watch and controlled entry' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_25'
    },
    {
      id: 'jim_hargreaves',
      name: 'Jim Hargreaves',
      group: 'Supporting Characters',
      role: 'Special Branch colleague assisting Bennet',
      background: 'Former RAF; assists with station/rail and watch logistics.',
      personality: 'Capable, steady',
      traits: ['fieldcraft', 'surveillance'],
      relations: [
        { characterId: 'george_bennet', type: 'colleague', description: 'Paired on the trail from Penzance to London', introducedInChapter: 'chapter_26' }
      ],
      development: [
        { phase: 'Beginning', description: 'Rail watch and discrete mobility' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_26'
    },
    {
      id: 'alison_hart',
      name: 'Alison Hart',
      group: 'Military',
      role: 'MI5 field operative; follows “Young,” later embeds to protect Cynthia',
      background: 'Adaptive cover specialist; executes shadowing and house‑protection roles.',
      personality: 'Quick‑thinking, adaptive',
      traits: ['disguise', 'surveillance', 'protective detail'],
      relations: [
        { characterId: 'george_bennet', type: 'colleague', description: 'Shares tracking picture and signals', introducedInChapter: 'chapter_31' },
        { characterId: 'wing_commander_bill_lawrie', type: 'colleague', description: 'Takes direction on shadowing and embed', introducedInChapter: 'chapter_26' },
        { characterId: 'lady_cynthia_childreth', type: 'protector', description: 'Embedded at house to harden against threat', introducedInChapter: 'chapter_42' },
        { characterId: 'jacobs', type: 'colleague', description: 'Receives issued sidearm and technical support', introducedInChapter: 'chapter_42' }
      ],
      development: [
        { phase: 'Beginning', description: 'Executes rail shadow under tourist cover' },
        { phase: 'Middle', description: 'Transitions to local protective embed' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_26'
    },
    {
      id: 'oswald_mosley',
      name: 'Sir Oswald Mosley',
      title: 'Sir',
      group: 'Historical Figures',
      role: 'Leader of the British Union of Fascists; seeks sympathetic allies and safe houses',
      background: 'Prominent British fascist; attends Cynthia’s gathering in July 1934 and quietly solicits domestic support.',
      personality: 'Charismatic, domineering, ideological',
      traits: ['orator', 'political_leader'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'recruiter', description: 'Privately asks her to act as a safe house and to support the cause', introducedInChapter: 'chapter_22' },
        { characterId: 'peter_snowden', type: 'associate', description: 'Connected via the country‑house sympathizer network', introducedInChapter: 'chapter_22' }
      ],
      development: [
        { phase: 'Middle', description: 'Arrives with minders; probes for domestic support without a public address' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_22'
    },
    {
      id: 'gladys',
      name: 'Gladys',
      group: 'Supporting Characters',
      role: 'Village postmistress and vigilant local observer',
      background: 'Long‑time resident who quietly tracks comings and goings; tips Cynthia and, indirectly, the team.',
      personality: 'Observant, discreetly gossipy, reliable',
      traits: ['observant', 'well‑connected'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'village-contact', description: 'Watches for strangers and passes along useful observations', introducedInChapter: 'chapter_20' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_20'
    },
    {
      id: 'don',
      name: 'Don',
      group: 'Supporting Characters',
      role: 'Tradecraft trainer arriving as a fishmonger',
      background: 'Experienced operative who instructs Cynthia and Mary in tails and countersurveillance.',
      personality: 'Direct, methodical',
      traits: ['trainer', 'practical'],
      relations: [
        { characterId: 'lady_cynthia_childreth', type: 'trainer', description: 'Gives practical training and procedures', introducedInChapter: 'chapter_18' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_18'
    },
    {
      id: 'jack_harris',
      name: 'Jack',
      group: 'Fifth Columnists',
      role: 'Aldworth shopkeeper and postmaster assisting the conspirators',
      background: 'Local collaborator who shares postal intel and minor assistance; later cuts Cynthia’s phone line.',
      personality: 'Outwardly friendly; covertly aligned',
      traits: ['deceptive', 'plugged‑in'],
      relations: [
        { characterId: 'louise_harrington', type: 'associate', description: 'Provides local cover, postal checks, and small tasks', introducedInChapter: 'chapter_44' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_44'
    },
    {
      id: 'patrick_denleigh',
      name: 'Patrick',
      group: 'Supporting Characters',
      role: 'Butler at Denleigh Manor',
      background: 'Professional butler who manages Denleigh’s guest routines.',
      personality: 'Formal, proper',
      traits: ['discreet'],
      relations: [
        { characterId: 'amy_wyndholme', type: 'subordinate', description: 'Household butler at Denleigh', introducedInChapter: 'chapter_01' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'sheila_denleigh',
      name: 'Sheila',
      group: 'Supporting Characters',
      role: 'Maid at Denleigh Manor',
      background: 'Helps with household and guest arrangements; early source of practical details.',
      personality: 'Helpful, polite',
      traits: ['efficient'],
      relations: [
        { characterId: 'amy_wyndholme', type: 'subordinate', description: 'Household maid at Denleigh', introducedInChapter: 'chapter_01' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_01'
    },
    {
      id: 'montgomery',
      name: 'Lieutenant General Bernard Montgomery',
      title: 'Lieutenant General',
      group: 'Historical Figures',
      role: 'Target of the assassination plot',
      background: 'Senior British Army commander; planned goodwill visits and inspections during the period.',
      personality: 'Confident, morale‑focused',
      traits: ['strategic', 'charismatic'],
      relations: [],
      development: [],
      aliases: ['Monty'],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_35'
    },
    {
      id: 'montys_adc',
      name: "Montgomery's ADC",
      group: 'Supporting Characters',
      role: 'Liaison and security coordinator with the team',
      background: 'Coordinates movements and accepts the “three Montys” decoy plan.',
      personality: 'Efficient, discreet',
      traits: ['liaison'],
      relations: [
        { characterId: 'montgomery', type: 'subordinate', description: 'Aide‑de‑camp and liaison for schedule/security', introducedInChapter: 'chapter_42' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_42'
    },
    {
      id: 'inspector_williams',
      name: 'Inspector Williams',
      group: 'Supporting Characters',
      role: 'Pembrokeshire police inspector assisting Davies investigation',
      background: 'Coordinates with Special Branch on ferry/registration tracing.',
      personality: 'Thorough, cooperative',
      traits: ['meticulous'],
      relations: [
        { characterId: 'george_bennet', type: 'colleague', description: 'Coordinates ferry/registration intelligence', introducedInChapter: 'chapter_47' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_47'
    },
    {
      id: 'paul_holness',
      name: 'Paul Holness',
      group: 'Supporting Characters',
      role: 'Publisher cover and intermediary',
      background: 'Former RAF colleague of Bill; provides cover channel for Felicity and validates her presence.',
      personality: 'Reliable, discreet',
      traits: ['trusted'],
      relations: [
        { characterId: 'wing_commander_bill_lawrie', type: 'former-colleague', description: 'Assists with secure cover and deliveries', introducedInChapter: 'chapter_45' },
        { characterId: 'felicity_gray', type: 'cover-provider', description: 'Publisher façade enabling her reports and courier drops', introducedInChapter: 'chapter_45' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_45'
    },
    {
      id: 'jacobs',
      name: 'Jacobs',
      group: 'Supporting Characters',
      role: 'Service armorer/armoury expert',
      background: 'Identifies 7.92 shell and issues suitable protection sidearm to Alison.',
      personality: 'Technical, concise',
      traits: ['armorer'],
      relations: [
        { characterId: 'wing_commander_bill_lawrie', type: 'colleague', description: 'Provides armoury expertise and support', introducedInChapter: 'chapter_42' },
        { characterId: 'alison_hart', type: 'colleague', description: 'Arms Alison and confirms shell identification', introducedInChapter: 'chapter_42' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_42'
    },
    {
      id: 'ken',
      name: 'Ken',
      group: 'Supporting Characters',
      role: 'Driver/operative stationed to block the back lane',
      background: 'Assists on final day with vehicle positioning and cutoff.',
      personality: 'Dependable',
      traits: ['driver'],
      relations: [
        { characterId: 'wing_commander_bill_lawrie', type: 'colleague', description: 'Operative positioned for back‑lane cutoff', introducedInChapter: 'chapter_50' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_50'
    },
    {
      id: 'chief_inspector_st_johns',
      name: 'Chief Inspector (St. Johns)',
      group: 'Supporting Characters',
      role: 'Local police chief first engaged on Edwards case',
      background: 'Territorial but cooperative once national security is explained.',
      personality: 'Professional',
      traits: ['by‑the‑book'],
      relations: [
        { characterId: 'george_bennet', type: 'colleague', description: 'Shares jurisdictional handoff on Edwards investigation', introducedInChapter: 'chapter_30' }
      ],
      development: [],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_30'
    },
    {
      id: 'felicity_gray',
      name: 'Felicity Gray',
      group: 'Supporting Characters',
      role: 'Administrative gatekeeper at “Imperial Aggregates” cover office',
      background: 'Organizes travel, meetings, and document flows under cover.',
      personality: 'Efficient, discreet',
      traits: ['logistics', 'gatekeeping'],
      relations: [
        { characterId: 'wing_commander_bill_lawrie', type: 'colleague', description: 'Trusted for schedule and comms cover', introducedInChapter: 'chapter_06' },
        { characterId: 'lady_cynthia_childreth', type: 'associate', description: 'Facilitates travel and practical arrangements', introducedInChapter: 'chapter_06' },
        { characterId: 'richard_childreth', type: 'associate', description: 'Coordinates itinerary and packing of schedules', introducedInChapter: 'chapter_06' },
        { characterId: 'paul_holness', type: 'colleague', description: 'Works with Paul’s cover channel during cottage surveillance phase', introducedInChapter: 'chapter_45' }
      ],
      development: [
        { phase: 'Beginning', description: 'Smooth first contact and logistics for Berlin trip' }
      ],
      aliases: [],
      fate: '',
      key_scenes: [],
      introducedInChapter: 'chapter_06'
    }
  ];